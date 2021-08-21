import { RadonClient } from './Client';
import {RequestTypes } from 'detritus-client-rest';
import { Guild, User } from 'detritus-client/lib/structures';
import { BackupData } from '@radon-types/backups';
import { inspect } from 'util';
import * as crypto from 'crypto';
export class Api {

    client: RadonClient;

    constructor(client: RadonClient) {
        this.client = client;
    }

    generateId(len: number) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let out = '';
        for (let i = 0; i < len; i++) {
            out += chars[Math.floor(Math.random() * chars.length)];
        }
        return out.toUpperCase();
    }

    encryptBackup(backup: BackupData): string {
        const backupstr = inspect(backup);
        process.env.SALT = process.env.SALT || this.generateId(69);
        
        return crypto.createHash('sha512', {encoding: 'base64'})
        .update(backupstr)
        .update(process.env.SALT)
        .update(this.generateId(69))
        .update(this.generateId(69))
        .update(this.generateId(69))
        .update(this.generateId(69))
        .update(this.generateId(69))
        .update(this.generateId(69))
        .update(this.generateId(69))
        .digest().toString('hex');
    
    }

    async createBackup(guid: Guild, creator: User): Promise<BackupData>  {
        const data = {} as BackupData;
        data.id = this.generateId(15);
        data.creator = creator.id;
        data.roles = guid.roles.map(r => r.toJSON()); 
        data.roles = guid.channels.map(c => c.toJSON());

        // if (guid.channels.map())
        return data;
    }

    async getMe() {
        return this.client.client.user ?
            this.client.client.user.id :
            this.rest.fetchMe();
    }


    async createCommand({
        name,
        description,
        options
    }: {
        name: string,
        description: string;
        options: RequestTypes.CreateApplicationCommandOption[]

    }) {
        this.rest.createApplicationCommand(
            await this.getMe(),
            {
                name,
                description,
                options
            }
        );
    }


    get rest() {
        return this.client.rest;
    }

}
