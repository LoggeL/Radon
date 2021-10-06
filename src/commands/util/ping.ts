import { Command, CommandClient } from 'detritus-client';

export default class PingCommand extends Command.Command {
    constructor(client: CommandClient) {
        super(client, {
            name: 'ping',
        });
    }    
    async run(context: Command.Context) {
        const ping = await context.client.ping();
        await context.editOrReply({
            content: `Pong! ${ping.gateway}ms`
        });
    }
}
