'use client';

import { History, ArrowRight, Activity, CheckCircle2, AlertTriangle, Filter, ChevronDown, ChevronUp, ShieldCheck, Target, TrendingUp, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const historyData = [
  {
    id: 'TRD-9021',
    pair: 'INJ / USDT',
    time: 'Today, 14:32',
    recommendation: 'Split Trade',
    predicted: '1.8%',
    actual: '1.5%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'TRD-8942',
    pair: 'BTC / USDT',
    time: 'Yesterday, 18:10',
    recommendation: 'Wait',
    predicted: '2.4%',
    actual: '2.1%',
    outcome: 'Spread improved before entry',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: 'TRD-8810',
    pair: 'ETH / USDT',
    time: 'Yesterday, 09:20',
    recommendation: 'Execute Now',
    predicted: '1.1%',
    actual: '1.3%',
    outcome: 'Stable fill',
    status: 'warning',
    statusColor: 'text-[#FFB800]',
    bgColor: 'bg-[#FFB800]/5',
    borderColor: 'border-[#FFB800]/20',
    timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: 'TRD-8755',
    pair: 'BTC / USDT',
    time: '3 days ago, 15:45',
    recommendation: 'Limit Order',
    predicted: '0.8%',
    actual: '0.6%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: 'TRD-8689',
    pair: 'INJ / USDT',
    time: '4 days ago, 11:20',
    recommendation: 'TWAP Execution',
    predicted: '1.5%',
    actual: '1.4%',
    outcome: 'Stable fill',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    id: 'TRD-8523',
    pair: 'ETH / USDT',
    time: '5 days ago, 09:15',
    recommendation: 'Staggered Execution',
    predicted: '2.2%',
    actual: '2.8%',
    outcome: 'Higher than expected slippage',
    status: 'warning',
    statusColor: 'text-[#FFB800]',
    bgColor: 'bg-[#FFB800]/5',
    borderColor: 'border-[#FFB800]/20',
    timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: 'TRD-8456',
    pair: 'BTC / USDT',
    time: '1 week ago, 14:30',
    recommendation: 'Split Trade',
    predicted: '1.9%',
    actual: '1.6%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) // 1 week ago
  },
  {
    id: 'TRD-8389',
    pair: 'INJ / USDT',
    time: '2 weeks ago, 10:45',
    recommendation: 'Execute Now',
    predicted: '0.9%',
    actual: '1.2%',
    outcome: 'Stable fill',
    status: 'warning',
    statusColor: 'text-[#FFB800]',
    bgColor: 'bg-[#FFB800]/5',
    borderColor: 'border-[#FFB800]/20',
    timestamp: Date.now() - (14 * 24 * 60 * 60 * 1000) // 2 weeks ago
  },
  {
    id: 'TRD-8298',
    pair: 'ETH / USDT',
    time: '3 weeks ago, 16:20',
    recommendation: 'Wait',
    predicted: '1.6%',
    actual: '1.3%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (21 * 24 * 60 * 60 * 1000) // 3 weeks ago
  },
  {
    id: 'TRD-8187',
    pair: 'BTC / USDT',
    time: '1 month ago, 13:10',
    recommendation: 'Limit Order',
    predicted: '0.7%',
    actual: '0.5%',
    outcome: 'Improved execution',
    status: 'success',
    statusColor: 'text-brand-green',
    bgColor: 'bg-brand-green/5',
    borderColor: 'border-brand-green/20',
    timestamp: Date.now() - (30 * 24 * 60 * 60 * 1000) // 1 month ago
  }
];

export default function HistoricalIntelligenceScreen() {
  const [pairFilter, setPairFilter] = useState('All Pairs');
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [recommendationType, setRecommendationType] = useState('Any');
  const [outcomeQuality, setOutcomeQuality] = useState('All Outcomes');
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [allHistory, setAllHistory] = useState([...historyData]);

  const pairs = ['All Pairs', 'INJ / USDT', 'BTC / USDT', 'ETH / USDT'];
  const timeRanges = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'];
  const recommendationTypes = ['Any', 'Execute Now', 'Split Trade', 'Wait', 'Limit Order'];
  const outcomes = ['All Outcomes', 'Improved', 'Stable', 'Warning'];

  // Load transactions from localStorage on mount
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
        setAllHistory([...savedTransactions, ...historyData]);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    loadTransactions();

    // Listen for transaction complete events for real-time updates
    const handleTransactionComplete = () => {
      loadTransactions();
    };

    window.addEventListener('transactionComplete', handleTransactionComplete);

    return () => {
      window.removeEventListener('transactionComplete', handleTransactionComplete);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside all dropdown containers
      const dropdownContainers = document.querySelectorAll('[data-dropdown-container]');
      let isClickInsideDropdown = false;
      
      dropdownContainers.forEach(container => {
        if (container.contains(event.target as Node)) {
          isClickInsideDropdown = true;
        }
      });
      
      if (!isClickInsideDropdown && openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Filter history data based on selected filters and time range
  const filteredHistory = allHistory.filter(entry => {
    const pairMatch = pairFilter === 'All Pairs' || entry.pair === pairFilter;
    const recommendationMatch = recommendationType === 'Any' || entry.recommendation === recommendationType;
    const outcomeMatch = outcomeQuality === 'All Outcomes' || 
      (outcomeQuality === 'Improved' && entry.outcome.includes('Improved')) ||
      (outcomeQuality === 'Warning' && (entry.status === 'warning' || entry.outcome.includes('Higher'))) ||
      (outcomeQuality === 'Stable' && entry.outcome.includes('Stable'));
    
    // Time filtering
    const now = Date.now();
    const entryTime = entry.timestamp || 0;
    let timeMatch = true;
    
    if (timeRange === 'Last 24 Hours') {
      timeMatch = (now - entryTime) <= (24 * 60 * 60 * 1000);
    } else if (timeRange === 'Last 7 Days') {
      timeMatch = (now - entryTime) <= (7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === 'Last 30 Days') {
      timeMatch = (now - entryTime) <= (30 * 24 * 60 * 60 * 1000);
    }
    
    return pairMatch && recommendationMatch && outcomeMatch && timeMatch;
  });
  return (
    <div className="min-h-screen bg-brand-black px-6 py-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-space font-bold text-white mb-3">Historical Intelligence</h1>
          <p className="text-brand-gray text-lg">
            Review previous liquidity analyses, recommendations, and execution outcomes
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          
          {/* Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm relative z-[100]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-brand-gray" />
              <h3 className="text-lg font-space font-medium text-white">Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-brand-gray">Pair</label>
                <div className="relative" data-dropdown-container>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('pair');
                    }}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors"
                  >
                    <span className="text-base font-mono text-white">{pairFilter}</span>
                    {openDropdown === 'pair' ? <ChevronUp className="w-4 h-4 text-brand-gray" /> : <ChevronDown className="w-4 h-4 text-brand-gray" />}
                  </div>
                  {openDropdown === 'pair' && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-brand-surface border border-brand-border rounded-xl z-[9999] overflow-hidden shadow-2xl">
                      {pairs.map((pair) => (
                        <div
                          key={pair}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPairFilter(pair);
                            setOpenDropdown(null);
                          }}
                          className="p-4 hover:bg-brand-surface/60 cursor-pointer transition-colors"
                        >
                          <span className="text-base font-mono text-white">{pair}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-brand-gray">Time Range</label>
                <div className="relative" data-dropdown-container>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('time');
                    }}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors"
                  >
                    <span className="text-base font-mono text-white">{timeRange}</span>
                    {openDropdown === 'time' ? <ChevronUp className="w-4 h-4 text-brand-gray" /> : <ChevronDown className="w-4 h-4 text-brand-gray" />}
                  </div>
                  {openDropdown === 'time' && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-brand-surface border border-brand-border rounded-xl z-[9999] overflow-hidden shadow-2xl">
                      {timeRanges.map((range) => (
                        <div
                          key={range}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTimeRange(range);
                            setOpenDropdown(null);
                          }}
                          className="p-4 hover:bg-brand-surface/60 cursor-pointer transition-colors"
                        >
                          <span className="text-base font-mono text-white">{range}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-brand-gray">Recommendation Type</label>
                <div className="relative" data-dropdown-container>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('recommendation');
                    }}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors"
                  >
                    <span className="text-base font-mono text-white">{recommendationType}</span>
                    {openDropdown === 'recommendation' ? <ChevronUp className="w-4 h-4 text-brand-gray" /> : <ChevronDown className="w-4 h-4 text-brand-gray" />}
                  </div>
                  {openDropdown === 'recommendation' && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-brand-surface border border-brand-border rounded-xl z-[9999] overflow-hidden shadow-2xl">
                      {recommendationTypes.map((type) => (
                        <div
                          key={type}
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecommendationType(type);
                            setOpenDropdown(null);
                          }}
                          className="p-4 hover:bg-brand-surface/60 cursor-pointer transition-colors"
                        >
                          <span className="text-base font-mono text-white">{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-brand-gray">Outcome Quality</label>
                <div className="relative" data-dropdown-container>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('outcome');
                    }}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/30 flex items-center justify-between cursor-pointer hover:bg-brand-surface/60 transition-colors"
                  >
                    <span className="text-base font-mono text-white">{outcomeQuality}</span>
                    {openDropdown === 'outcome' ? <ChevronUp className="w-4 h-4 text-brand-gray" /> : <ChevronDown className="w-4 h-4 text-brand-gray" />}
                  </div>
                  {openDropdown === 'outcome' && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-brand-surface border border-brand-border rounded-xl z-[9999] overflow-hidden shadow-2xl">
                      {outcomes.map((outcome) => (
                        <div
                          key={outcome}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOutcomeQuality(outcome);
                            setOpenDropdown(null);
                          }}
                          className="p-4 hover:bg-brand-surface/60 cursor-pointer transition-colors"
                        >
                          <span className="text-base font-mono text-white">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-8 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-mono text-brand-blue uppercase tracking-wider">Average Accuracy</span>
                </div>
                <span className="text-5xl font-space font-bold text-brand-blue block">84%</span>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-brand-gray" />
                <span className="text-sm font-mono text-brand-gray uppercase tracking-wider">Most Used Strategy</span>
              </div>
              <span className="text-3xl font-space font-bold text-white block">Split Trade</span>
            </div>
            
            <div className="p-8 rounded-2xl border border-brand-green/20 bg-brand-green/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-brand-green" />
                  <span className="text-sm font-mono text-brand-green uppercase tracking-wider">Max Slippage Avoided</span>
                </div>
                <span className="text-5xl font-space font-bold text-brand-green block">1.6%</span>
              </div>
            </div>
          </motion.div>

        {/* Execution Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <History className="w-5 h-5 text-brand-gray" />
              <h3 className="text-lg font-space font-medium text-white">Execution Timeline</h3>
            </div>
            
            <div className="space-y-6">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((entry, index) => (
                  <motion.div 
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-xl border border-brand-border bg-brand-surface/20 hover:bg-brand-surface/40 transition-all relative"
                  >
                    {/* New transaction indicator */}
                    {entry.timestamp && (Date.now() - entry.timestamp) < (5 * 60 * 1000) && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-brand-blue text-white text-xs font-mono rounded-full">
                        NEW
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      {/* Pair & Time */}
                      <div className="lg:col-span-1">
                        <div className="text-2xl font-space font-bold text-white mb-2">{entry.pair}</div>
                        <div className="text-sm font-mono text-brand-gray uppercase tracking-wider">{entry.time}</div>
                      </div>
                      
                      {/* Metrics */}
                      <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-1">Predicted</div>
                          <div className="text-xl font-mono text-brand-gray">{entry.predicted}</div>
                        </div>
                        <div>
                          <div className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-1">Actual</div>
                          <div className={`text-xl font-mono font-medium ${entry.statusColor}`}>{entry.actual}</div>
                        </div>
                      </div>
                      
                      {/* Recommendation & Outcome */}
                      <div className="lg:col-span-1 space-y-3">
                        <div>
                          <div className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2">Recommendation</div>
                          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-surface border border-brand-border">
                            <span className="text-sm font-medium text-white">{entry.recommendation}</span>
                          </div>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${entry.borderColor} ${entry.bgColor} ${entry.statusColor} text-sm font-medium`}>
                          {entry.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {entry.outcome}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-brand-gray text-lg">No history entries match the selected filters.</div>
                </div>
              )}
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
              <Info className="w-7 h-7 text-brand-blue" />
            </div>
            <div>
              <h4 className="text-xl font-medium text-white mb-2">Performance Insight</h4>
              <p className="text-brand-gray text-lg leading-relaxed">
                Execution quality improves when liquidity remains concentrated across multiple nearby levels. Consider monitoring order book depth before execution for optimal results.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
