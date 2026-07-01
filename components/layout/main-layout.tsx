'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { LayoutProvider, useLayout } from './layout-provider';
import { cn } from '@/lib/utils';

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, isDesktop } = useLayout();

  return (
    <div className="flex min-h-screen bg-background theme-transition">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300',
          // Desktop: adjust for sidebar width
          isDesktop && sidebarOpen && 'lg:pl-64',
          isDesktop && !sidebarOpen && 'lg:pl-16',
          // Mobile/Tablet: no padding (drawer overlay)
          !isDesktop && 'pl-0'
        )}
      >
        <Navbar />
        <main className="flex-1 p-4 sm:p-6">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </LayoutProvider>
  );
}
