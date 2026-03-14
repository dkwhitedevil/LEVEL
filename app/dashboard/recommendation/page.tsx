'use client';

import { CheckSquare, Zap, SplitSquareHorizontal, Clock, ArrowRight, Activity, BarChart2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function ExecutionRecommendationScreen() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center text-center mb-12 mt-4">
        <h1 className="text-3xl md:text-4xl font-space font-bold text-white mb-3 tracking-tight">Execution Recommendation</h1>
        <p className="text-brand-gray font-light text-lg">
          Choose the safest execution path based on current liquidity conditions.
        </p>
      </div>

      {/* Center Section: 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Card 1: Execute Now (Green) */}
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/40 hover:bg-brand-surface/80 hover:border-brand-green/30 transition-all flex flex-col group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-green/20 group-hover:bg-brand-green/50 transition-colors" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-brand-green" />
            </div>
          </div>
          
          <h2 className="text-2xl font-space font-bold text-white mb-2">Execute Now</h2>
          <p className="text-sm text-brand-gray font-light leading-relaxed mb-8 flex-1">
            Nearby liquidity can absorb this trade with moderate impact.
          </p>
          
          <div className="space-y-5 mb-8">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Expected Slippage</span>
                <span className="text-lg font-mono text-white">1.8%</span>
              </div>
              <div className="w-full h-1 bg-brand-black rounded-full overflow-hidden">
                <div className="h-full bg-brand-green w-[40%]" />
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-brand-border/50 pt-4">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Risk Score</span>
              <span className="text-sm font-medium text-[#FFB800]">Medium</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Activity className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-mono text-brand-green">Stable current depth</span>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard/outcome')}
            className="w-full py-4 rounded-xl border border-brand-green/20 bg-brand-green/5 text-brand-green font-medium hover:bg-brand-green/10 transition-colors flex items-center justify-center gap-2"
          >
            Select Path
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Split Trade (Electric Blue - Recommended) */}
        <div className="p-8 rounded-2xl border border-brand-blue/40 bg-brand-blue/5 hover:bg-brand-blue/10 hover:border-brand-blue transition-all flex flex-col group relative overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.08)] transform lg:-translate-y-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <SplitSquareHorizontal className="w-6 h-6 text-brand-blue" />
            </div>
            <div className="px-3 py-1 rounded-full bg-brand-blue text-brand-black text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,229,255,0.4)]">
              Recommended
            </div>
          </div>
          
          <h2 className="text-2xl font-space font-bold text-white mb-2">Split Trade</h2>
          <p className="text-sm text-brand-gray font-light leading-relaxed mb-8 flex-1">
            Single execution crosses weaker ask levels.
          </p>
          
          <div className="space-y-5 mb-8">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Recommendation</span>
                <span className="text-sm font-medium text-white">Split into 3 smaller orders</span>
              </div>
              <div className="w-full h-1 bg-brand-black rounded-full overflow-hidden flex gap-1">
                <div className="h-full bg-brand-blue w-1/3" />
                <div className="h-full bg-brand-blue w-1/3 opacity-70" />
                <div className="h-full bg-brand-blue w-1/3 opacity-40" />
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-brand-border/50 pt-4">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Projected Benefit</span>
              <span className="text-sm font-medium text-brand-blue">Reduce slippage by 1.2%</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <BarChart2 className="w-4 h-4 text-brand-blue" />
              <span className="text-xs font-mono text-brand-blue">Optimal execution curve</span>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard/outcome')}
            className="w-full py-4 rounded-xl bg-brand-blue text-brand-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all flex items-center justify-center gap-2"
          >
            Execute Split
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Card 3: Wait for Better Depth (Amber) */}
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/40 hover:bg-brand-surface/80 hover:border-[#FFB800]/30 transition-all flex flex-col group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]/20 group-hover:bg-[#FFB800]/50 transition-colors" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FFB800]/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#FFB800]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-space font-bold text-white mb-2">Wait</h2>
          <p className="text-sm text-brand-gray font-light leading-relaxed mb-8 flex-1">
            Current spread remains slightly unstable.
          </p>
          
          <div className="space-y-5 mb-8">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Projected Condition</span>
                <span className="text-sm font-medium text-white text-right">Spread likely improves<br/>in short window</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-brand-border/50 pt-4">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">Risk Score</span>
              <span className="text-sm font-medium text-brand-green">Low if delayed</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <ShieldAlert className="w-4 h-4 text-[#FFB800]" />
              <span className="text-xs font-mono text-[#FFB800]">Awaiting liquidity refill</span>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard/outcome')}
            className="w-full py-4 rounded-xl border border-[#FFB800]/20 bg-[#FFB800]/5 text-[#FFB800] font-medium hover:bg-[#FFB800]/10 transition-colors flex items-center justify-center gap-2"
          >
            Select Path
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Insight Section */}
      <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-black border border-brand-border flex items-center justify-center">
            <Activity className="w-5 h-5 text-brand-gray" />
          </div>
          <div>
            <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider">Projected Execution Summary</h3>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-1">Current Market Pressure</span>
            <span className="text-sm font-medium text-brand-green flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> Buyer Pressure
            </span>
          </div>
          
          <div className="w-px h-8 bg-brand-border hidden md:block" />
          
          <div className="flex flex-col">
            <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-1">Liquidity Confidence</span>
            <span className="text-sm font-medium text-white">High</span>
          </div>
          
          <div className="w-px h-8 bg-brand-border hidden md:block" />
          
          <div className="flex flex-col">
            <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-1">Fragile Zone Nearby</span>
            <span className="text-sm font-medium text-brand-red">0.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
