import { BaseCommand } from '@radon-types/command';
import { 
    Interaction, Constants,
    InteractionCommandClient
 } from 'detritus-client';
const { InteractionCallbackTypes } = Constants;

export default class PingCommand extends Interaction.InteractionCommand {

    constructor() {
        super( {
            name: 'ping',
            description: 'Ping the bot.',
            options: []
        });
    }

    async run(ctx: Interaction.InteractionContext) {
        await ctx.editOrRespond({
            content: 'PONG!',
            flags: 64
        });
    }

}
