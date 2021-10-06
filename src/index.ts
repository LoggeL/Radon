import { InteractionCommandClient, ShardClient } from 'detritus-client';
import { RadonClient } from './Structures/Client';
import { readdir } from 'fs'
import { InteractionCommand } from 'detritus-client/lib/interaction';

interface RADON_ENV {
    DISCORD_TOKEN: string;
    NODE_ENV: 'dev' | 'prod' | 'prem';

}

async function main() {
    checkEnv();
    const env = process.env as unknown as RADON_ENV;
    const client = new ShardClient(env.DISCORD_TOKEN);
    const commandClient = new RadonClient(client);
    await commandClient.start();
    loadCommands(commandClient)
}

function checkEnv() {
    if (process.env.DISCORD_TOKEN) return;
    console.error('DISCORD_TOKEN NOT PRESENT');
    console.error('PLACE TOKEN IN .env FILE');
    process.exit();
}

function loadCommands(commandClient: InteractionCommandClient) {
    console.log('Loading Commands')
    readdir(`${__dirname}/Commands`, (err, files: string[]) => {
        if (err) {
            console.error(err);
            return;
        }
        for (const fileName of files.filter((file) => file.endsWith('.js'))) {
            const command = require(`${__dirname}/Commands/${fileName}`) as InteractionCommand;
            console.log('Loading Command', command.name);
            console.log(command)
            commandClient.add(command)
        }
    })

    // Mess to get the commmand to register
    commandClient.uploadApplicationCommands('412986571944361984').then(console.log).catch(console.error);
    commandClient.checkAndUploadCommands().then(console.log).catch(console.error)
}

main().catch(console.error);
