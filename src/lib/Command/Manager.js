const { Collection } = require("discord.js"),
    fs = require('fs'),
class CommandManeger {
    constructor(bot) {
        this.client = bot;
        this.client.commands = new Collection();
        this.client.aliases = new Collection();
        this.client.modules = new Collection();
    }
    registr() {
        this.client.commands.clear();
        fs.readdirSync('./commands').forEach(module => {
            fs.readdir(`./commands/${module}/`, (err, files) => {
                if (err) console.error(err);
                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                if (jsfiles.length <= 0) console.error("❌ | Нету команд для загрузки.");
                jsfiles.forEach((f, i) => {
                    delete require.cache[require.resolve(`../commands/${module}/${f}`)];
                    let props = require(`../commands/${module}/${f}`);
                    const cmd = new props();
                    bot.modules[cmd.help['config'].category] = bot.modules[cmd.help['config'].category] ? bot.modules[cmd.help['config'].category] : [];
                    bot.modules[cmd.help['config'].category].push(cmd);
                    this.client.commands.set(cmd.help['config'].name, cmd)
                    cmd.help['config'].aliases.forEach(h => {
                        this.client.aliases.set(h, cmd)
                    });
                })

            });
            console.log(`✅ | Алиасы успешно загружены`);
            console.log(`✅ | Команды успешно загружены.`);
        });
        functions: {
            function findAll(cmd, lang) {
                if (!lang) {
                    let cmdd =
                        this.client.commands.get(cmd)
                        || this.client.aliases.get(cmd)
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['en'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['config'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['ru'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['ru'].name === cmd));
                    return cmdd;
                } else {
                    let cmddd =
                        this.client.commands.get(cmd)
                        || this.client.aliases.get(cmd)
                        || this.client.commands.get(this.client.commands.findKey(a => a.help[lang].name === cmd));
                    return cmddd;
                }
                function unload(cmd) {
                    let cmddd =
                        this.client.commands.get(cmd)
                        || this.client.aliases.get(cmd)
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['en'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['config'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['ru'].name === cmd))
                        || this.client.commands.get(this.client.commands.findKey(a => a.help['ru'].name === cmd));
                    delete require.cache[require.resolve(`../commands/${cmddd.help['config'].category}/${cmddd.help['config'].name}`)];
                    this.client.commands.delete(cmddd.help['config'].name);
                    if (cmddd.help['config'].aliases.length <= 0) {
                        return false;
                    } else {
                        cmddd.help['config'].aliases.forEach(_ => {
                            this.client.aliases.delete(_);
                            return true;
                        });
                    };
                };

            };
        };
    };
};
module.exports = CommandManeger;