'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { injectiveService, Market } from '@/services/injectiveService';

interface PairSelectorProps {
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
  className?: string;
}

export default function PairSelector({ selectedSymbol, onSymbolChange, className = '' }: PairSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMarkets(injectiveService.getMarkets());
  }, []);

  const filteredMarkets = markets.filter(market => 
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMarket = markets.find(m => m.symbol === selectedSymbol);

  const handleSelect = (symbol: string) => {
    onSymbolChange(symbol);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-xl border border-brand-border bg-brand-black hover:border-brand-blue/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {selectedMarket && (
              <>
                <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center text-xs font-bold">
                  {selectedMarket.baseDenom.toUpperCase()}
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center text-xs font-bold">
                  {selectedMarket.quoteDenom.toUpperCase()}
                </div>
              </>
            )}
          </div>
          <span className="font-space font-bold text-lg">{selectedSymbol}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#050A15] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden max-h-96"
          >
            {/* Search */}
            <div className="p-3 border-b border-white/5">
              <input
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                autoFocus
              />
            </div>

            {/* Market List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredMarkets.map((market) => (
                <button
                  key={market.marketId}
                  onClick={() => handleSelect(market.symbol)}
                  className={`w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 ${
                    market.symbol === selectedSymbol ? 'bg-brand-blue/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center text-xs font-bold">
                        {market.baseDenom.toUpperCase()}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center text-xs font-bold">
                        {market.quoteDenom.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">{market.symbol}</div>
                      <div className="text-xs text-brand-gray/60">
                        {market.baseDenom.toUpperCase()}/{market.quoteDenom.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-mono text-brand-gray/60">Volume</div>
                      <div className="text-sm font-mono text-white">
                        ${(Math.random() * 10000000 + 1000000).toLocaleString()}
                      </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                      {Math.random() > 0.5 ? (
                        <TrendingUp className="w-4 h-4 text-brand-green" />
                      ) : Math.random() > 0.5 ? (
                        <TrendingDown className="w-4 h-4 text-brand-red" />
                      ) : (
                        <Minus className="w-4 h-4 text-brand-gray/50" />
                      )}
                    </div>
                  </div>
                </button>
              ))}

              {filteredMarkets.length === 0 && (
                <div className="p-6 text-center text-brand-gray/60">
                  <p className="text-sm">No markets found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
