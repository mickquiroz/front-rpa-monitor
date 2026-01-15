import { useMemo, useState, useCallback } from 'react';
import { useLogs } from '../context/LogContext';
import { StatCard } from '../components/StatCard';
import { IncidentDetailsDrawer } from '../components/IncidentDetailsDrawer';
import { Activity, AlertTriangle, Bot, Layers, CheckCircle2 } from 'lucide-react';
import type { NavigationParams, RPALog } from '../types';
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
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Badge,
    Skeleton,
} from '../components/ui';

interface DashboardProps {
    onNavigate: (page: string, params?: NavigationParams) => void;
}

// ============================================
// ENTERPRISE CHART CONFIGURATION
// ============================================

// Professional color palette for data visualization
// Uses neutral tones for general data, semantic colors only when meaningful
const CHART_COLORS = {
    // Primary data series colors (neutral, professional)
    primary: ['#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#1d4ed8'],

    // Accent colors for variety (still professional)
    accent: ['#14b8a6', '#5eead4', '#8b5cf6', '#a78bfa', '#64748b'],

    // Semantic colors (use ONLY for their meaning)
    semantic: {
        error: '#ef4444',      // Red - ONLY for errors, failures, critical issues
        success: '#22c55e',    // Green - for success, growth, completion
        warning: '#f59e0b',    // Amber - for warnings, pending states
        info: '#3b82f6',       // Blue - neutral information
        neutral: '#64748b',    // Slate - baseline, totals
    }
};

// Grid styling for subtle, non-intrusive appearance
const GRID_STYLE = {
    stroke: '#e5e7eb',         // Very light gray
    strokeOpacity: 0.5,        // Semi-transparent
    strokeDasharray: '3 3',    // Dashed for subtlety
};

// Axis styling for clean, readable labels
const AXIS_STYLE = {
    tick: {
        fill: '#64748b',       // Slate-500 for readability
        fontSize: 12,
        fontFamily: 'Inter, sans-serif'
    },
    axisLine: {
        stroke: '#cbd5e1',     // Slate-300
        strokeWidth: 1
    },
};

// Tooltip styling for clean, professional appearance
const TOOLTIP_STYLE = {
    contentStyle: {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '12px',
        fontFamily: 'Inter, sans-serif',
    },
    labelStyle: {
        color: '#0f172a',      // Slate-900
        fontSize: '13px',
        fontWeight: 600,
        marginBottom: '8px',
    },
    itemStyle: {
        color: '#475569',      // Slate-600
        fontSize: '12px',
        padding: '2px 0',
    },
    cursor: {
        fill: 'rgba(226, 232, 240, 0.2)',  // Subtle highlight
        strokeWidth: 0
    },
    wrapperStyle: {
        zIndex: 1000,
    }
};

// Legend styling
const LEGEND_STYLE = {
    iconType: 'circle' as const,
    wrapperStyle: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        color: '#475569',
    }
};




/**
 * Get severity level and badge variant from log level
 */
function getSeverity(level: RPALog['level']): {
    label: string;
    variant: 'error' | 'warning' | 'info' | 'neutral';
} {
    switch (level) {
        case 'Fatal':
            return { label: 'Critical', variant: 'error' };
        case 'Error':
            return { label: 'High', variant: 'error' };
        case 'Warning':
            return { label: 'Medium', variant: 'warning' };
        case 'Trace':
        case 'Info':
        default:
            return { label: 'Low', variant: 'info' };
    }
}

