import { Interaction } from 'detritus-client';
import { ApplicationCommandTypes } from 'detritus-client/lib/constants';

export default class BackupCreationCommand extends Interaction.InteractionCommand {
    constructor() {
        super({
            global: true,
            // guildIds: ['828610192211574874'],
            name: 'create',
            description: 'creates a backup',
            type: ApplicationCommandTypes.CHAT_INPUT,
            // options: []
        });
    }
    async run(context: Interaction.InteractionContext) {

        await context.editOrRespond({
            content: `Here is your backup.`,
            file: { filename: 'backup.json', value: Buffer.from(JSON.stringify({ "foo": "bar" })) },
            // flags: 64
        });
    }
}
