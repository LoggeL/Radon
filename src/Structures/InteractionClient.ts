import EventEmitter = require('events');
import { RadonClient } from './Client';
// import { }s
import * as detritus from 'detritus-client';
interface ContextMenuEvent extends SlashCommandEvent {}
interface SelectMenuEvent extends detritus.Structures.Interaction {}
export interface SlashCommandEvent extends detritus.GatewayClientEvents.InteractionCreate {
    interaction: detritus.Structures.Interaction & {
        data?: detritus.Structures.InteractionDataApplicationCommand;
    };
}
export interface ButtonEvent extends detritus.GatewayClientEvents.InteractionCreate {
    interaction: detritus.Structures.Interaction & {
        data?: detritus.Structures.InteractionDataComponent;
    };
}
export class InteractionClient extends EventEmitter {
    private readonly _client: RadonClient;
    constructor(client: RadonClient) {
        super({ captureRejections: true });
        this._client = client;
    }

    register() {
        this._client.client.on('interactionCreate', ({ interaction }) => {
            console.log(JSON.stringify(interaction, null, 2));
            
            if (interaction.isFromApplicationCommand) {}
            if (interaction.isFromMessageComponent) {}
            this.emit('error', new Error(`invalid interaction ${interaction.id}`));
            return;
        });  
    }




    private async handleButton(button: ButtonEvent) {
        // if (button)
    }

    private async handleContextMenu(menu: ContextMenuEvent) {}

    private async handleSlashCommand(slashCommand: SlashCommandEvent) {
        
    }

    private async handleSelectMenu(menu: SelectMenuEvent) {
        
    }
}
