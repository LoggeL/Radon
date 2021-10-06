import { Constants, InteractionCommandClient, ShardClient } from 'detritus-client';
import { Api } from './Api';
require('dotenv/config');
if (!process.env.DISCORD_TOKEN) throw new Error('NO_TOKEN');
export class RadonClient extends InteractionCommandClient {
    client!: ShardClient;
    api: Api;
    constructor(client: ShardClient) {
        super(client,
            {
                gateway: {
                    intents: 'ALL',
                    presence: {
                        activities: [{
                            name: 'watching /help',
                            type: Constants.ActivityTypes.STREAMING,
                            // :)
                            url: 'https://www.twitch.tv/rick_astley'
                        }]
                    }
                }
                // intents: [
                //     'DIRECT_MESSAGES',
                //     'GUILDS',
                //     'GUILD_MESSAGES'
                // ]
            });
        this.api = new Api(this);
    }

    async start() {
        try {
            await this.client.run()
            const clientUser = this.client.user
            console.log('Starting Bot...')
            if (clientUser) {
                console.log(`Logged in as ${clientUser.username}#${clientUser.discriminator}`)
                console.log(`Shard Count: ${this.client.shardCount}`)
            }
        } catch (error) {
            console.error("Problem logging in", error)
        }
    }
}
