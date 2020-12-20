const {  Collection } = require("discord.js"),
fs = require('fs'),
ora = require("ora");
class CommandManeger {
    constructor(bot){
        this.client = bot; 
        this.client.commands  = new Collection()
        this.client.aliases  = new Collection()
        this.client.modules  = new Collection()
    }
    registr(){
        let loadingCommands = ora(`Начинаем загрузку...`).start();
        this.client.commands.clear()
        fs.readdirSync('./commands').forEach(module => {
            fs.readdir(`./commands/${module}/`,(err,files)=>{
                if(err) console.error(err);
                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                if(jsfiles.length <= 0) console.error("Нет команд для загрузки");
                 loadingCommands.text = `Модуль: ${module} | Команды: ${jsfiles.length} | Загружены.`;
                jsfiles.forEach((f,i) =>{
                    delete require.cache[require.resolve(`../commands/${module}/${f}`)]
                    let props = require(`../commands/${module}/${f}`);
                    const cmd = new props();
                    bot.modules[cmd.help['config'].category] = bot.modules[cmd.help['config'].category] ? bot.modules[cmd.help['config'].category]: [];
                    bot.modules[cmd.help['config'].category].push(cmd);    
                    this.client.commands.set(cmd.help['config'].name,cmd)
                    cmd.help['config'].aliases.forEach(h=>{
                     this.client.aliases.set(h,cmd)
                    });
                 })
                 loadingCommands.succeed();

            });
        });
    };
};
module.exports = CommandManeger;