export function Dashboard({ onNavigate }: DashboardProps) {
    const { stats, logs, loading } = useLogs();
    const [selectedIncident, setSelectedIncident] = useState<RPALog | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDonutHovering, setIsDonutHovering] = useState(false);

    // Handle incident selection
    const handleIncidentClick = useCallback((incident: RPALog) => {
        setSelectedIncident(incident);
        setIsDrawerOpen(true);
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false);
        setSelectedIncident(null);
    }, []);

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

    // Critical Incidents (Errors and Fatal logs)
    const criticalIncidents = useMemo(() => {
        return logs
            .filter(l => l.level === 'Error' || l.level === 'Fatal')
            .slice(0, 8);
    }, [logs]);

    // Software Distribution
    const softwareDist = useMemo(() => {
        const counts: Record<string, number> = {};
        logs.forEach(log => {
            counts[log.software] = (counts[log.software] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [logs]);

    return (
        <div className="space-y-space-3">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-3">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white p-space-3 rounded-md border border-slate-200 shadow-sm h-24 relative overflow-hidden">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    ))
                ) : (
                    <>
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
                    </>
                )}
            </div>

            {/* Bento Grid Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-3">
                {loading ? (
                    <>
                        <div className="h-[400px] lg:col-span-2 bg-white rounded-md border border-slate-200 p-4">
                            <Skeleton className="h-6 w-48 mb-4" />
                            <Skeleton className="h-full w-full rounded-md" />
                        </div>
                        <div className="h-[400px] lg:col-span-1 bg-white rounded-md border border-slate-200 p-4">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <Skeleton className="h-full w-full rounded-full" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Activity Timeline - 2 cols on desktop */}
                        <Card padding="none" className="flex flex-col lg:col-span-2 h-[400px]">
                            <CardHeader>
                                <CardTitle>Activity Trend (Last 14 Days)</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={recentTimeline}>
                                        <CartesianGrid
                                            {...GRID_STYLE}
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(str) => {
                                                const d = new Date(str);
                                                return d.getDate() + '/' + (d.getMonth() + 1);
                                            }}
                                            tick={AXIS_STYLE.tick}
                                            axisLine={AXIS_STYLE.axisLine}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            tick={AXIS_STYLE.tick}
                                            axisLine={AXIS_STYLE.axisLine}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tick={AXIS_STYLE.tick}
                                            axisLine={AXIS_STYLE.axisLine}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            labelFormatter={(label) => {
                                                const date = new Date(label);
                                                return date.toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric'
                                                });
                                            }}
                                            contentStyle={TOOLTIP_STYLE.contentStyle}
                                            labelStyle={TOOLTIP_STYLE.labelStyle}
                                            itemStyle={TOOLTIP_STYLE.itemStyle}
                                            cursor={TOOLTIP_STYLE.cursor}
                                        />
                                        <Legend {...LEGEND_STYLE} />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="total"
                                            stroke={CHART_COLORS.semantic.neutral}
                                            strokeWidth={2}
                                            dot={false}
                                            name="Total Logs"
                                            animationDuration={300}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="errors"
                                            stroke={CHART_COLORS.semantic.error}
                                            strokeWidth={2}
                                            dot={{ r: 4, fill: CHART_COLORS.semantic.error, strokeWidth: 0 }}
                                            name="Errors"
                                            animationDuration={300}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Software Distribution - 1 col on desktop */}
                        <Card padding="none" className="lg:col-span-1 h-[400px] flex flex-col">
                            <CardHeader>
                                <CardTitle>RPA Software Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-0 relative">
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
                                            animationDuration={300}
                                            onMouseEnter={() => setIsDonutHovering(true)}
                                            onMouseLeave={() => setIsDonutHovering(false)}
                                        >
                                            {softwareDist.map((_entry, index) => {
                                                // Use professional color palette - alternate between primary and accent
                                                const colorPalette = index % 2 === 0 ? CHART_COLORS.primary : CHART_COLORS.accent;
                                                const color = colorPalette[Math.floor(index / 2) % colorPalette.length];
                                                return (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={color}
                                                        stroke="#ffffff"
                                                        strokeWidth={2}
                                                    />
                                                );
                                            })}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={TOOLTIP_STYLE.contentStyle}
                                            itemStyle={TOOLTIP_STYLE.itemStyle}
                                            labelStyle={TOOLTIP_STYLE.labelStyle}
                                            formatter={(value: number, name: string) => [`${value}`, name]}
                                        />
                                        <Legend
                                            {...LEGEND_STYLE}
                                            verticalAlign="bottom"
                                            height={36}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text overlay */}
                                {!isDonutHovering && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="text-center">
                                            <div className="text-xs text-slate-500 font-medium">Platform</div>
                                            <div className="text-xl font-bold text-slate-900">Mix</div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Bar Chart - Full width */}
            <Card padding="none" className="flex flex-col h-[400px]">
                {loading ? (
                    <div className="p-4 h-full flex flex-col">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="flex-1 w-full" />
                    </div>
                ) : (
                    <>
                        <CardHeader>
                            <CardTitle>Top Clients by Incidents</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={clientErrors}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                    onClick={(data) => {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        if (data && (data as any).activePayload && (data as any).activePayload[0]) {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            const clientName = (data as any).activePayload[0].payload.name;
                                            onNavigate('client-detail', { client: clientName });
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    <CartesianGrid
                                        {...GRID_STYLE}
                                        horizontal={false}
                                    />
                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE.tick}
                                        axisLine={AXIS_STYLE.axisLine}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={100}
                                        tick={AXIS_STYLE.tick}
                                        axisLine={AXIS_STYLE.axisLine}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={TOOLTIP_STYLE.contentStyle}
                                        itemStyle={TOOLTIP_STYLE.itemStyle}
                                        cursor={{
                                            fill: 'rgba(239, 68, 68, 0.05)',  // Very subtle red highlight
                                            strokeWidth: 0
                                        }}
                                        formatter={(value: number) => [`${value} incidents`, 'Count']}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill={CHART_COLORS.semantic.error}
                                        radius={[0, 4, 4, 0]}
                                        barSize={20}
                                        animationDuration={300}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </>
                )}
            </Card>

            {/* Recent Critical Logs Table - Full width */}
            <Card padding="none" className="overflow-hidden flex flex-col h-[400px]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Critical Incidents</CardTitle>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Incidents</button>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto relative scrollbar-thin">
                    {loading ? (
                        <div className="space-y-4 p-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 flex-1" />
                                </div>
                            ))}
                        </div>
                    ) : stats.errorCount === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <CheckCircle2 size={48} className="mb-2 text-emerald-500/50" />
                            <p>No critical incidents detected</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader sticky>
                                <TableRow hoverable={false}>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Robot</TableHead>
                                    <TableHead>Message</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {criticalIncidents.map((log) => {
                                    const severity = getSeverity(log.level);

                                    return (
                                        <TableRow
                                            key={log.id}
                                            className="group cursor-pointer focus-within:bg-blue-50/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500"
                                            onClick={() => handleIncidentClick(log)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleIncidentClick(log);
                                                } else if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    // Focus next row
                                                    const nextRow = e.currentTarget.nextElementSibling as HTMLElement;
                                                    nextRow?.focus();
                                                } else if (e.key === 'ArrowUp') {
                                                    e.preventDefault();
                                                    // Focus previous row
                                                    const prevRow = e.currentTarget.previousElementSibling as HTMLElement;
                                                    prevRow?.focus();
                                                }
                                            }}
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`View details for incident: ${log.message}`}
                                        >
                                            <TableCell>
                                                <Badge
                                                    variant={severity.variant}
                                                    size="sm"
                                                    dot
                                                >
                                                    {severity.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-slate-500 whitespace-nowrap font-mono text-xs">
                                                {log.time.toLocaleTimeString()}
                                            </TableCell>
                                            <TableCell className="font-medium text-slate-900">
                                                {log.client}
                                            </TableCell>
                                            <TableCell className="text-slate-600">
                                                {log.robotName}
                                            </TableCell>
                                            <TableCell className="text-slate-600 max-w-xs truncate">
                                                {log.message}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Incident Details Drawer */}
            <IncidentDetailsDrawer
                incident={selectedIncident}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
            />
        </div>
    );
}
