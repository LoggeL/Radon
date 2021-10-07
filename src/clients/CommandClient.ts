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

    onPrefixCheck() { return ['r!']; }

    async start() {
        try {

            const commandsdir = join(process.cwd(), 'dist', 'commands');
            const commandDirExists = await stat(commandsdir)
                .then((stat) => stat.isDirectory())
                .catch(() => false);

            this.client.on('gatewayReady', () => {
                console.log('memoryUsage')
                console.log(process.memoryUsage());
            });

            if (commandDirExists) {
                await this.addMultipleIn(
                    commandsdir,
                    {
                        isAbsolute: true,
                        subdirectories: true
                    }
                );
            }
            const slashDirExists = await stat(join(process.cwd(), 'dist', 'slash-commands'))
                .then((stat) => stat.isDirectory())
                .catch(() => false);

            if (slashDirExists) {
                this.interactions.addMultipleIn(
                    join(process.cwd(), 'dist', 'slash-commands'), {
                    isAbsolute: true,
                    subdirectories: true
                });
                await this.interactions.checkAndUploadCommands()
            }
            await this.run({ wait: true });
            await this.interactions.run({ wait: true });

            // const commands = await this.interactions.fetchApplicationCommands()
            // console.log(commands.cache);

        } catch (error) {
            if (error instanceof Error) {
                console.error(Object.values(Reflect.get(error, 'raw').errors)[0]);

                // ToDo: Error handling breaks when description is undefined
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
