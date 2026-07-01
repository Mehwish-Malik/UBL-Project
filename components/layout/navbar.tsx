'use client';

import { Bell, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useLayout } from './layout-provider';
import { useState } from 'react';

export function Navbar() {
  const { toggleSidebar, isMobile, isTablet } = useLayout();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-3 sm:px-6 theme-transition"
    >
      {/* Mobile/Tablet Menu Button */}
      {(isMobile || isTablet) && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={false}
          aria-controls="mobile-sidebar"
        >
          <Menu className="h-5 w-5" />
        </motion.button>
      )}

      {/* Search */}
      <div className="flex flex-1 items-center gap-2 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={`relative w-full transition-all ${
            searchFocused || !isMobile ? 'max-w-md' : 'max-w-[120px]'
          }`}
        >
          <Search className="absolute left-2 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder={isMobile && !searchFocused ? 'Search...' : 'Search transactions, alerts...'}
            className="w-full pl-8 sm:pl-10 text-sm"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search transactions and alerts"
            role="searchbox"
          />
        </motion.div>
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-1 sm:gap-2"
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 sm:h-10 sm:w-10"
          aria-label="View notifications - 1 unread"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 flex h-2 w-2"
            aria-hidden="true"
            role="status"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </motion.span>
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          className="gap-1.5 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3"
          aria-label="User account menu for Ahmed Khan"
        >
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0052D4] to-[#003d9e] shadow-lg">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none">Ahmed Khan</p>
            <p className="text-xs text-muted-foreground mt-0.5">Nexus Member</p>
          </div>
        </Button>
      </motion.div>
    </motion.header>
  );
}
