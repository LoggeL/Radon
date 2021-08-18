import { Client } from 'discord.js';

export class RadonClient extends Client {
    

    constructor() {
        super({
            intents: [
                'DIRECT_MESSAGES',
                'GUILDS',
                'GUILD_MESSAGES'
            ]
        });
    }

    async start() {
        try {
            await this.login();
        } catch (error) {
            
        }
    }
}
