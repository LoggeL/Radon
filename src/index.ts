import { ShardClient } from 'detritus-client'; 
import {RadonCommandClient} from './clients/CommandClient';
async function main() {
    const client = new ShardClient(process.env.DISCORD_TOKEN!, {
        gateway: {
            identifyProperties: {
                $browser: 'Discord iOS'
            }
        },
        cache: true,
    });

    const commands = new RadonCommandClient(client);

    await commands.start();

}
main();
