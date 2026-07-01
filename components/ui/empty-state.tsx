import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className="p-8 sm:p-12">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md">{description}</p>
          </div>
          {actionLabel && onAction && (
            <Button onClick={onAction} size="sm" className="mt-2">
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
