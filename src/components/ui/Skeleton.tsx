import { cn } from '../../lib/utils'; // Assuming utils is at this path, verification needed if not standard
// Actually, based on previous files, utils is likely at ../../lib/utils or ../../../lib/utils depending on depth.
// Let's check imports in other UI files. In Input.tsx it was ../../../lib/utils (depth 3 from components/ui/input)
// Skeleton will be in src/components/ui/Skeleton.tsx (depth 2 from src/components/ui) -> ../../lib/utils.

/**
 * Skeleton - Loading placeholder with shimmer effect
 */
export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-slate-200', className)}
            {...props}
        />
    );
}
