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
            const slashCommandstat = await stat(join(process.cwd(), 'dist', 'slash-commands'))
                .then((stat) => stat.isDirectory())
                .catch(() => false);
                console.log(slashCommandstat);
                
            if (slashCommandstat) {
                this.interactions.addMultipleIn(
                    join(process.cwd(), 'dist', 'slash-commands'), {
                        isAbsolute: true,
                        subdirectories: true
                    });
                    await this.interactions.checkAndUploadCommands()
                }
            await this.run({ wait: true });
            await this.interactions.run({ wait: true });
        } catch (error) {
            if (error instanceof Error) {
                console.log(
                    'error on startup',
                    Reflect.get(error, 'raw').errors.description._errors
                );
            } 
            else {
                console.log('unknown error');
            }
        }
    }
} 
