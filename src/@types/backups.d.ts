
declare module '@radon-types/backups' {
    export interface BackupData {
        id: string;
        creator: string;
        channels: PartialChannels[];
        roles: PartialRoles[];
    }

    export interface PartialChannels {}
    export interface PartialRoles {}
}
