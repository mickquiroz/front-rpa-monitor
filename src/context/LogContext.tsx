import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import type { RPALog, DashboardStats } from '../types';
import { useToast } from './ToastContext';

interface LogContextType {
    logs: RPALog[];
    loading: boolean;
    error: string | null;
    stats: DashboardStats;
}

interface CSVRow {
    'Time (absolute)': string;
    'Level': string;
    'Robot name': string;
    'Process': string;
    'Hostname': string;
    'Host Identity': string;
    'Message': string;
    'Software': string;
    'Client': string;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

const parseDate = (dateStr: string) => {
    // Format: 2025-10-13 13:31:05
    return new Date(dateStr);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLogs = () => {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogs must be used within a LogProvider');
    }
    return context;
};

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<RPALog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch the file explicitly first to catch connection/404 errors
                const response = await fetch('/robot-logs-sintetico-60dias-diarios-ventanas-unicas.csv');

                if (!response.ok) {
                    throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
                }

                const csvText = await response.text();

                Papa.parse<CSVRow>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    worker: false, // Disable worker to avoid potential bundler issues for now
                    complete: (results) => {
                        const parsedLogs: RPALog[] = results.data.map((row: CSVRow, index: number) => ({
                            id: `log-${index}`,
                            time: parseDate(row['Time (absolute)']),
                            level: row['Level'] as RPALog['level'],
                            robotName: row['Robot name'],
                            process: row['Process'],
                            hostname: row['Hostname'],
                            hostIdentity: row['Host Identity'],
                            message: row['Message'],
                            software: row['Software'],
                            client: row['Client']
                        })).filter((l) => l.client);

                        if (parsedLogs.length === 0) {
                            console.warn("Parsed logs are empty", results.errors);
                        }

                        setLogs(parsedLogs);
                        setLoading(false);
                    },
                    error: (err: Error) => {
                        console.error("Papa Parse Error:", err);
                        throw err; // Re-throw to be caught by catch block
                    }
                });

            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error loading data';
                console.error("Data Load Error:", err);
                setError(message);
                showToast(message, 'error');
                setLoading(false);
            }
        };

        loadData();
    }, [showToast]);

    const stats = useMemo(() => {
        return {
            totalLogs: logs.length,
            errorCount: logs.filter(l => l.level === 'Error' || l.level === 'Fatal').length,
            activeRobots: new Set(logs.map(l => l.robotName)).size,
            activeProcesses: new Set(logs.map(l => l.process)).size,
            lastUpdate: logs.length > 0 ? logs[logs.length - 1].time : null
        };
    }, [logs]);

    return (
        <LogContext.Provider value={{ logs, loading, error, stats }}>
            {children}
        </LogContext.Provider>
    );
};
