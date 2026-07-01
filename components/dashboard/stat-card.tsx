'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { memo } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export const StatCard = memo(function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-emerald-600',
}: StatCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden relative group cursor-pointer h-full">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardContent className="p-4 sm:p-6 relative h-full">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
              <motion.h3
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="text-2xl sm:text-3xl font-bold truncate"
              >
                {value}
              </motion.h3>
              {change && (
                <p
                  className={cn(
                    'text-xs font-medium flex items-center gap-1 truncate',
                    changeType === 'positive' && 'text-emerald-600 dark:text-emerald-500',
                    changeType === 'negative' && 'text-red-600 dark:text-red-500',
                    changeType === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  {change}
                </p>
              )}
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
              className={cn(
                'flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-xl shadow-lg',
                iconColor
              )}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" />
            </motion.div>
          </div>

          {/* Bottom glow effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ transformOrigin: 'left' }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
});
