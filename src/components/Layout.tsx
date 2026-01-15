import React from 'react';
import { Bot, LayoutDashboard, List, PieChart, Settings, Bell, Search, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLogs } from '../context/LogContext';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onNavigate: (tab: string) => void;
}

export function Layout({ children, activeTab, onNavigate }: LayoutProps) {
    const { stats } = useLogs();

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800 z-20">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">RPA Monitor</h1>
                        <p className="text-xs text-slate-400">Enterprise Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-2">
                        Overview
                    </div>
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                    />
                    <NavItem
                        icon={<List size={20} />}
                        label="All Logs"
                        active={activeTab === 'logs'}
                        onClick={() => onNavigate('logs')}
                    />
                    <NavItem
                        icon={<PieChart size={20} />}
                        label="Analytics"
                        active={activeTab === 'analytics'}
                        onClick={() => onNavigate('analytics')}
                    />

                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-6">
                        Management
                    </div>
                    <NavItem
                        icon={<Settings size={20} />}
                        label="Configuration"
                        active={activeTab === 'config'}
                        onClick={() => onNavigate('config')}
                    />
                </nav>

                <div className="p-4 bg-slate-800/50 m-4 rounded border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-300">System Status: Operational</span>
                    </div>
                    <div className="text-xs text-slate-400">
                        Last update: {stats.lastUpdate?.toLocaleTimeString()}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4 w-96">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search clients, robots, processes..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded transition-colors">
                            <Bell size={20} />
                            {stats.errorCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            )}
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-semibold text-slate-900">Support Agent</div>
                                <div className="text-xs text-slate-500">Admin</div>
                            </div>
                            <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-white">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-auto px-space-3 py-space-3 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-space-3 animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-medium transition-all duration-200 group relative",
                active
                    ? "bg-slate-800 text-white border-l-4 border-l-primary-500"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
        >
            <span className={cn("transition-colors", active ? "text-white" : "group-hover:text-white")}>{icon}</span>
            <span>{label}</span>
        </button>
    );
}
