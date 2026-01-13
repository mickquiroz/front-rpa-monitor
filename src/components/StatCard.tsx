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
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
    green: "bg-emerald-50 text-emerald-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
};

export function StatCard({ label, value, icon: Icon, trend, trendUp, color = "blue" }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">{value}</h3>
                </div>
                <div className={cn("p-3 rounded-lg", bgMap[color])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className={cn("font-medium", trendUp ? "text-emerald-600" : "text-red-600")}>
                        {trend}
                    </span>
                    <span className="text-slate-400 ml-2">from last month</span>
                </div>
            )}
        </div>
    );
}
