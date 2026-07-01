import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn('border-red-900/50 bg-red-950/20', className)}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-500">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md">{message}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm">
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
