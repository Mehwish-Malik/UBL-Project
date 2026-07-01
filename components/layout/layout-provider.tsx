'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      // Desktop: sidebar always open, tablet/mobile: closed by default
      if (desktop) {
        setSidebarOpen(true);
      } else if (mobile || tablet) {
        setSidebarOpen(false);
      }
    };

    // Initial setup
    updateLayout();

    // Listen for resize
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}
