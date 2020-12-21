class Command {
    constructor(cmd = {}) {
        this.help = {
            config: {
                name: cmd.config.name || 'Unknown',
                category: cmd.config.category || 'Unknown',
                alises: cmd.config.alises || [],
            },
            permissions: {
                me: cmd.permissions.me || 'Unknown',
                memeber: cmd.permissions.member || 'Unknown'
            },
            options: {
                ownerOnly: cmd.config.ownerOnly || true,
                cooldown: cmd.config.cooldown || 0,
                nsfw: cmd.config.nsfw || false,
            },
            ru: {
                name: cmd.ru.name || 'Unknown',
                usage: cmd.ru.usage || 'Unknown',
                description: cmd.ru.description || 'Unknown'
            },
            en: {
                name: cmd.en.name || 'Unknown',
                usage: cmd.en.usage || 'Unknown',
                description: cmd.en.description || 'Unknown'
            },
            rofl: {
                name: cmd.rofl.name || 'Unknown',
                usage: cmd.rofl.usage || 'Unknown',
                description: cmd.rofl.description || 'Unknown'
            }
        };
    };
};
module.exports = Command;