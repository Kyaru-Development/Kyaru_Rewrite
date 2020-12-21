const { Manager } = require("@lavacord/discord.js"),
    { nodes, emojis } = require(),
    { Rest } = require("lavacord"),
    Queue = require("./Queue"),
    { Collection } = require("discord.js");
class Player {
    constructor(client) {
        this.client = client;
        this.client.queue = new Collection();
        this.manager = new Manager(client, nodes, {
            user: client.user.id,
            shards: client.shard ? client.shard.count : 1
        });
        this.manager.on("error", (error, node) => {
            console.log(error)
            console.log(node)
        });
        await manager.connect();
        console.log('✅ | Успешно подключилась к музыка ноде')
    }

    async handleVideo(message, voiceChannel, song, type) {
        const aaaa = this.client.queue.get(message.guild.id);
        song.requestedBy = message.author;
        song.info.type = type;
        if (!aaaa) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel
            });
            queue.setLang(message.guild.data.settings.lang);
            queue.songs.push(song);
            this.client.queue.set(message.guild.id, queue);
            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: "main"
                }, { selfdeaf: true });
                queue.setPlayer(player);
                this.play(message.guild, song, type);
            } catch (error) {
                this.client.queue.delete(message.guild.id);
                this.manager.leave(message.guild.id);
            };
        } else {
            aaaa.songs.push(song);
            message.channel.send(`${emojis.music[song.info.type]} | **${song.info.title}** добавлен в очередь воспроизведения`).then(m => m.delete({ timeout: 5000 }));
        }
    }
    play(guild, song) {
        const guild_queue = this.client.queue.get(guild.id);
        const lang = require(`./lang/${guild_queue.lang}.json`).player;
        if (!song) {
            guild_queue.textChannel.send(lang.no_songs);
            this.manager.leave(guild.id);
            this.client.queue.delete(guild.id);
        } else {
            guild_queue.player.play(song.track);
            guild_queue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;
                    if (data.reason === 'LOAD_FAILED') {
                        if (guild_queue.textChannel) guild_queue.textChannel.send(lang.press_f)
                    }
                    const shiffed = guild_queue.songs.shift();
                    if (guild_queue.loop === true) {
                        guild_queue.songs.push(shiffed);
                    }
                    this.play(guild, guild_queue.songs[0]);
                });

            guild_queue.player.volume(guild_queue.volume);
            guild_queue.textChannel.send(`${emojis.music[song.info.type]} | Cейчас играет **${song.info.title}**`).then(m => m.delete({ timeout: 50000 }));

        }
    };
    async getSongs(query) {
        const node = this.manager.nodes.get("main");
        const result = await Rest.load(node, query);
        return result.tracks;
    }
}
module.exports = Player;