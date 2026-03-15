'use client';

import { motion } from 'motion/react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const marketData = [
  {
    pair: 'INJ / USDT',
    metrics: [
      { label: 'Spread', value: 'Stable', status: 'neutral' },
      { label: 'Liquidity', value: 'Strong', status: 'positive' },
      { label: 'Expected Slippage', value: '1.8%', status: 'warning' },
    ],
    trend: 'positive',
  },
  {
    pair: 'BTC / USDT',
    metrics: [
      { label: 'Spread', value: 'Medium', status: 'warning' },
      { label: 'Depth', value: 'Strong', status: 'positive' },
      { label: 'Slippage', value: 'Moderate', status: 'warning' },
    ],
    trend: 'positive',
  },
  {
    pair: 'ETH / USDT',
    metrics: [
      { label: 'Depth', value: 'Balanced', status: 'neutral' },
      { label: 'Spread', value: 'Low', status: 'positive' },
      { label: 'Execution', value: 'Stable', status: 'positive' },
    ],
    trend: 'neutral',
  },
  {
    pair: 'ATOM / USDT',
    metrics: [
      { label: 'Liquidity', value: 'Moderate', status: 'warning' },
      { label: 'Upper Ask Levels', value: 'Fragile', status: 'negative' },
    ],
    trend: 'negative',
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'positive':
      return <TrendingUp className="w-3 h-3 text-emerald-400" />;
    case 'negative':
      return <TrendingDown className="w-3 h-3 text-rose-400" />;
    case 'warning':
      return <Activity className="w-3 h-3 text-amber-400" />;
    default:
      return <Minus className="w-3 h-3 text-brand-gray/50" />;
  }
};

const StatusColor = (status: string) => {
  switch (status) {
    case 'positive':
      return 'text-emerald-400';
    case 'negative':
      return 'text-rose-400';
    case 'warning':
      return 'text-amber-400';
    default:
      return 'text-white';
  }
};

export default function MarketsSection() {
  return (
    <section id="markets" className="w-full py-32 px-6 relative z-10 bg-[#02040A]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-space font-bold text-white tracking-tight mb-6"
          >
            Markets
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-brand-gray/70 font-light tracking-wide max-w-2xl"
          >
            Analyze liquidity behavior across active Injective Testnet trading pairs.
          </motion.p>
        </div>

        {/* Market Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {marketData.map((market, index) => (
            <motion.div
              key={market.pair}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-2xl bg-[#050A15]/80 border border-white/5 hover:border-brand-blue/30 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-space font-medium text-white tracking-wide">
                    {market.pair}
                  </h3>
                  
                  {/* Micro Chart Placeholder */}
                  <div className="w-16 h-8 flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    {[40, 60, 45, 80, 55, 90].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 rounded-t-sm ${market.trend === 'negative' ? 'bg-rose-500/50' : market.trend === 'positive' ? 'bg-emerald-500/50' : 'bg-brand-blue/50'}`} 
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {market.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-brand-gray/60 font-light tracking-wide">
                        {metric.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <StatusIcon status={metric.status} />
                        <span className={`text-sm font-medium ${StatusColor(metric.status)}`}>
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Market Indicator Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out w-0 group-hover:w-full ${market.trend === 'negative' ? 'bg-rose-500/50' : market.trend === 'positive' ? 'bg-emerald-500/50' : 'bg-brand-blue/50'}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-r from-[#050A15] to-[#02040A] border border-brand-blue/20 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-brand-blue/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -right-32 -top-32 w-64 h-64 bg-brand-blue/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
              <Activity className="w-5 h-5 text-brand-blue" />
            </div>
            <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed tracking-wide font-space">
              Price shows where the market is. <br className="hidden md:block" />
              <span className="text-brand-blue font-medium">Liquidity explains what happens when you enter on Injective Testnet.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
