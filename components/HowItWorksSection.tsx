'use client';

import { motion } from 'motion/react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-32 px-6 relative z-10 bg-[#02040A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-space font-bold text-white tracking-tight mb-6"
          >
            How LEVEL Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-brand-gray/70 font-light tracking-wide max-w-2xl mx-auto"
          >
            Understand market structure before your order reaches execution on Injective Testnet.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 group p-10 rounded-3xl bg-[#050A15] border border-white/5 hover:border-brand-blue/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="mb-8 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#02040A] border border-white/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="font-space font-bold text-xl">01</span>
              </div>
              <h3 className="text-2xl font-space font-medium text-white mb-4">Analyze Liquidity</h3>
              <p className="text-brand-gray/70 font-light leading-relaxed">
                LEVEL reads live orderbook depth from Injective and identifies nearby liquidity concentration before a trade begins.
              </p>
            </div>

            {/* Subtle Visual: Depth Graph */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="h-24 w-full flex items-end justify-center gap-1 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                {[20, 35, 25, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-brand-blue/40 rounded-t-sm" 
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 group p-10 rounded-3xl bg-[#050A15] border border-white/5 hover:border-brand-blue/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="mb-8 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#02040A] border border-white/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="font-space font-bold text-xl">02</span>
              </div>
              <h3 className="text-2xl font-space font-medium text-white mb-4">Measure Execution Risk</h3>
              <p className="text-brand-gray/70 font-light leading-relaxed">
                The platform estimates spread behavior, slippage, and fragile zones that may affect execution quality.
              </p>
            </div>

            {/* Subtle Visual: Metric Cards */}
            <div className="mt-auto pt-8 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xs text-brand-gray/70">Est. Slippage</span>
                <span className="text-sm text-amber-400 font-mono">1.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xs text-brand-gray/70">Spread</span>
                <span className="text-sm text-emerald-400 font-mono">0.05%</span>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 group p-10 rounded-3xl bg-[#050A15] border border-white/5 hover:border-brand-blue/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="mb-8 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#02040A] border border-white/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="font-space font-bold text-xl">03</span>
              </div>
              <h3 className="text-2xl font-space font-medium text-white mb-4">Recommend Safer Entry</h3>
              <p className="text-brand-gray/70 font-light leading-relaxed">
                LEVEL suggests whether to execute immediately, split the trade, or wait for stronger market conditions.
              </p>
            </div>

            {/* Subtle Visual: Recommendation Indicator */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center justify-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400 font-medium tracking-wide">Optimal Entry Found</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-r from-[#050A15] to-[#02040A] border border-white/10 overflow-hidden group text-center"
        >
          <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/10 blur-[100px] rounded-full opacity-50" />
          
          <div className="relative z-10">
            <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed tracking-wide font-space">
              Price shows where the market is. <br className="hidden md:block" />
              <span className="text-brand-blue font-medium">Liquidity explains what happens when you enter.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
