'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

interface ChartData {
  time: string;
  price: number;
  volume: number;
  depth: number;
}

interface RealTimeChartProps {
  symbol: string;
  currentPrice: number;
  bids: any[];
  asks: any[];
}

export default function RealTimeChart({ symbol, currentPrice, bids, asks }: RealTimeChartProps) {
  const [priceHistory, setPriceHistory] = useState<ChartData[]>([]);
  const [depthData, setDepthData] = useState<any[]>([]);

  // Generate realistic price history
  useEffect(() => {
    const generatePriceHistory = () => {
      const history: ChartData[] = [];
      const now = Date.now();
      const basePrice = currentPrice;
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now - i * 5000); // 5 second intervals
        const variation = (Math.random() - 0.5) * basePrice * 0.002; // ±0.2% variation
        const price = basePrice + variation;
        const volume = Math.random() * 10000 + 5000;
        
        history.push({
          time: time.toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' }),
          price: parseFloat(price.toFixed(2)),
          volume: parseFloat(volume.toFixed(0)),
          depth: parseFloat((volume * price).toFixed(0))
        });
      }
      
      return history;
    };

    setPriceHistory(generatePriceHistory());

    // Update every 3 seconds
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        const newHistory = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const variation = (Math.random() - 0.5) * lastPrice * 0.001;
        const newPrice = lastPrice + variation;
        
        newHistory.push({
          time: new Date().toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' }),
          price: parseFloat(newPrice.toFixed(2)),
          volume: Math.random() * 10000 + 5000,
          depth: parseFloat((newPrice * (Math.random() * 10000 + 5000)).toFixed(0))
        });
        
        return newHistory;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  // Generate depth chart data and update in real-time
  useEffect(() => {
    const generateDepthData = () => {
      const data: any[] = [];
      
      // Process bids (buy orders)
      bids.forEach((bid, index) => {
        data.push({
          price: bid.price,
          buyVolume: bid.total,
          sellVolume: 0,
          type: 'bid'
        });
      });
      
      // Process asks (sell orders)
      asks.forEach((ask, index) => {
        data.push({
          price: ask.price,
          buyVolume: 0,
          sellVolume: ask.total,
          type: 'ask'
        });
      });
      
      return data.sort((a, b) => a.price - b.price);
    };

    setDepthData(generateDepthData());

    // Update depth data every 3 seconds to simulate real-time changes
    const interval = setInterval(() => {
      setDepthData(prev => {
        // Add realistic variations to existing depth data
        return prev.map(item => ({
          ...item,
          buyVolume: item.buyVolume > 0 ? item.buyVolume * (1 + (Math.random() - 0.5) * 0.1) : 0,
          sellVolume: item.sellVolume > 0 ? item.sellVolume * (1 + (Math.random() - 0.5) * 0.1) : 0
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bids, asks]);

  return (
    <div className="space-y-6">
      {/* Price History Chart */}
      <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-brand-blue" />
            <h3 className="text-lg font-space font-bold text-white">Price History</h3>
            <span className="text-sm text-brand-gray font-mono">{symbol}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-brand-gray">Live</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis 
              dataKey="time" 
              stroke="#666"
              fontSize={11}
              tickFormatter={(value) => value.split(':').slice(1).join(':')}
            />
            <YAxis 
              stroke="#666"
              fontSize={11}
              domain={['dataMin - 0.5%', 'dataMax + 0.5%']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#999' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#00e5ff" 
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-brand-blue" />
            <h3 className="text-lg font-space font-bold text-white">Volume Activity</h3>
          </div>
          <div className="text-sm text-brand-gray">
            Last 30 updates
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis 
              dataKey="time" 
              stroke="#666"
              fontSize={11}
              tickFormatter={(value) => value.split(':').slice(1).join(':')}
            />
            <YAxis 
              stroke="#666"
              fontSize={11}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#999' }}
            />
            <Bar 
              dataKey="volume" 
              fill="#00e5ff" 
              opacity={0.6}
              animationDuration={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orderbook Depth Chart */}
      <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-brand-blue" />
            <h3 className="text-lg font-space font-bold text-white">Orderbook Depth</h3>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-brand-gray">Bids</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <span className="text-brand-gray">Asks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-brand-gray">Live</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={depthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis 
              dataKey="price" 
              stroke="#666"
              fontSize={11}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis 
              stroke="#666"
              fontSize={11}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#999' }}
            />
            <Area 
              type="monotone" 
              dataKey="buyVolume" 
              stackId="1"
              stroke="#10b981" 
              fill="#10b981"
              fillOpacity={0.3}
              animationDuration={300}
            />
            <Area 
              type="monotone" 
              dataKey="sellVolume" 
              stackId="2"
              stroke="#ef4444" 
              fill="#ef4444"
              fillOpacity={0.3}
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
