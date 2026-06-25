'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Mic,
  ShieldAlert,
  Calculator,
  Heart,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-slate-800 bg-slate-950 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[#0052D4] to-[#003d9e] px-3 py-2 shadow-lg shadow-blue-900/20">
              <span className="text-xs font-bold leading-none text-white">UBL</span>
              <span className="text-[10px] font-semibold leading-none text-blue-100 mt-0.5">Nexus AI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-100">UBL Nexus AI</span>
              <span className="text-xs text-slate-500">Connected Intelligence</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        >
          <ChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-[#0052D4] to-[#0041a8] text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs font-medium text-slate-100">Need Help?</p>
            <p className="mt-1 text-xs text-slate-500">
              Contact support 24/7
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
