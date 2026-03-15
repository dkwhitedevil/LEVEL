'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Market {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  currentPrice: number;
  change24h: number;
  volume24h: string;
  logo: string;
}

const initialMarkets: Market[] = [
  {
    symbol: 'INJ/USDT',
    baseAsset: 'INJ',
    quoteAsset: 'USDT',
    currentPrice: 27.42,
    change24h: 2.34,
    volume24h: '124.5M',
    logo: '🚀'
  },
  {
    symbol: 'BTC/USDT',
    baseAsset: 'BTC',
    quoteAsset: 'USDT',
    currentPrice: 68240,
    change24h: -1.23,
    volume24h: '1.2B',
    logo: '₿'
  },
  {
    symbol: 'ETH/USDT',
    baseAsset: 'ETH',
    quoteAsset: 'USDT',
    currentPrice: 3564,
    change24h: 3.45,
    volume24h: '890M',
    logo: 'Ξ'
  },
  {
    symbol: 'SOL/USDT',
    baseAsset: 'SOL',
    quoteAsset: 'USDT',
    currentPrice: 184.7,
    change24h: -0.89,
    volume24h: '456M',
    logo: '◎'
  },
  {
    symbol: 'ATOM/USDT',
    baseAsset: 'ATOM',
    quoteAsset: 'USDT',
    currentPrice: 11.42,
    change24h: 1.67,
    volume24h: '89M',
    logo: '⚛️'
  },
  {
    symbol: 'BNB/USDT',
    baseAsset: 'BNB',
    quoteAsset: 'USDT',
    currentPrice: 612.8,
    change24h: -2.15,
    volume24h: '234M',
    logo: '🔶'
  },
  {
    symbol: 'DOT/USDT',
    baseAsset: 'DOT',
    quoteAsset: 'USDT',
    currentPrice: 8.76,
    change24h: 4.21,
    volume24h: '67M',
    logo: '●'
  },
  {
    symbol: 'AVAX/USDT',
    baseAsset: 'AVAX',
    quoteAsset: 'USDT',
    currentPrice: 42.15,
    change24h: -3.45,
    volume24h: '123M',
    logo: '🔺'
  },
  {
    symbol: 'MATIC/USDT',
    baseAsset: 'MATIC',
    quoteAsset: 'USDT',
    currentPrice: 0.92,
    change24h: 5.67,
    volume24h: '234M',
    logo: '🟣'
  },
  {
    symbol: 'LINK/USDT',
    baseAsset: 'LINK',
    quoteAsset: 'USDT',
    currentPrice: 14.87,
    change24h: 1.23,
    volume24h: '156M',
    logo: '🔗'
  }
];

interface MarketPairDropdownProps {
  selectedMarket: string;
  onMarketChange: (market: string) => void;
  currentPrice?: number;
  className?: string;
}

export default function MarketPairDropdown({ 
  selectedMarket, 
  onMarketChange, 
  currentPrice,
  className = '' 
}: MarketPairDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedMarketData = markets.find(m => m.symbol === selectedMarket) || markets[0];
  
  // Use currentPrice prop if provided, otherwise use selected market price
  const displayPrice = currentPrice !== undefined ? currentPrice : selectedMarketData.currentPrice;

  const filteredMarkets = markets.filter(market => 
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.baseAsset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.quoteAsset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Real-time price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prevMarkets => 
        prevMarkets.map(market => {
          // Simulate price changes with random walk
          const changePercent = (Math.random() - 0.5) * 0.002; // ±0.2% max change
          const newPrice = market.currentPrice * (1 + changePercent);
          const priceChange = ((newPrice - market.currentPrice) / market.currentPrice) * 100;
          
          return {
            ...market,
            currentPrice: newPrice,
            change24h: market.change24h + priceChange * 0.1 // Small 24h change
          };
        })
      );
      setLastUpdate(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-brand-gray" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-red-400';
    return 'text-brand-gray';
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-6 py-4 rounded-xl border border-brand-border bg-brand-surface/50 hover:border-brand-blue/30 transition-all duration-300 group min-w-[320px]"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{selectedMarketData.logo}</span>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold font-mono text-lg">
                {selectedMarketData.baseAsset}
              </span>
              <span className="text-brand-gray">/</span>
              <span className="text-brand-gray font-mono text-lg">
                {selectedMarketData.quoteAsset}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono">
                {formatPrice(displayPrice)}
              </span>
              <div className="flex items-center gap-1">
                {getChangeIcon(selectedMarketData.change24h)}
                <span className={`text-sm font-mono ${getChangeColor(selectedMarketData.change24h)}`}>
                  {Math.abs(selectedMarketData.change24h).toFixed(2)}%
                </span>
              </div>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-brand-surface border border-brand-border rounded-xl shadow-2xl overflow-hidden"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-brand-border">
              <input
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-lg text-white placeholder-brand-gray focus:outline-none focus:border-brand-blue/50 transition-colors"
                autoFocus
              />
            </div>

            {/* Market List */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {filteredMarkets.length === 0 ? (
                <div className="p-6 text-center text-brand-gray">
                  No markets found
                </div>
              ) : (
                <div className="py-3">
                  {filteredMarkets.map((market) => (
                    <motion.button
                      key={market.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      onClick={() => {
                        onMarketChange(market.symbol);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full px-6 py-4 flex items-center gap-4 hover:bg-brand-blue/5 transition-colors ${
                        market.symbol === selectedMarket ? 'bg-brand-blue/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xl">{market.logo}</span>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold font-mono">
                              {market.baseAsset}
                            </span>
                            <span className="text-brand-gray">/</span>
                            <span className="text-brand-gray font-mono">
                              {market.quoteAsset}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-mono">
                              {formatPrice(market.currentPrice)}
                            </span>
                            <div className="flex items-center gap-1">
                              {getChangeIcon(market.change24h)}
                              <span className={`text-sm font-mono ${getChangeColor(market.change24h)}`}>
                                {Math.abs(market.change24h).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-brand-gray">Vol 24h</div>
                          <div className="text-sm font-mono text-brand-gray">
                            {market.volume24h}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-brand-border bg-brand-black/50">
              <div className="text-xs text-brand-gray text-center">
                Real-time updates • Last: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
