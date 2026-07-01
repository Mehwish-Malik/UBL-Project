'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/types';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { memo, useMemo, useCallback } from 'react';

interface PieChartCardProps {
  title: string;
  description?: string;
  data: ChartData[];
  colors: string[];
}

export const PieChartCard = memo(function PieChartCard({ title, description, data, colors }: PieChartCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tooltipConfig = useMemo(() => ({
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: '8px',
    color: isDark ? '#f1f5f9' : '#0f172a',
  }), [isDark]);

  const renderLabel = useCallback((props: { name?: string; percent?: number }) => {
    const { name, percent } = props;
    return `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={0}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipConfig} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
});
