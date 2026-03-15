'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ChevronDown, Clock, ArrowUpRight, ArrowDownRight, RefreshCw, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useOrderbook } from '@/hooks/useOrderbook';
import { injectiveService } from '@/services/injectiveService';
import { generateExplanation } from '@/services/explanationEngine';
import { generateOutcome } from '@/services/outcomeEngine';
import MarketPairDropdown from '@/components/MarketPairDropdown';
import NetworkStatus from '@/components/NetworkStatus';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Copy, ExternalLink, Check } from 'lucide-react';
import PremiumIntelligenceCard from '@/components/PremiumIntelligenceCard';
import RecommendationCards from '@/components/RecommendationCards';
import LiveRefreshIndicator from '@/components/LiveRefreshIndicator';
import RealTimeChart from '@/components/RealTimeChart';
import { TrendingUp, TrendingDown, ShieldAlert, Zap, BarChart3, Shield } from 'lucide-react';

export default function IntelligenceDashboard() {
  const router = useRouter();
  const { isConnected, walletType, address, disconnect } = useWallet();
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [timeSens, setTimeSens] = useState<'Immediate' | 'Flexible'>('Immediate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<'execute' | 'split' | 'wait' | null>(null);
  const [selectedMarket, setSelectedMarket] = useState('INJ/USDT');
  const [tradeSize, setTradeSize] = useState('500');
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  // Progressive reveal states
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  
  // Fetch real orderbook data
  const { data: orderbookData, loading, refresh } = useOrderbook({
    symbol: selectedMarket
  });

  // Real-time price simulation for both dropdown and center panel
  const [livePrice, setLivePrice] = useState(27.42);
  const [liveSpread, setLiveSpread] = useState(0.04);
  const [liveSpreadPercentage, setLiveSpreadPercentage] = useState(0.146);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price changes
      const priceChange = (Math.random() - 0.5) * 0.002; // ±0.2% change
      const newPrice = livePrice * (1 + priceChange);
      const spreadChange = (Math.random() - 0.5) * 0.005; // Small spread changes
      
      setLivePrice(newPrice);
      setLiveSpread(prev => Math.max(0.01, prev + spreadChange));
      setLiveSpreadPercentage(prev => Math.max(0.01, prev + spreadChange * 10));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [livePrice]);

  // Calculate slippage
  const estimatedSlippage = orderbookData 
    ? injectiveService.calculateSlippage(orderbookData, parseFloat(tradeSize), true)
    : 0;

  // Get market depth
  const marketDepth = orderbookData 
    ? injectiveService.getMarketDepth(orderbookData, 5)
    : null;

  // Generate explanation
  const explanation = generateExplanation(
    estimatedSlippage,
    marketDepth?.liquidityStrength || 'Moderate'
  );

  // Generate outcome
  const outcome = orderbookData ? generateOutcome(
    orderbookData.currentPrice,
    estimatedSlippage,
    parseFloat(tradeSize)
  ) : null;

  // Progressive reveal logic
  const handleRunAnalysis = () => {
    console.log('Run Analysis clicked!');
    setIsAnalyzing(true);

    setTimeout(() => {
      console.log('Setting showRecommendation to true');
      setIsAnalyzing(false);
      setShowRecommendation(true);

      setTimeout(() => {
        console.log('Setting showExplanation to true');
        setShowExplanation(true);

        setTimeout(() => {
          console.log('Setting showOutcome to true');
          setShowOutcome(true);
        }, 700);

      }, 700);

    }, 1200);
  };

  const handleRecommendationSelect = (recommendation: 'execute' | 'split' | 'wait') => {
    setSelectedRecommendation(recommendation);
    setIsAnalyzing(true);
    setTimeout(() => {
      // Pass trade details to payment page
      const params = new URLSearchParams({
        pair: selectedMarket,
        tradeSize: tradeSize,
        recommendation: recommendation,
        predictedFill: outcome?.predictedFill.toFixed(2) || '27.51',
        actualFill: outcome?.actualFill.toFixed(2) || '27.47'
      });
      router.push(`/dashboard/payment?${params.toString()}`);
    }, 1500);
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'metamask': return '🦊';
      case 'keplr': return '🌟';
      case 'leap': return '🚀';
      default: return '👛';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-brand-blue" />
            </div>
            <h2 className="text-2xl font-space font-bold text-white mb-3">Connect Your Wallet</h2>
            <p className="text-brand-gray/70 mb-8">
              Connect your wallet to access pre-trade liquidity intelligence on Injective Testnet.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-brand-blue text-brand-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-space font-bold text-white">Pre-Trade Intelligence</h1>
              
              {/* Market Pair Selector - Top Level */}
              <MarketPairDropdown
                selectedMarket={selectedMarket}
                onMarketChange={setSelectedMarket}
                className="max-w-md"
              />
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-blue/30 bg-brand-blue/10">
                <span className="text-lg">{getWalletIcon(walletType)}</span>
                <span className="text-sm font-mono text-brand-blue">{formatAddress(address)}</span>
                <button
                  onClick={copyAddress}
                  className="p-1 rounded hover:bg-brand-blue/20 transition-colors"
                  title="Copy address"
                >
                  {copiedAddress ? (
                    <Check className="w-3 h-3 text-brand-blue" />
                  ) : (
                    <Copy className="w-3 h-3 text-brand-blue/70" />
                  )}
                </button>
                <button
                  onClick={() => window.open(`https://testnet.explorer.injective.network/account/${address}`, '_blank')}
                  className="p-1 rounded hover:bg-brand-blue/20 transition-colors"
                  title="View on testnet explorer"
                >
                  <ExternalLink className="w-3 h-3 text-brand-blue/70" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LiveRefreshIndicator isRefreshing={loading} />
              <div className="flex items-center gap-2 text-sm text-brand-gray font-mono">
                <Activity className="w-4 h-4 text-brand-blue" />
                Real Injective Data
              </div>
            </div>
          </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Left Panel: Input */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm flex flex-col gap-6">
            <div>
              <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">Trade Size</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  value={tradeSize}
                  onChange={(e) => setTradeSize(e.target.value)}
                  className="w-full p-4 rounded-xl border border-brand-border bg-brand-black text-white font-mono text-xl focus:outline-none focus:border-brand-blue/50 transition-colors"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray font-mono">USDT</div>
              </div>
              <div className="mt-2 flex justify-between text-xs font-mono text-brand-gray">
                <span>≈ {orderbookData ? (parseFloat(tradeSize) / orderbookData.currentPrice).toFixed(2) : '0.00'} {selectedMarket.split('/')[0]}</span>
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
                onClick={() => {
                  console.log('Button clicked!');
                  router.push('/dashboard/analysis');
                }}
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
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  Run Analysis
                </>
              )}
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel: Premium Depth Visualization */}
        <div className="col-span-6 flex flex-col gap-6">
          <div className="flex-1 p-6 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <NetworkStatus />
                <LiveRefreshIndicator isRefreshing={loading} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refresh}
                disabled={loading}
                className="p-2 rounded-lg border border-brand-border bg-brand-black hover:border-brand-blue/30 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-brand-gray ${loading ? 'animate-spin' : ''}`} />
              </button>
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-white tracking-tight">
                  {livePrice > 0 ? (livePrice >= 1000 ? livePrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : livePrice.toFixed(2)) : '---'}
                </div>
                <div className="text-xs text-brand-green font-mono flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 
                  {liveSpread > 0 ? `+${liveSpread.toFixed(2)} (${liveSpreadPercentage.toFixed(3)}%)` : '+0.00 (0.00%)'}
                </div>
              </div>
            </div>

            {/* Real-Time Charts */}
            <div className="flex-1 w-full relative z-10 overflow-y-auto">
              {orderbookData ? (
                <RealTimeChart
                  symbol={selectedMarket}
                  currentPrice={livePrice}
                  bids={orderbookData.bids}
                  asks={orderbookData.asks}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full mx-auto mb-3 animate-spin" />
                    <p className="text-sm text-brand-gray">Loading market data...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Premium Intelligence & Recommendations */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Premium Intelligence Cards */}
          <div>
            <h2 className="text-sm font-mono text-brand-gray uppercase tracking-wider mb-4">Execution Intelligence</h2>
            <div className="space-y-4">
              <PremiumIntelligenceCard
                title="Liquidity Strength"
                value={`${marketDepth ? Math.round(marketDepth.depthRatio * 100) : 50}/100`}
                status={marketDepth?.liquidityStrength === 'Strong' ? 'excellent' : marketDepth?.liquidityStrength === 'Moderate' ? 'good' : 'danger'}
                description={marketDepth ? `Nearby depth: ${marketDepth.liquidityStrength.toLowerCase()}.` : 'Loading...'}
                icon={<BarChart3 className="w-5 h-5" />}
                trend={marketDepth?.liquidityStrength === 'Strong' ? 'up' : marketDepth?.liquidityStrength === 'Moderate' ? 'stable' : 'down'}
                change={marketDepth ? `${Math.round(marketDepth.depthRatio * 100)}%` : '0%'}
              />
              
              <PremiumIntelligenceCard
                title="Spread Risk"
                value={orderbookData && orderbookData.spreadPercentage < 0.05 ? 'Low' : orderbookData && orderbookData.spreadPercentage < 0.1 ? 'Medium' : 'High'}
                status={orderbookData && orderbookData.spreadPercentage < 0.05 ? 'excellent' : orderbookData && orderbookData.spreadPercentage < 0.1 ? 'good' : 'warning'}
                description={orderbookData ? `${orderbookData.spreadPercentage.toFixed(3)}% current spread.` : 'Loading...'}
                icon={<TrendingUp className="w-5 h-5" />}
                trend="stable"
              />
              
              <PremiumIntelligenceCard
                title="Slippage Prediction"
                value={`${estimatedSlippage.toFixed(2)}%`}
                status={estimatedSlippage < 1 ? 'excellent' : estimatedSlippage < 2 ? 'good' : 'danger'}
                description={`Expected impact on ${tradeSize} USDT market buy.`}
                icon={<ShieldAlert className="w-5 h-5" />}
                trend={estimatedSlippage < 1 ? 'up' : estimatedSlippage < 2 ? 'stable' : 'down'}
              />
            </div>
          </div>

          {/* Recommendation Cards */}
          {showRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecommendationCards
                slippage={estimatedSlippage}
                liquidityStrength={marketDepth?.liquidityStrength || 'Moderate'}
                spreadRisk={orderbookData && orderbookData.spreadPercentage < 0.05 ? 'Low' : orderbookData && orderbookData.spreadPercentage < 0.1 ? 'Medium' : 'High'}
                fragilityScore={'Moderate'}
                onSelectRecommendation={(recommendation) => {
                  setSelectedRecommendation(recommendation);
                  // Trigger the next progressive step after recommendation is selected
                  setTimeout(() => {
                    setShowExplanation(true);
                    setTimeout(() => {
                      setShowOutcome(true);
                    }, 700);
                  }, 500);
                }}
              />
            </motion.div>
          )}

          {/* Explanation Engine */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-5 rounded-2xl border border-brand-border bg-brand-surface/60 backdrop-blur-sm"
            >
              <div className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-3">
                Execution Explanation
              </div>

              <div className="text-lg font-space font-bold text-brand-blue mb-2">
                {explanation.recommendation}
              </div>

              <div className="text-sm text-brand-gray leading-relaxed mb-4">
                {explanation.text}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-gray">Confidence</span>
                <span className="text-sm font-mono text-white">
                  {explanation.confidence}%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-brand-black overflow-hidden">
                <div
                  className="h-full bg-brand-blue"
                  style={{ width: `${explanation.confidence}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* Outcome Engine */}
          {showOutcome && outcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-5 rounded-2xl border border-brand-border bg-brand-surface/60 backdrop-blur-sm"
            >
              <div className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-3">
                Trade Outcome
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-brand-gray">Predicted Fill</span>
                  <span className="font-mono text-white">
                    ${outcome.predictedFill.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-brand-gray">Actual Simulated Fill</span>
                  <span className="font-mono text-white">
                    ${outcome.actualFill.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-brand-gray">Estimated Received</span>
                  <span className="font-mono text-brand-blue">
                    {outcome.received.toFixed(4)} {selectedMarket.split('/')[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Confirm Execution Button */}
          {showOutcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => selectedRecommendation && handleRecommendationSelect(selectedRecommendation)}
                disabled={!selectedRecommendation}
                className="w-full py-4 rounded-xl bg-brand-blue text-brand-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Shield className="w-5 h-5" />
                Confirm Execution (0.002 INJ)
              </button>
            </motion.div>
          )}
        </div>
      </div>
        </>
      )}
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
