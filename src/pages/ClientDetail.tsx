import { useMemo } from 'react';
import { useLogs } from '../context/LogContext';
import { StatCard } from '../components/StatCard';
import { Bot, AlertTriangle, Clock, Activity, ArrowLeft } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { cn } from '../lib/utils';

interface ClientDetailProps {
    clientName: string;
    onBack: () => void;
}

export function ClientDetail({ clientName, onBack }: ClientDetailProps) {
    const { logs } = useLogs();

    const clientLogs = useMemo(() => logs.filter(l => l.client === clientName), [logs, clientName]);

    const stats = useMemo(() => {
        return {
            total: clientLogs.length,
            errors: clientLogs.filter(l => l.level === 'Error' || l.level === 'Fatal').length,
            robots: new Set(clientLogs.map(l => l.robotName)).size,
            lastActive: clientLogs.length > 0 ? clientLogs[clientLogs.length - 1].time : null
        };
    }, [clientLogs]);

    const activityData = useMemo(() => {
        const counts: Record<string, { total: number, errors: number }> = {};
        clientLogs.forEach(log => {
            const dateKey = log.time.toISOString().split('T')[0];
            if (!counts[dateKey]) counts[dateKey] = { total: 0, errors: 0 };
            counts[dateKey].total++;
            if (log.level === 'Error' || log.level === 'Fatal') counts[dateKey].errors++;
        });
        return Object.entries(counts)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(-30);
    }, [clientLogs]);

    return (
        <div className="space-y-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm"
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{clientName}</h2>
                <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border",
                    stats.errors > 0
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}>
                    {stats.errors > 0 ? "Requires Attention" : "Healthy"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Logs" value={stats.total} icon={Activity} color="blue" />
                <StatCard label="Critical Issues" value={stats.errors} icon={AlertTriangle} color={stats.errors > 0 ? "red" : "green"} />
                <StatCard label="Active Robots" value={stats.robots} icon={Bot} color="purple" />
                <StatCard
                    label="Last Activity"
                    value={stats.lastActive ? stats.lastActive.toLocaleDateString() : 'N/A'}
                    icon={Clock}
                    color="orange"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px] flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-4">30-Day Activity</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(val) => new Date(val).getDate().toString()} />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} name="Total Logs" />
                            <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} name="Errors" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800">Recent Logs</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Robot</th>
                                <th className="px-6 py-3">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {clientLogs.slice().reverse().slice(0, 20).map(log => (
                                <tr key={log.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 whitespace-nowrap text-slate-500 font-mono text-xs">{log.time.toLocaleString()}</td>
                                    <td className="px-6 py-3">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-xs font-medium",
                                            log.level === 'Info' && "bg-blue-100 text-blue-700",
                                            log.level === 'Trace' && "bg-slate-100 text-slate-700",
                                            log.level === 'Warning' && "bg-orange-100 text-orange-700",
                                            (log.level === 'Error' || log.level === 'Fatal') && "bg-red-100 text-red-700"
                                        )}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-600">{log.robotName}</td>
                                    <td className="px-6 py-3 text-slate-600 truncate max-w-md" title={log.message}>{log.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
