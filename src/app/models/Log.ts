import { LogLevel } from './enums/LogLevel';
import { LogChannel } from './enums/LogChannel';

export class Log
{
    id: number;
    description: string;
    title: string;
    details: string;
    source: string;
    eventCount: number;
    level: LogLevel;
    channel: LogChannel;
    createdAt: Date;
    archived: boolean;
    isChecked: boolean;
    userId: number;
    userName: string;
}