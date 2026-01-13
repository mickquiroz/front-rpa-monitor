import { useMemo } from 'react';
import { useLogs } from '../context/LogContext';
import { StatCard } from '../components/StatCard';
import { Activity, AlertTriangle, Bot, Layers, CheckCircle2 } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';

interface DashboardProps {
    onNavigate: (page: string, params?: any) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function Dashboard({ onNavigate }: DashboardProps) {
    const { stats, logs } = useLogs();

    // Aggregate Errors by Client
    const clientErrors = useMemo(() => {
        const counts: Record<string, number> = {};
        logs.forEach(log => {
            if (log.level === 'Error' || log.level === 'Fatal') {
                counts[log.client] = (counts[log.client] || 0) + 1;
            }
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [logs]);

    // Aggregate Activity by Date (Logs per hour/day) - Simplified for 24h view or just trend
    // Since we have 60 days of data, let's show logs per day
    const timelineData = useMemo(() => {
        const counts: Record<string, { total: number, errors: number }> = {};
        logs.forEach(log => {
            const dateKey = log.time.toISOString().split('T')[0];
            if (!counts[dateKey]) counts[dateKey] = { total: 0, errors: 0 };
            counts[dateKey].total++;
            if (log.level === 'Error' || log.level === 'Fatal') counts[dateKey].errors++;
        });

        return Object.entries(counts)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
        // Maybe slice recent 14 days?
    }, [logs]);

    const recentTimeline = timelineData.slice(-14);

    // Software Distribution
    const softwareDist = useMemo(() => {
        const counts: Record<string, number> = {};
        logs.forEach(log => {
            counts[log.software] = (counts[log.software] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [logs]);

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Logs"
                    value={stats.totalLogs.toLocaleString()}
                    icon={Layers}
                    color="blue"
                />
                <StatCard
                    label="Active Robots"
                    value={stats.activeRobots}
                    icon={Bot}
                    color="purple"
                />
                <StatCard
                    label="Processes Run"
                    value={stats.activeProcesses}
                    icon={Activity}
                    color="green"
                />
                <StatCard
                    label="Critical Incidents"
                    value={stats.errorCount}
                    icon={AlertTriangle}
                    color="red"
                    trend="+12%" // Simulated trend
                />
            </div>

            {/* Charts Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                {/* Client Error Distribution */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Top Clients by Incidents</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={clientErrors}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                onClick={(data: any) => {
                                    if (data && data.activePayload && data.activePayload[0]) {
                                        const clientName = data.activePayload[0].payload.name;
                                        onNavigate('client-detail', { client: clientName });
                                    }
                                }}
                                className="cursor-pointer"
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Activity Trend (Last 14 Days)</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={recentTimeline}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(str) => {
                                        const d = new Date(str);
                                        return d.getDate() + '/' + (d.getMonth() + 1);
                                    }}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip
                                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} name="Total Logs" />
                                <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Errors" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Section 2 - Pie Chart & Recent Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Software Distribution */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-1 h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">RPA Software Distribution</h3>
                    <div className="flex-1 min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={softwareDist}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {softwareDist.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text overlay if needed */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <div className="text-xs text-slate-500 font-medium">Platform</div>
                                <div className="text-xl font-bold text-slate-900">Mix</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Critical Logs Table */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Recent Critical Incidents</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    <div className="flex-1 overflow-auto -mx-6 px-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="py-3">Time</th>
                                    <th className="py-3">Client</th>
                                    <th className="py-3">Robot</th>
                                    <th className="py-3">Message</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-50">
                                {logs.filter(l => l.level === 'Error' || l.level === 'Fatal').slice(0, 8).map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="py-3 text-slate-500 whitespace-nowrap font-mono text-xs">{log.time.toLocaleTimeString()}</td>
                                        <td className="py-3 font-medium text-slate-900">{log.client}</td>
                                        <td className="py-3 text-slate-600">{log.robotName}</td>
                                        <td className="py-3 text-slate-600 max-w-xs truncate group-hover:whitespace-normal group-hover:bg-white group-hover:absolute group-hover:shadow-lg group-hover:z-10 group-hover:p-2 group-hover:border group-hover:rounded-md">
                                            {log.message}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {stats.errorCount === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <CheckCircle2 size={48} className="mb-2 text-emerald-500/50" />
                                <p>No critical incidents found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
