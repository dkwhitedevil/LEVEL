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
    <div className="min-h-screen bg-brand-black px-6 py-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-space font-bold text-white mb-3">Execution Outcome</h1>
          <p className="text-brand-gray text-lg">
            Comparing projected execution quality with actual market result
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Predicted Slippage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gray/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-brand-gray" />
                </div>
                <span className="text-sm font-mono text-brand-gray uppercase tracking-wider">Predicted Slippage</span>
              </div>
              <div className="space-y-2">
                <span className="text-5xl font-space font-bold text-white block">1.8%</span>
                <span className="text-sm text-brand-gray/70">Estimated before execution</span>
              </div>
            </motion.div>

            {/* Actual Slippage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-brand-green/20 bg-brand-green/5 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                  </div>
                  <span className="text-sm font-mono text-brand-green uppercase tracking-wider">Actual Slippage</span>
                </div>
                <div className="space-y-2">
                  <span className="text-5xl font-space font-bold text-brand-green block">1.5%</span>
                  <span className="text-sm text-brand-green/70">Observed after trade completion</span>
                </div>
              </div>
            </motion.div>

            {/* Prediction Accuracy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="text-sm font-mono text-brand-blue uppercase tracking-wider">Prediction Accuracy</span>
                </div>
                <div className="space-y-2">
                  <span className="text-5xl font-space font-bold text-brand-blue block">83%</span>
                  <span className="text-sm text-brand-blue/70">Model alignment with execution outcome</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-space font-medium text-white">Slippage Curve Comparison</h3>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-brand-gray border border-brand-gray border-dashed" />
                  <span className="text-brand-gray">Predicted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-brand-green rounded-full" />
                  <span className="text-brand-green">Actual</span>
                </div>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-green)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="var(--color-brand-green)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-brand-gray)', fontSize: 11, fontFamily: 'monospace' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-brand-gray)', fontSize: 11, fontFamily: 'monospace' }} dx={-10} tickFormatter={(val) => `${val}%`} />
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

          {/* Summary Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-space font-medium text-white mb-2">
                  Execution completed with lower than expected market impact
                </h3>
                <p className="text-brand-gray">
                  The actual slippage was better than predicted, indicating favorable market conditions during execution.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue/60" />
                <span className="text-brand-gray">Liquidity remained stable during execution</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue/60" />
                <span className="text-brand-gray">Spread did not widen significantly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue/60" />
                <span className="text-brand-gray">Order crossed two moderate ask levels</span>
              </div>
            </div>
          </motion.div>

          {/* Trade Metadata */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm"
          >
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-6 flex items-center gap-3">
              <Activity className="w-5 h-5" />
              Trade Metadata
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <span className="text-xs text-brand-gray block mb-2">Pair</span>
                <span className="text-lg font-mono text-white">INJ / USDT</span>
              </div>
              <div>
                <span className="text-xs text-brand-gray block mb-2">Trade Size</span>
                <span className="text-lg font-mono text-white">500 USDT</span>
              </div>
              <div>
                <span className="text-xs text-brand-gray block mb-2">Order Type</span>
                <span className="text-lg font-mono text-white">Market</span>
              </div>
              <div>
                <span className="text-xs text-brand-gray block mb-2">Execution Time</span>
                <span className="text-lg font-mono text-white">2.1 sec</span>
              </div>
            </div>
          </motion.div>

          {/* Insight Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-8 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 backdrop-blur-sm flex items-center gap-6"
          >
            <div className="w-14 h-14 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-brand-blue" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Key Insight</h4>
              <p className="text-brand-gray leading-relaxed">
                Prediction quality improves when nearby liquidity remains structurally stable. Consider monitoring order book depth before execution for optimal results.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
