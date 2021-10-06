import { Interaction } from 'detritus-client';
import { ApplicationCommandTypes } from 'detritus-client/lib/constants';

export default class PingCommand extends Interaction.InteractionCommand {
    constructor() {
        super({
            global: true,
            // guildIds: ['828610192211574874'],
            name: 'ping',
            description: 'pings',
            type: ApplicationCommandTypes.CHAT_INPUT,
            // options: []
        });
    }    
    async run(context: Interaction.InteractionContext) {
        const ping = await context.client.ping();
        await context.editOrRespond({
            content: `Pong! ${ping.gateway}ms`,
            flags: 64
        });
    }
}
