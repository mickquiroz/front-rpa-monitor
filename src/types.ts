export interface RPALog {
    id: string; // generated
    time: Date;
    level: 'Info' | 'Trace' | 'Warning' | 'Error' | 'Fatal';
    robotName: string;
    process: string;
    hostname: string;
    hostIdentity: string;
    message: string;
    software: string;
    client: string;
}

export type LogLevel = RPALog['level'];

export interface DashboardStats {
    totalLogs: number;
    errorCount: number;
    activeRobots: number;
    activeProcesses: number;
    lastUpdate: Date | null;
}

export interface NavigationParams {
    client?: string;
    [key: string]: string | undefined;
}
