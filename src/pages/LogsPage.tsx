import { useState, useMemo } from 'react';
import { useLogs } from '../context/LogContext';
import { useToast } from '../context/ToastContext';
import { Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Papa from 'papaparse';
import {
    Card,
    Badge,
    Button,
    Input,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '../components/ui';

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
        showToast('Data exported successfully', 'success');
    };

    return (
        <div className="space-y-space-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">System Logs</h2>
                <Button
                    onClick={handleExport}
                    variant="secondary"
                    iconLeft={Download}
                >
                    Export Data
                </Button>
            </div>

            {/* Filters */}
            <Card className="flex flex-col sm:flex-row gap-4 items-center">
                <Input
                    type="text"
                    placeholder="Search messages, robots..."
                    value={filterText}
                    onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1); }}
                    iconLeft={Filter}
                    fullWidth
                    className="bg-slate-50"
                />

                <select
                    value={levelFilter}
                    onChange={(e) => { setLevelFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-fast"
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
                    className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-fast"
                >
                    <option value="All">All Clients</option>
                    {clients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </Card>

            {/* Table */}
            <Card padding="none" className="overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow hoverable={false}>
                                <TableHead>Time</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Robot</TableHead>
                                <TableHead>Message</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="text-slate-500 whitespace-nowrap font-mono text-xs">{log.time.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                log.level === 'Info' ? 'info' :
                                                log.level === 'Trace' ? 'neutral' :
                                                log.level === 'Warning' ? 'warning' :
                                                'error'
                                            }
                                        >
                                            {log.level}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-700">{log.client}</TableCell>
                                    <TableCell className="text-slate-500">{log.robotName}</TableCell>
                                    <TableCell className="text-slate-600 max-w-lg truncate" title={log.message}>{log.message}</TableCell>
                                </TableRow>
                            ))}
                            {currentData.length === 0 && (
                                <TableRow hoverable={false}>
                                    <TableCell colSpan={5} className="py-12 text-center text-slate-400">
                                        No logs match the current filters
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-white border-t border-slate-200 py-4 px-space-3 flex items-center justify-between">
                    <div className="text-sm text-slate-500 hidden sm:block">
                        Showing <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-medium">{Math.min(currentPage * PAGE_SIZE, filteredLogs.length)}</span> of <span className="font-medium">{filteredLogs.length}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            variant="secondary"
                            size="sm"
                            iconLeft={ChevronLeft}
                            className="px-2"
                        >
                        </Button>
                        <span className="text-sm font-medium text-slate-700">Page {currentPage} of {totalPages}</span>
                        <Button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            variant="secondary"
                            size="sm"
                            iconLeft={ChevronRight}
                            className="px-2"
                        >
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
