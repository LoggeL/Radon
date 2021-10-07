import { Interaction } from 'detritus-client';
import { ApplicationCommandTypes } from 'detritus-client/lib/constants';
import { totalmem } from 'os';

export default class InfoCommand extends Interaction.InteractionCommand {
    constructor() {
        super({
            global: true,
            name: 'info',
            description: 'Basic Information about the bot',
            type: ApplicationCommandTypes.CHAT_INPUT,
            // options: []
        });
    }
    async run(context: Interaction.InteractionContext) {
        const { client } = context;
        const { user, application } = client;

        if (!user) return await context.editOrRespond('I\'m not ready yet!');
        const memoryUsage = process.memoryUsage();
        const systemMemory = totalmem()

        await context.editOrRespond({
            embed: {
                author: {
                    name: `${user.username}#${user.discriminator}`,
                    iconUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                },
                fields: [
                    {
                        name: 'Uptime',
                        value: `${Math.floor(process.uptime() / 60)} minutes`
                    },
                    {
                        name: 'Memory Usage',
                        value: `${(memoryUsage.heapUsed / systemMemory * 100).toFixed(2)}% (${Math.round(memoryUsage.heapUsed / 1024 / 1024)} / ${Math.round(systemMemory / 1024 / 1024)} MB)`
                    },
                    {
                        name: 'Owner',
                        value: `${application?.owner?.username}#${application?.owner?.discriminator}`
                    },
                    {
                        name: 'Guilds',
                        value: `${client.guilds.size}`
                    },
                    {
                        name: 'Users',
                        value: `${client.users.size}`
                    }
                ]
            },
            content: ``,
            flags: 64
        });
    }
}
