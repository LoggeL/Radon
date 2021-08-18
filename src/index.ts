import { RadonClient } from './Structures/Client';


async function main() {
    const client = new RadonClient();
    await client.start();
}

main();
