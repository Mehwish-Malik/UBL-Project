'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Mic,
  ShieldAlert,
  Calculator,
  Heart,
  Shield,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Voice Assistant',
    href: '/voice-assistant',
    icon: Mic,
  },
  {
    title: 'Fraud Shield',
    href: '/fraud-shield',
    icon: Shield,
  },
  {
    title: 'Fraud Alerts',
    href: '/fraud-alerts',
    icon: ShieldAlert,
  },
  {
    title: 'Loan Checker',
    href: '/loan-checker',
    icon: Calculator,
  },
  {
    title: 'Financial Health',
    href: '/financial-health',
    icon: Heart,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card theme-transition',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{ transition: 'width 0.3s ease' }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[#0052D4] to-[#003d9e] px-3 py-2 shadow-lg glow-primary">
                <span className="text-xs font-bold leading-none text-white">UBL</span>
                <span className="text-[10px] font-semibold leading-none text-blue-100 mt-0.5">Nexus AI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">UBL Nexus AI</span>
                <span className="text-xs text-muted-foreground">Connected Intelligence</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className={cn('h-5 w-5 transition-transform duration-300', collapsed && 'rotate-180')} />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-[#0052D4] to-[#0041a8] text-white shadow-lg glow-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0052D4] to-[#0041a8]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="h-5 w-5 flex-shrink-0 relative z-10" />
                {!collapsed && <span className="relative z-10">{item.title}</span>}

                {/* Hover glow effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 border-t border-border p-4"
          >
            <div className="rounded-lg bg-muted/50 p-3 backdrop-blur-sm">
              <p className="text-xs font-medium">Need Help?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Contact support 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
