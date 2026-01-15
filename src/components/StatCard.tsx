import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "blue" | "red" | "green" | "purple" | "orange";
}

const bgMap = {
    blue: "bg-slate-100 text-blue-700",
    red: "bg-slate-100 text-red-700",
    green: "bg-slate-100 text-emerald-700",
    purple: "bg-slate-100 text-purple-700",
    orange: "bg-slate-100 text-orange-700",
};

export function StatCard({ label, value, icon: Icon, trend, trendUp, color = "blue" }: StatCardProps) {
    return (
        <div className="bg-white p-space-3 rounded border border-slate-200 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight tabular-nums">{value}</h3>
                </div>
                <div className={cn("p-3 rounded", bgMap[color])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className={cn("font-medium", trendUp ? "text-emerald-600" : "text-red-600")}>
                        {trend}
                    </span>
                    <span className="text-slate-400 ml-2">vs. previous period</span>
                </div>
            )}
        </div>
    );
}
