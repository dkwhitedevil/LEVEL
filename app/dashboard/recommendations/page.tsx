'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Play, Zap, Clock, AlertTriangle, Shield, Wallet, ArrowRight } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

export default function RecommendationsPage() {
  const router = useRouter();
  const { address } = useWallet();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executionOptions = [
    {
      id: 'immediate',
      title: 'Execute Immediately',
      description: 'Execute trade at current market price',
      icon: <Play className="w-6 h-6" />,
      color: 'emerald',
      confidence: '85%',
      impact: 'Higher slippage risk',
      fee: '0.002 INJ',
      recommended: true
    },
    {
      id: 'split',
      title: 'Split Trade (2 Orders)',
      description: 'Divide into smaller orders for better execution',
      icon: <Zap className="w-6 h-6" />,
      color: 'amber',
      confidence: '92%',
      impact: 'Reduced market impact',
      fee: '0.004 INJ',
      recommended: false
    },
    {
      id: 'staggered',
      title: 'Staggered Execution',
      description: 'Execute over 3 time intervals',
      icon: <Clock className="w-6 h-6" />,
      color: 'blue',
      confidence: '78%',
      impact: 'Time-weighted average',
      fee: '0.006 INJ',
      recommended: false
    },
    {
      id: 'limit',
      title: 'Limit Order Placement',
      description: 'Place limit order at optimal price',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'purple',
      confidence: '65%',
      impact: 'No guarantee of fill',
      fee: '0.002 INJ',
      recommended: false
    },
    {
      id: 'twap',
      title: 'TWAP Algorithm',
      description: 'Time-weighted average price execution',
      icon: <Shield className="w-6 h-6" />,
      color: 'indigo',
      confidence: '88%',
      impact: 'Professional execution',
      fee: '0.008 INJ',
      recommended: false
    }
  ];

  const handleExecute = async (optionId: string) => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setSelectedOption(optionId);
    setIsExecuting(true);

    // Simulate getting INJ amount from wallet
    setTimeout(() => {
      // Redirect to execution page with wallet integration
      router.push(`/dashboard/execute?option=${optionId}&fee=${executionOptions.find(opt => opt.id === optionId)?.fee}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-black px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-space font-bold text-white mb-2">
            Execution Recommendations
          </h1>
          <p className="text-brand-gray">
            INJ/USDT • 500 USDT • Choose optimal execution strategy
          </p>
        </div>

        {/* Wallet Status */}
        <div className="mb-8 p-4 rounded-xl border border-brand-border bg-brand-surface/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-brand-blue" />
              <div>
                <div className="text-sm text-brand-gray">Connected Wallet</div>
                <div className="text-white font-mono">
                  {address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Not Connected'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-brand-gray">Available INJ</div>
              <div className="text-white font-mono">2.4567 INJ</div>
            </div>
          </div>
        </div>

        {/* Execution Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {executionOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleExecute(option.id)}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                option.recommended 
                  ? 'border-brand-blue bg-brand-blue/5' 
                  : 'border-brand-border bg-brand-surface/50 hover:border-brand-gray'
              } ${
                selectedOption === option.id ? 'ring-2 ring-brand-blue' : ''
              }`}
            >
              {/* Recommended Badge */}
              {option.recommended && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-medium border border-brand-blue/30"
                >
                  RECOMMENDED
                </motion.div>
              )}

              {/* Loading State */}
              {selectedOption === option.id && isExecuting && (
                <div className="absolute inset-0 bg-brand-black/80 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full mx-auto mb-3 animate-spin" />
                    <p className="text-sm text-brand-blue">Executing...</p>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  option.recommended 
                    ? 'bg-brand-blue/20' 
                    : 'bg-brand-gray/20'
                }`}>
                  <div className={`${
                    option.color === 'emerald' ? 'text-emerald-400' :
                    option.color === 'amber' ? 'text-amber-400' :
                    option.color === 'blue' ? 'text-brand-blue' :
                    option.color === 'purple' ? 'text-purple-400' :
                    'text-indigo-400'
                  }`}>
                    {option.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-space font-bold mb-2 ${
                    option.recommended ? 'text-brand-blue' : 'text-white'
                  }`}>
                    {option.title}
                  </h3>
                  
                  <p className={`text-sm mb-3 ${
                    option.recommended ? 'text-brand-gray/70' : 'text-brand-gray/50'
                  }`}>
                    {option.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-brand-gray/60">Confidence:</span>
                      <span className={`text-xs font-medium ${
                        option.confidence.startsWith('9') ? 'text-emerald-400' :
                        option.confidence.startsWith('8') ? 'text-amber-400' :
                        option.confidence.startsWith('7') ? 'text-yellow-400' :
                        'text-brand-gray/60'
                      }`}>
                        {option.confidence}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-brand-gray/60">Impact:</span>
                      <span className="text-xs text-brand-gray/80">{option.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-brand-gray/60">Fee:</span>
                      <span className="text-xs font-mono text-white">{option.fee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-xl border border-brand-border bg-brand-black text-white font-medium hover:border-brand-gray transition-all"
          >
            Back to Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
