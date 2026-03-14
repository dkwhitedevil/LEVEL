'use client';

import { History, ArrowRight, Activity, CheckCircle2, AlertTriangle, Filter, ChevronDown, ShieldCheck, Target, TrendingUp, Info } from 'lucide-react';
import { motion } from 'motion/react';

const historyData = [
  {
    id: 'TRD-9021',
    pair: 'INJ / USDT',
    time: 'Today, 14:32',
    recommendation: 'Split Trade',
    predicted: '1.8%',
    actual: '1.5%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20'
  },
  {
    id: 'TRD-8942',
    pair: 'BTC / USDT',
    time: 'Yesterday, 18:10',
    recommendation: 'Wait',
    predicted: '2.4%',
    actual: '2.1%',
    outcome: 'Spread improved before entry',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20'
  },
  {
    id: 'TRD-8810',
    pair: 'ETH / USDT',
    time: 'Yesterday, 09:20',
    recommendation: 'Execute Now',
    predicted: '1.1%',
    actual: '1.3%',
    outcome: 'Stable fill',
    status: 'warning',
    statusColor: 'text-[#FFB800]',
    bgColor: 'bg-[#FFB800]/5',
    borderColor: 'border-[#FFB800]/20'
  }
];

export default function HistoricalIntelligenceScreen() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full pb-8 overflow-y-auto custom-scrollbar pr-2">
      {/* Top Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Historical Intelligence</h1>
        <p className="text-brand-gray font-light text-lg">
          Review previous liquidity analyses, recommendations, and execution outcomes.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT SIDE PANEL — Filters */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-brand-gray" />
            <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Filters</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Pair Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-brand-gray-light font-light">Pair</label>
              <div className="p-3 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors">
                <span className="text-sm font-mono text-white">All Pairs</span>
                <ChevronDown className="w-4 h-4 text-brand-gray" />
              </div>
            </div>
            
            {/* Time Range */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-brand-gray-light font-light">Time Range</label>
              <div className="p-3 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors">
                <span className="text-sm font-mono text-white">Last 7 Days</span>
                <ChevronDown className="w-4 h-4 text-brand-gray" />
              </div>
            </div>
            
            {/* Recommendation Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-brand-gray-light font-light">Recommendation Type</label>
              <div className="p-3 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors">
                <span className="text-sm font-mono text-white">Any</span>
                <ChevronDown className="w-4 h-4 text-brand-gray" />
              </div>
            </div>
            
            {/* Outcome Quality */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-brand-gray-light font-light">Outcome Quality</label>
              <div className="p-3 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors">
                <span className="text-sm font-mono text-white">All Outcomes</span>
                <ChevronDown className="w-4 h-4 text-brand-gray" />
              </div>
            </div>
          </div>
        </div>

        {/* CENTER SECTION — Timeline / Cards */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-brand-gray" />
            <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Execution Timeline</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {historyData.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:bg-brand-surface/60 hover:border-brand-gray/30 transition-all"
              >
                {/* Left: Pair & Time */}
                <div className="flex flex-col gap-1 md:w-48 shrink-0">
                  <span className="text-xl font-space font-bold text-white">{entry.pair}</span>
                  <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">{entry.time}</span>
                </div>
                
                {/* Middle: Metrics */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-brand-gray uppercase tracking-wider">Predicted</span>
                    <span className="text-lg font-mono text-brand-gray-light">{entry.predicted}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-brand-gray uppercase tracking-wider">Actual</span>
                    <span className={`text-lg font-mono font-medium ${entry.statusColor}`}>{entry.actual}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[10px] font-mono text-brand-gray uppercase tracking-wider">Recommendation</span>
                    <span className="text-sm font-medium text-white px-3 py-1 rounded-md bg-brand-surface border border-brand-border inline-flex w-fit mt-1">
                      {entry.recommendation}
                    </span>
                  </div>
                </div>
                
                {/* Right: Outcome */}
                <div className="flex flex-col gap-2 md:w-64 shrink-0 md:items-end md:text-right">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${entry.borderColor} ${entry.bgColor} ${entry.statusColor} text-xs font-medium`}>
                    {entry.status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {entry.outcome}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE PANEL — Insights */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-brand-gray" />
            <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Performance Summary</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 flex flex-col gap-2 relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.03)]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 blur-[30px] rounded-full pointer-events-none" />
            <span className="text-xs font-mono text-brand-blue uppercase tracking-wider relative z-10">Average Accuracy</span>
            <span className="text-4xl font-space font-bold text-brand-blue mt-1 relative z-10">84%</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 flex flex-col gap-2"
          >
            <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Most Used Strategy</span>
            <span className="text-xl font-space font-medium text-white mt-1">Split Trade</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl border border-brand-green/20 bg-brand-green/5 flex flex-col gap-2 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 blur-[30px] rounded-full pointer-events-none" />
            <span className="text-xs font-mono text-brand-green uppercase tracking-wider relative z-10">Max Slippage Avoided</span>
            <span className="text-3xl font-space font-bold text-brand-green mt-1 relative z-10">1.6%</span>
          </motion.div>
        </div>

      </div>

      {/* BOTTOM INSIGHT CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 flex items-center gap-5"
      >
        <div className="w-12 h-12 rounded-full bg-brand-black border border-brand-border flex items-center justify-center shrink-0">
          <Info className="w-6 h-6 text-brand-gray" />
        </div>
        <p className="text-white font-medium text-lg leading-relaxed">
          Execution quality improves when liquidity remains concentrated across multiple nearby levels.
        </p>
      </motion.div>

    </div>
  );
}
