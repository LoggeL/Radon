import {
    InteractionCommandClient,
    Interaction
} from 'detritus-client';

export class InteractionClient extends InteractionCommandClient {
    

        onInteractionCheck(ctx: Interaction.InteractionContext) {
            return true;
        }

}
