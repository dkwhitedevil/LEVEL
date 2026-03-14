'use client';

import { Activity, AlertTriangle, ArrowUpRight, TrendingDown, ShieldAlert, Layers, BarChart2, Info } from 'lucide-react';
import { motion } from 'motion/react';

const alerts = [
  {
    id: 1,
    title: 'Thin Liquidity Detected',
    time: '12 sec ago',
    severity: 'Medium',
    severityColor: 'text-[#FFB800]',
    borderColor: 'border-[#FFB800]/20',
    bgColor: 'bg-[#FFB800]/5',
    glowColor: 'group-hover:bg-[#FFB800]/10',
    explanation: 'Nearby ask depth weakened within immediate execution range.',
    icon: Layers,
  },
  {
    id: 2,
    title: 'Spread Widening',
    time: '8 sec ago',
    severity: 'Low',
    severityColor: 'text-brand-green',
    borderColor: 'border-brand-green/20',
    bgColor: 'bg-brand-green/5',
    glowColor: 'group-hover:bg-brand-green/10',
    explanation: 'Best bid and ask levels moved apart by 14%.',
    icon: Activity,
  },
  {
    id: 3,
    title: 'Ask Wall Removed',
    time: '15 sec ago',
    severity: 'High',
    severityColor: 'text-brand-red',
    borderColor: 'border-brand-red/20',
    bgColor: 'bg-brand-red/5',
    glowColor: 'group-hover:bg-brand-red/10',
    explanation: 'Major resistance depth disappeared above current market.',
    icon: ArrowUpRight,
  },
  {
    id: 4,
    title: 'Fragile Support Nearby',
    time: '20 sec ago',
    severity: 'Medium',
    severityColor: 'text-[#FFB800]',
    borderColor: 'border-[#FFB800]/20',
    bgColor: 'bg-[#FFB800]/5',
    glowColor: 'group-hover:bg-[#FFB800]/10',
    explanation: 'Bid strength weakens sharply below nearest price zone.',
    icon: TrendingDown,
  },
];

export default function LiveAlertsScreen() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full pb-8">
      {/* Top Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Live Market Alerts</h1>
        <p className="text-brand-gray font-light text-lg">
          Real-time structural signals that may affect execution quality.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 mb-8">
        
        {/* LEFT SIDE — Alert Feed */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden group hover:bg-brand-surface/60 hover:border-brand-gray/30 transition-all`}
              >
                {/* Subtle Glow Accent */}
                <div className={`absolute top-0 left-0 w-full h-full opacity-0 ${alert.glowColor} transition-opacity duration-500 pointer-events-none`} />
                
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${alert.borderColor} ${alert.bgColor} ${alert.severityColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <h3 className="text-xl font-space font-medium text-white">
                      {alert.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${alert.borderColor} ${alert.bgColor} ${alert.severityColor}`}>
                        {alert.severity} Severity
                      </span>
                      <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-base text-brand-gray/80 font-light leading-relaxed">
                    {alert.explanation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE — Live Status Panel */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          <div className="p-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,229,255,0.03)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <h3 className="text-sm font-mono text-brand-blue uppercase tracking-wider">Live Status</h3>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Active Alerts</span>
              <span className="text-3xl font-space font-bold text-white">4</span>
            </div>
            
            <div className="w-full h-px bg-brand-blue/10" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Liquidity Confidence</span>
              <span className="text-lg font-medium text-brand-green">High</span>
            </div>
            
            <div className="w-full h-px bg-brand-blue/10" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Structural Stability</span>
              <span className="text-lg font-medium text-[#FFB800]">Medium</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION — Summary Insight Card */}
      <div className="mt-auto">
        <div className="p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-black border border-brand-border flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-brand-gray" />
          </div>
          <p className="text-white font-medium text-lg leading-relaxed">
            Current market remains stable but localized fragility is emerging above immediate ask levels.
          </p>
        </div>
      </div>

    </div>
  );
}
