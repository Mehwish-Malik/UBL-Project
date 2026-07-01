'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background theme-transition">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-64">
        <Navbar />
        <main className="flex-1 p-6">
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
