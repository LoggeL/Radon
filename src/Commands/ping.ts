import { BaseCommand } from '@radon-types/command';
import { Constants, Interaction } from 'detritus-client'
const { InteractionCallbackTypes } = Constants;

module.exports = {
    description: 'foo',
    name: 'foo',
    global: true,
    // options: {
    //     adminOnly: false // demo    
    // },
    run: async (context: Interaction.InteractionContext) => {
        console.log('ping');
        return await context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, 'bar');
    }
}