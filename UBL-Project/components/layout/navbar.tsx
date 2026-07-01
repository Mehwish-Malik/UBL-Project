'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export function Navbar() {
  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 theme-transition"
    >
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative w-full max-w-md"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions, alerts..."
            className="w-full pl-10"
          />
        </motion.div>
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3"
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute right-1.5 top-1.5 flex h-2 w-2"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </motion.span>
        </Button>

        {/* User Profile */}
        <Button variant="ghost" className="gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0052D4] to-[#003d9e] shadow-lg">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">Ahmed Khan</p>
            <p className="text-xs text-muted-foreground">Nexus Member</p>
          </div>
        </Button>
      </motion.div>
    </motion.header>
  );
}
