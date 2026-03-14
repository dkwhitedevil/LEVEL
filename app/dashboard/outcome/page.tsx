'use client';

import { CheckCircle2, ShieldCheck, Target, TrendingUp, Activity, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, ComposedChart } from 'recharts';

const chartData = [
  { time: '0.0s', predicted: 0, actual: 0 },
  { time: '0.5s', predicted: 0.4, actual: 0.3 },
  { time: '1.0s', predicted: 0.9, actual: 0.7 },
  { time: '1.5s', predicted: 1.4, actual: 1.1 },
  { time: '2.1s', predicted: 1.8, actual: 1.5 },
];

export default function ExecutionOutcomeScreen() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full pb-8 overflow-y-auto custom-scrollbar pr-2">
      {/* Top Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Execution Outcome</h1>
        <p className="text-brand-gray font-light text-lg">
          Comparing projected execution quality with actual market result.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT/CENTER CONTENT */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Predicted Slippage */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 flex flex-col gap-2"
            >
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Predicted Slippage</span>
              <span className="text-4xl font-space font-bold text-white mt-2">1.8%</span>
              <span className="text-sm text-brand-gray-light font-light mt-2">Estimated before execution</span>
            </motion.div>

            {/* Card 2: Actual Slippage */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl border border-brand-green/20 bg-brand-green/5 flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-[40px] rounded-full pointer-events-none" />
              <span className="text-xs font-mono text-brand-green uppercase tracking-wider relative z-10">Actual Slippage</span>
              <span className="text-4xl font-space font-bold text-brand-green mt-2 relative z-10">1.5%</span>
              <span className="text-sm text-brand-green/70 font-light mt-2 relative z-10">Observed after trade completion</span>
            </motion.div>

            {/* Card 3: Prediction Accuracy */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-[40px] rounded-full pointer-events-none" />
              <span className="text-xs font-mono text-brand-blue uppercase tracking-wider relative z-10">Prediction Accuracy</span>
              <span className="text-4xl font-space font-bold text-brand-blue mt-2 relative z-10">83%</span>
              <span className="text-sm text-brand-blue/70 font-light mt-2 relative z-10">Model alignment with execution outcome</span>
            </motion.div>
          </div>

          {/* Center Visual Comparison */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 mb-8 h-80 flex flex-col relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Slippage Curve Comparison</h3>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-brand-gray border border-brand-gray border-dashed" />
                  <span className="text-brand-gray">Predicted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-brand-green rounded-full" />
                  <span className="text-brand-green">Actual</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-green)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="var(--color-brand-green)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-brand-gray)', fontSize: 10, fontFamily: 'monospace' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-brand-gray)', fontSize: 10, fontFamily: 'monospace' }} dx={-10} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1A1A1A', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ stroke: 'var(--color-brand-gray)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="none" fill="url(#actualGrad)" />
                  <Line type="monotone" dataKey="predicted" stroke="var(--color-brand-gray)" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-brand-green)" strokeWidth={2} dot={{ r: 4, fill: '#0A0A0A', stroke: 'var(--color-brand-green)', strokeWidth: 2 }} activeDot={{ r: 6, fill: 'var(--color-brand-green)' }} name="Actual" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Lower Summary Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-surface/30 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
              </div>
              <h3 className="text-lg md:text-xl font-space font-medium text-white">
                Execution completed with lower than expected market impact.
              </h3>
            </div>
            
            <ul className="flex flex-col gap-4 ml-2 md:ml-14">
              <li className="flex items-center gap-4 text-sm md:text-base text-brand-gray-light font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
                Liquidity remained stable during execution
              </li>
              <li className="flex items-center gap-4 text-sm md:text-base text-brand-gray-light font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
                Spread did not widen significantly
              </li>
              <li className="flex items-center gap-4 text-sm md:text-base text-brand-gray-light font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
                Order crossed two moderate ask levels
              </li>
            </ul>
          </motion.div>

        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Trade Metadata */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 flex flex-col gap-6"
          >
            <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Trade Metadata
            </h3>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-gray font-light">Pair</span>
              <span className="text-base font-mono text-white">INJ / USDT</span>
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-gray font-light">Trade Size</span>
              <span className="text-base font-mono text-white">500 USDT</span>
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-gray font-light">Order Type</span>
              <span className="text-base font-mono text-white">Market</span>
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-gray font-light">Execution Time</span>
              <span className="text-base font-mono text-white">2.1 sec</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* BOTTOM INSIGHT CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-6 md:p-8 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 flex items-center gap-5 shadow-[0_0_30px_rgba(0,229,255,0.03)]"
      >
        <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-brand-blue" />
        </div>
        <p className="text-white font-medium text-lg leading-relaxed">
          Prediction quality improves when nearby liquidity remains structurally stable.
        </p>
      </motion.div>

    </div>
  );
}
