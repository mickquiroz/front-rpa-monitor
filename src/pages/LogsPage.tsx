import { useState, useMemo } from 'react';
import { useLogs } from '../context/LogContext';
import { useToast } from '../context/ToastContext';
import { Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import Papa from 'papaparse';

const PAGE_SIZE = 50;

interface LogsPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialFilters?: any;
}

export function LogsPage({ initialFilters = {} }: LogsPageProps) {
    const { logs } = useLogs();
    const { showToast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [levelFilter, setLevelFilter] = useState<string>(initialFilters.level || 'All');
    const [clientFilter, setClientFilter] = useState<string>(initialFilters.client || 'All');

    // Unique Clients
    const clients = useMemo(() => {
        return Array.from(new Set(logs.map(l => l.client))).sort();
    }, [logs]);

    // Filtered Data
    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesText =
                log.message.toLowerCase().includes(filterText.toLowerCase()) ||
                log.robotName.toLowerCase().includes(filterText.toLowerCase());
            const matchesLevel = levelFilter === 'All' || log.level === levelFilter;
            const matchesClient = clientFilter === 'All' || log.client === clientFilter;

            return matchesText && matchesLevel && matchesClient;
        });
    }, [logs, filterText, levelFilter, clientFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);
    const currentData = filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleExport = () => {
        const csv = Papa.unparse(filteredLogs);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'rpa_logs_export.csv';
        link.click();
        showToast('Export started successfully', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">System Logs</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <Download size={16} />
                    Export Filtered
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search messages, robots..."
                        value={filterText}
                        onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <select
                    value={levelFilter}
                    onChange={(e) => { setLevelFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                    <option value="All">All Levels</option>
                    <option value="Info">Info</option>
                    <option value="Trace">Trace</option>
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
                    <option value="Fatal">Fatal</option>
                </select>

                <select
                    value={clientFilter}
                    onChange={(e) => { setClientFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                    <option value="All">All Clients</option>
                    {clients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Robot</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentData.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 text-sm text-slate-500 whitespace-nowrap font-mono text-xs">{log.time.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-sm">
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-xs font-medium",
                                            log.level === 'Info' && "bg-blue-100 text-blue-700",
                                            log.level === 'Trace' && "bg-slate-100 text-slate-700",
                                            log.level === 'Warning' && "bg-orange-100 text-orange-700",
                                            (log.level === 'Error' || log.level === 'Fatal') && "bg-red-100 text-red-700"
                                        )}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-sm font-medium text-slate-700">{log.client}</td>
                                    <td className="px-6 py-3 text-sm text-slate-500">{log.robotName}</td>
                                    <td className="px-6 py-3 text-sm text-slate-600 max-w-lg truncate" title={log.message}>{log.message}</td>
                                </tr>
                            ))}
                            {currentData.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        No logs found matching filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="text-sm text-slate-500 hidden sm:block">
                        Showing <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-medium">{Math.min(currentPage * PAGE_SIZE, filteredLogs.length)}</span> of <span className="font-medium">{filteredLogs.length}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-medium text-slate-700">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
