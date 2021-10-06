import {
    CommandClient,
    ShardClient,
    Command
} from 'detritus-client';
import {
    InteractionClient
} from './InteractionClient';
import { join } from 'path';
import { stat } from 'fs/promises';


export class RadonCommandClient extends CommandClient {
    interactions: InteractionClient;
    constructor(client: ShardClient) {
        super(client);
        this.interactions = new InteractionClient(client);
    }


    async start() {
        try {
            const commandsdir = join(process.cwd(), 'dist', 'commands');
            const commandstat  = await stat(commandsdir)
                .then((stat) => stat.isDirectory())
                .catch(() => false);
            if (commandstat) {
                await this.addMultipleIn(
                    commandsdir, {
                        isAbsolute: true,
                        subdirectories: true
                    }
                );
            }
            const slashCommandstat = await stat(join(process.cwd(), 'dist', 'slashcommands'))
                .then((stat) => stat.isDirectory())
                .catch(() => false);
            if (slashCommandstat) {
                this.interactions.addMultipleIn(
                    join(process.cwd(), 'dist', 'slashcommands'), {
                        isAbsolute: true,
                        subdirectories: true
                    });
                }

        } catch (error) {
            if (error instanceof Error) {
                console.log('error on startup', error.message);
            } 
            else {
                console.log('unknown error');
            }
        }
    }
} 
