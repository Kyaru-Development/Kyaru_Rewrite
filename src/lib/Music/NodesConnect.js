const { Manager } = require("@lavacord/discord.js");
const manager = new Manager(client, nodes);
await manager.connect();