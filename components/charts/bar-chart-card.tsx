'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '@/types';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { memo, useMemo } from 'react';

interface BarChartCardProps {
  title: string;
  description?: string;
  data: ChartData[];
  dataKeys: { key: string; color: string; name: string }[];
}

export const BarChartCard = memo(function BarChartCard({ title, description, data, dataKeys }: BarChartCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartConfig = useMemo(() => ({
    gridStroke: isDark ? '#334155' : '#e2e8f0',
    axisStroke: isDark ? '#94a3b8' : '#64748b',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0',
    tooltipColor: isDark ? '#f1f5f9' : '#0f172a',
    cursorFill: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.3)',
  }), [isDark]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartConfig.gridStroke}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={chartConfig.axisStroke}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={chartConfig.axisStroke}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartConfig.tooltipBg,
                  border: `1px solid ${chartConfig.tooltipBorder}`,
                  borderRadius: '8px',
                  color: chartConfig.tooltipColor,
                }}
                cursor={{ fill: chartConfig.cursorFill }}
              />
              <Legend />
              {dataKeys.map((item) => (
                <Bar
                  key={item.key}
                  dataKey={item.key}
                  fill={item.color}
                  name={item.name}
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                  animationBegin={0}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
});
