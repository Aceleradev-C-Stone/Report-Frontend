export enum LogChannel
{
    Development = 0,
    Production = 1,
    Homologation = 2
}

export namespace LogChannel {
    
    export function getName(channel: LogChannel): string {
        return LogChannel[channel];
    }

    export function getLowercaseName(channel: LogChannel): string {
        return getName(channel).toLowerCase();
    }
}