export enum LogLevel
{
    Debug = 0,
    Warning = 1,
    Error = 2
}

export namespace LogLevel {
    export function getName(level: LogLevel): string {
        switch (level) {
            case LogLevel.Debug: return 'Debug';
            case LogLevel.Error: return 'Erro';
            case LogLevel.Warning: return 'Aviso';
        }
    }
}