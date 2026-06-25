import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-emerald-600',
}: StatCardProps) {
  return (
    <Card className="hover:border-slate-700 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-100">{value}</h3>
            {change && (
              <p
                className={cn(
                  'mt-2 text-xs font-medium',
                  changeType === 'positive' && 'text-emerald-500',
                  changeType === 'negative' && 'text-red-500',
                  changeType === 'neutral' && 'text-slate-400'
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', iconColor)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
