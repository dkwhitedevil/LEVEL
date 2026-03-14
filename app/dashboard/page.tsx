'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ChevronDown, Zap, Clock, ShieldAlert, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const mockOrderbookData = [
  { price: 34.10, bidVolume: 1200, askVolume: 0 },
  { price: 34.12, bidVolume: 1500, askVolume: 0 },
  { price: 34.15, bidVolume: 2800, askVolume: 0 },
  { price: 34.18, bidVolume: 4200, askVolume: 0 },
  { price: 34.20, bidVolume: 5100, askVolume: 0 },
  { price: 34.21, bidVolume: 0, askVolume: 0 }, // Current Price
  { price: 34.22, bidVolume: 0, askVolume: 4800 },
  { price: 34.25, bidVolume: 0, askVolume: 3200 },
  { price: 34.28, bidVolume: 0, askVolume: 2100 },
  { price: 34.30, bidVolume: 0, askVolume: 1400 },
  { price: 34.35, bidVolume: 0, askVolume: 900 },
];

export default function IntelligenceDashboard() {
  const router = useRouter();
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [timeSens, setTimeSens] = useState<'Immediate' | 'Flexible'>('Immediate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      router.push('/dashboard/recommendation');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-space font-bold text-white">Pre-Trade Intelligence</h1>
        <div className="flex items-center gap-2 text-sm text-brand-gray font-mono">
          <Activity className="w-4 h-4 text-brand-blue" />
          Analyzing Market Structure
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Left Panel: Input */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm flex flex-col gap-6">
            <div>
              <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">Market Pair</label>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-brand-border bg-brand-black hover:border-brand-blue/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center text-xs font-bold">INJ</div>
                    <div className="w-8 h-8 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center text-xs font-bold">USDT</div>
                  </div>
                  <span className="font-space font-bold text-lg">INJ/USDT</span>
                </div>
                <ChevronDown className="w-5 h-5 text-brand-gray" />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">Trade Size</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full p-4 rounded-xl border border-brand-border bg-brand-black text-white font-mono text-xl focus:outline-none focus:border-brand-blue/50 transition-colors"
                  defaultValue="500"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray font-mono">USDT</div>
              </div>
              <div className="mt-2 flex justify-between text-xs font-mono text-brand-gray">
                <span>≈ 14.61 INJ</span>
                <span className="text-brand-blue cursor-pointer hover:underline">Max</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">Order Type</label>
              <div className="flex p-1 rounded-xl bg-brand-black border border-brand-border">
                <button 
                  onClick={() => setOrderType('Market')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${orderType === 'Market' ? 'bg-brand-surface text-white shadow-sm' : 'text-brand-gray hover:text-white'}`}
                >
                  Market
                </button>
                <button 
                  onClick={() => setOrderType('Limit')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${orderType === 'Limit' ? 'bg-brand-surface text-white shadow-sm' : 'text-brand-gray hover:text-white'}`}
                >
                  Limit
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">Time Sensitivity</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setTimeSens('Immediate')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${timeSens === 'Immediate' ? 'border-brand-blue bg-brand-blue/5 text-brand-blue' : 'border-brand-border bg-brand-black text-brand-gray hover:border-brand-gray'}`}
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-xs font-medium">Immediate</span>
                </button>
                <button 
                  onClick={() => setTimeSens('Flexible')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${timeSens === 'Flexible' ? 'border-brand-blue bg-brand-blue/5 text-brand-blue' : 'border-brand-border bg-brand-black text-brand-gray hover:border-brand-gray'}`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="text-xs font-medium">Flexible</span>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-brand-gray font-light text-center mb-4">
                Estimate liquidity impact before execution
              </p>
              <button 
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full py-4 rounded-xl bg-brand-blue text-brand-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed"
              >
              {isAnalyzing ? (
                <>
                  <span className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                  Analyzing Depth...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5 group-hover:animate-pulse" />
                  Run Analysis
                </>
              )}
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel: Visualization */}
        <div className="col-span-6 flex flex-col gap-6">
          <div className="flex-1 p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 z-10">
              <div>
                <h2 className="text-lg font-space font-bold text-white">Market Structure Depth</h2>
                <p className="text-xs text-brand-gray font-mono mt-1">Aggregated Liquidity Profile</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-white tracking-tight">34.21</div>
                <div className="text-xs text-brand-green font-mono flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +0.12 (0.35%)
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockOrderbookData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-green)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-brand-green)" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorAsk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-red)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-brand-red)" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="price" stroke="var(--color-brand-border)" tick={{ fill: 'var(--color-brand-gray)', fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-brand-surface)', borderColor: 'var(--color-brand-border)', borderRadius: '8px', fontFamily: 'monospace' }}
                    itemStyle={{ color: 'var(--color-brand-gray-light)' }}
                  />
                  <Area type="monotone" dataKey="bidVolume" stroke="var(--color-brand-green)" fillOpacity={1} fill="url(#colorBid)" strokeWidth={2} activeDot={{ r: 4, fill: 'var(--color-brand-green)' }} />
                  <Area type="monotone" dataKey="askVolume" stroke="var(--color-brand-red)" fillOpacity={1} fill="url(#colorAsk)" strokeWidth={2} activeDot={{ r: 4, fill: 'var(--color-brand-red)' }} />
                  <ReferenceLine x={34.21} stroke="var(--color-brand-blue)" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
              
              {/* Glowing Center Line Overlay */}
              <div className="absolute top-0 bottom-6 left-1/2 w-px bg-brand-blue shadow-[0_0_20px_rgba(0,229,255,1)] z-20" />
              
              {/* Subtle Animated Liquidity Wave */}
              <motion.div 
                className="absolute bottom-6 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-blue/5 to-transparent pointer-events-none z-10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Subtle animated background grid */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(var(--color-brand-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </div>

        {/* Right Panel: Intelligence Cards */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-2">Execution Intelligence</h2>
          <IntelligenceCard 
            title="Liquidity Strength" 
            value="74 / 100" 
            status="good" 
            desc="Nearby depth remains stable." 
          />
          <IntelligenceCard 
            title="Spread Risk" 
            value="Low" 
            status="good" 
            desc="0.02% current spread. Stable." 
          />
          <IntelligenceCard 
            title="Slippage Prediction" 
            value="1.8%" 
            status="warning" 
            desc="Expected impact on 500 USDT market buy." 
          />
          <IntelligenceCard 
            title="Fragility Score" 
            value="Moderate" 
            status="warning" 
            desc="Balanced orderbook depth." 
          />
          <IntelligenceCard 
            title="Pressure Direction" 
            value="Buyer Pressure" 
            status="good" 
            desc="68% of recent volume is taker buy." 
            icon={<ArrowUpRight className="w-4 h-4 text-brand-green" />}
          />
          <IntelligenceCard 
            title="Confidence Level" 
            value="High Confidence" 
            status="neutral" 
            desc="Based on historical orderbook resilience." 
          />
        </div>
      </div>
    </div>
  );
}

function IntelligenceCard({ title, value, status, desc, icon }: { title: string, value: string, status: 'good' | 'warning' | 'danger' | 'neutral', desc: string, icon?: ReactNode }) {
  const statusColors = {
    good: 'text-brand-green border-brand-green/20 bg-brand-green/5',
    warning: 'text-[#FFB800] border-[#FFB800]/20 bg-[#FFB800]/5',
    danger: 'text-brand-red border-brand-red/20 bg-brand-red/5',
    neutral: 'text-brand-blue border-brand-blue/20 bg-brand-blue/5',
  };

  return (
    <div className="p-5 rounded-xl border border-brand-border bg-brand-surface/80 hover:bg-brand-surface transition-colors flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-brand-gray uppercase tracking-wider">{title}</span>
        {icon && icon}
      </div>
      <div className={`text-2xl font-space font-bold ${statusColors[status].split(' ')[0]}`}>
        {value}
      </div>
      <div className="text-xs text-brand-gray font-light leading-relaxed">
        {desc}
      </div>
    </div>
  );
}
