'use client';

import { BarChart2, Info, TrendingUp, TrendingDown, Activity, ShieldAlert, Layers, Maximize2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ReferenceLine } from 'recharts';

const mockDensityData = Array.from({ length: 40 }).map((_, i) => ({
  price: 34.00 + i * 0.01,
  density: Math.exp(-Math.pow(i - 20, 2) / 50) * 100 + Math.random() * 10,
}));

const mockSpreadData = Array.from({ length: 20 }).map((_, i) => ({
  time: i,
  spread: 0.02 + Math.random() * 0.005 + (i === 10 ? 0.03 : 0), // Spike at 10
}));

const mockConcentrationData = [
  { level: '34.10', volume: 400 },
  { level: '34.15', volume: 1200 },
  { level: '34.20', volume: 300 },
  { level: '34.25', volume: 1500 },
  { level: '34.30', volume: 200 },
];

export default function DeepAnalysisScreen() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full pb-8">
      {/* Top Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Deep Market Analysis</h1>
        <p className="text-brand-gray font-light text-lg">
          Understanding why current liquidity conditions produce this execution profile.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 flex-1 min-h-0">
        
        {/* LEFT SIDE — Metric Intelligence Panels */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          
          <MetricCard 
            title="Nearby Liquidity Density"
            display="74% depth concentration within nearest executable range"
            explanation="Liquidity is concentrated in nearby levels, allowing moderate absorption."
          />
          
          <MetricCard 
            title="Spread Elasticity"
            display="Low elasticity"
            explanation="Spread remains stable under moderate size impact."
          />
          
          <MetricCard 
            title="Level Concentration"
            display="Liquidity clustered across 2 major ask levels"
            explanation="Depth is unevenly distributed near upper levels."
          />
          
          <MetricCard 
            title="Depth Imbalance"
            display="Buyer-side slightly dominant"
            explanation="Bid support currently exceeds nearby ask density."
          />
          
          <MetricCard 
            title="Fragile Zones"
            display="Fragile zone detected at +0.3%"
            explanation="Above current price, liquidity weakens rapidly."
          />

        </div>

        {/* RIGHT SIDE — Analytical Micro Visualizations */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar content-start">
          
          {/* Depth Density Chart */}
          <div className="col-span-2 p-6 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col gap-4 h-64">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Depth Density Profile</h3>
              <Layers className="w-4 h-4 text-brand-blue" />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockDensityData}>
                  <defs>
                    <linearGradient id="densityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-blue)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-brand-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1A1A1A', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--color-brand-blue)' }}
                    cursor={{ stroke: 'var(--color-brand-gray)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area type="monotone" dataKey="density" stroke="var(--color-brand-blue)" strokeWidth={2} fillOpacity={1} fill="url(#densityGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spread Behavior Line */}
          <div className="col-span-1 p-6 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col gap-4 h-48">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Spread Behavior</h3>
              <Activity className="w-4 h-4 text-brand-gray" />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSpreadData}>
                  <Line type="stepAfter" dataKey="spread" stroke="var(--color-brand-gray-light)" strokeWidth={2} dot={false} />
                  <ReferenceLine y={0.025} stroke="var(--color-brand-red)" strokeOpacity={0.3} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Concentration Bars */}
          <div className="col-span-1 p-6 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col gap-4 h-48">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Ask Concentration</h3>
              <BarChart2 className="w-4 h-4 text-brand-gray" />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockConcentrationData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                    contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1A1A1A', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }} 
                  />
                  <Bar dataKey="volume" fill="var(--color-brand-red)" fillOpacity={0.6} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Imbalance Indicator */}
          <div className="col-span-1 p-6 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col justify-center gap-4 h-32">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Bid/Ask Imbalance</h3>
              <Maximize2 className="w-4 h-4 text-brand-gray" />
            </div>
            <div className="w-full h-2 bg-brand-black rounded-full overflow-hidden flex">
              <div className="h-full bg-brand-green w-[58%]" />
              <div className="h-full bg-brand-red w-[42%]" />
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-brand-green">58% Bid</span>
              <span className="text-brand-red">42% Ask</span>
            </div>
          </div>

          {/* Fragility Heat Zone */}
          <div className="col-span-1 p-6 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col justify-center gap-4 h-32">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider">Fragility Heatmap</h3>
              <ShieldAlert className="w-4 h-4 text-brand-red" />
            </div>
            <div className="w-full h-4 rounded bg-gradient-to-r from-brand-black via-brand-black to-brand-red/40 border border-brand-border" />
            <div className="flex justify-between text-xs font-mono text-brand-gray">
              <span>Current</span>
              <span className="text-brand-red">+0.3%</span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION — Summary Insight Card */}
      <div className="mt-auto">
        <div className="p-6 md:p-8 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_0_30px_rgba(0,229,255,0.03)]">
          <div className="flex-1">
            <p className="text-white font-medium text-lg md:text-xl leading-relaxed">
              Current market structure suggests moderate execution confidence with localized fragility above nearest ask levels.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-10 shrink-0">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">Liquidity Confidence</span>
              <span className="text-base font-medium text-brand-green">High</span>
            </div>
            
            <div className="w-px h-10 bg-brand-blue/20 hidden md:block" />
            
            <div className="flex flex-col">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">Structural Stability</span>
              <span className="text-base font-medium text-[#FFB800]">Medium</span>
            </div>
            
            <div className="w-px h-10 bg-brand-blue/20 hidden md:block" />
            
            <div className="flex flex-col">
              <span className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">Execution Sensitivity</span>
              <span className="text-base font-medium text-[#FFB800]">Moderate</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, display, explanation }: { title: string, display: string, explanation: string }) {
  return (
    <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 hover:bg-brand-surface/60 transition-colors flex flex-col gap-3 group">
      <h3 className="text-xs font-mono text-brand-gray uppercase tracking-wider group-hover:text-brand-blue transition-colors">{title}</h3>
      <div className="text-lg font-space font-medium text-white">{display}</div>
      <p className="text-sm text-brand-gray/70 font-light leading-relaxed">{explanation}</p>
    </div>
  );
}
