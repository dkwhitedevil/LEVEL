'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  BarChart2, 
  CheckSquare, 
  Bell, 
  History, 
  Settings,
  LogOut,
  Target
} from 'lucide-react';

const navItems = [
  { name: 'Intelligence', href: '/dashboard', icon: Activity },
  { name: 'Deep Analysis', href: '/dashboard/analysis', icon: BarChart2 },
  { name: 'Execution Recs', href: '/dashboard/recommendation', icon: CheckSquare },
  { name: 'Live Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Trade Outcome', href: '/dashboard/outcome', icon: Target },
  { name: 'History', href: '/dashboard/history', icon: History },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-brand-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-navy flex flex-col z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-brand-border">
          <Link href="/" className="text-2xl font-space font-bold tracking-widest text-white">LEVEL</Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                  isActive ? 'bg-brand-blue/10 text-brand-blue' : 'text-brand-gray hover:bg-brand-surface hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-full bg-brand-blue rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-blue' : 'text-brand-gray group-hover:text-white'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-gray hover:bg-brand-surface hover:text-white transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </div>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-gray hover:bg-brand-surface hover:text-brand-red transition-all cursor-pointer mt-1">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Disconnect</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-brand-border bg-brand-black/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-surface border border-brand-border">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-mono text-brand-gray-light">INJ Network</span>
            </div>
            <div className="text-xs font-mono text-brand-gray">Block: 84,291,004</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm font-mono text-brand-gray">inj1...8x9f</div>
            <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
              <span className="text-xs font-bold text-brand-blue">U</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
