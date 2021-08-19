import { ShardClient } from 'detritus-client';
import { RadonClient } from './Structures/Client';

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
}

function  checkEnv() {


    
}

main();
