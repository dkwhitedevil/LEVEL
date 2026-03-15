'use client';

import { motion } from 'motion/react';
import { Zap, Clock, TrendingUp, ShieldAlert, Play, Pause, AlertTriangle } from 'lucide-react';

interface RecommendationCardsProps {
  slippage: number;
  liquidityStrength: string;
  spreadRisk: string;
  fragilityScore: string;
  onSelectRecommendation: (recommendation: 'execute' | 'split' | 'wait') => void;
}

export default function RecommendationCards({
  slippage,
  liquidityStrength,
  spreadRisk,
  fragilityScore,
  onSelectRecommendation
}: RecommendationCardsProps) {
  // Calculate recommendation based on market conditions
  const getRecommendation = () => {
    const slippageScore = slippage < 1 ? 100 : slippage < 2 ? 70 : slippage < 3 ? 40 : 10;
    const liquidityScore = liquidityStrength === 'Strong' ? 100 : liquidityStrength === 'Moderate' ? 60 : 20;
    const spreadScore = spreadRisk === 'Low' ? 100 : spreadRisk === 'Medium' ? 60 : 20;
    const fragilityMetric = fragilityScore === 'Low' ? 100 : fragilityScore === 'Moderate' ? 60 : 20;

    const totalScore = (slippageScore + liquidityScore + spreadScore + fragilityMetric) / 4;

    if (totalScore >= 80) {
      return {
        primary: 'execute',
        confidence: 'high',
        reasoning: 'Market conditions are optimal for immediate execution'
      };
    } else if (totalScore >= 50) {
      return {
        primary: 'split',
        confidence: 'medium',
        reasoning: 'Moderate conditions suggest splitting the trade for better execution'
      };
    } else {
      return {
        primary: 'wait',
        confidence: 'low',
        reasoning: 'Poor market conditions indicate waiting for better opportunities'
      };
    }
  };

  const recommendation = getRecommendation();

  const cards = [
    {
      id: 'execute',
      title: 'Execute Now',
      description: 'Execute trade immediately at current market price',
      icon: <Play className="w-6 h-6" />,
      color: 'emerald',
      status: recommendation.primary === 'execute' ? 'recommended' : 'available',
      confidence: recommendation.primary === 'execute' ? recommendation.confidence : 'low',
      reasoning: recommendation.primary === 'execute' ? recommendation.reasoning : 'Higher slippage risk detected',
      impact: slippage < 1 ? 'Low impact' : slippage < 2 ? 'Medium impact' : 'High impact'
    },
    {
      id: 'split',
      title: 'Split Trade',
      description: 'Divide trade into smaller orders for better execution',
      icon: <Zap className="w-6 h-6" />,
      color: 'amber',
      status: recommendation.primary === 'split' ? 'recommended' : 'available',
      confidence: recommendation.primary === 'split' ? recommendation.confidence : 'medium',
      reasoning: recommendation.primary === 'split' ? recommendation.reasoning : 'Balanced execution strategy',
      impact: 'Reduced market impact'
    },
    {
      id: 'wait',
      title: 'Wait',
      description: 'Hold off execution for better market conditions',
      icon: <Clock className="w-6 h-6" />,
      color: 'blue',
      status: recommendation.primary === 'wait' ? 'recommended' : 'available',
      confidence: recommendation.primary === 'wait' ? recommendation.confidence : 'low',
      reasoning: recommendation.primary === 'wait' ? recommendation.reasoning : 'May miss trading opportunity',
      impact: 'No immediate impact'
    }
  ];

  const getColorClasses = (color: string, status: string) => {
    const baseClasses = {
      emerald: {
        recommended: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        available: 'bg-white/5 border-white/10 text-white/60 hover:border-emerald-500/20'
      },
      amber: {
        recommended: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        available: 'bg-white/5 border-white/10 text-white/60 hover:border-amber-500/20'
      },
      blue: {
        recommended: 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue',
        available: 'bg-white/5 border-white/10 text-white/60 hover:border-brand-blue/20'
      }
    };

    return baseClasses[color as keyof typeof baseClasses][status as keyof typeof baseClasses[keyof typeof baseClasses]];
  };

  return (
    <div className="space-y-6">
      {/* Recommendation Header */}
      <div className="text-center">
        <h3 className="text-lg font-space font-bold text-white mb-2">Execution Recommendation</h3>
        <p className="text-sm text-brand-gray/70">
          AI-powered analysis suggests optimal execution strategy
        </p>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: card.status === 'recommended' ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: card.status === 'recommended' ? 1.02 : 1.01 }}
            onClick={() => onSelectRecommendation(card.id as 'execute' | 'split' | 'wait')}
            className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
              getColorClasses(card.color, card.status)
            }`}
          >
            {/* Recommended Badge */}
            {card.status === 'recommended' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-medium border border-brand-blue/30"
              >
                RECOMMENDED
              </motion.div>
            )}

            {/* Card Content */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                card.status === 'recommended' 
                  ? `${card.color === 'emerald' ? 'bg-emerald-500/20' : card.color === 'amber' ? 'bg-amber-500/20' : 'bg-brand-blue/20'}`
                  : 'bg-white/5'
              }`}>
                {card.icon}
              </div>

              <div className="flex-1">
                <h4 className={`text-lg font-space font-bold mb-2 ${
                  card.status === 'recommended' ? 'text-white' : 'text-white/80'
                }`}>
                  {card.title}
                </h4>
                
                <p className={`text-sm mb-3 ${
                  card.status === 'recommended' ? 'text-brand-gray/70' : 'text-brand-gray/50'
                }`}>
                  {card.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-brand-gray/60">Confidence:</span>
                      <span className={`text-xs font-medium ${
                        card.confidence === 'high' ? 'text-emerald-400' :
                        card.confidence === 'medium' ? 'text-amber-400' : 'text-brand-gray/60'
                      }`}>
                        {card.confidence.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-brand-gray/60">Impact:</span>
                      <span className="text-xs text-brand-gray/80">{card.impact}</span>
                    </div>
                  </div>

                  {card.status === 'recommended' && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-brand-blue"
                    />
                  )}
                </div>

                {/* Reasoning */}
                <div className={`mt-3 p-3 rounded-lg ${
                  card.status === 'recommended' 
                    ? 'bg-white/5 border border-white/10' 
                    : 'bg-white/[0.02] border border-white/5'
                }`}>
                  <p className={`text-xs leading-relaxed ${
                    card.status === 'recommended' ? 'text-brand-gray/70' : 'text-brand-gray/50'
                  }`}>
                    {card.reasoning}
                  </p>
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            {card.status === 'recommended' && (
              <motion.div
                className="absolute inset-0 rounded-2xl border border-brand-blue/30 pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(0, 229, 255, 0)',
                    '0 0 0 4px rgba(0, 229, 255, 0.1)',
                    '0 0 0 8px rgba(0, 229, 255, 0)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Market Summary */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-brand-gray/60 mb-1">Slippage</div>
            <div className={`text-sm font-mono font-bold ${
              slippage < 1 ? 'text-emerald-400' : slippage < 2 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {slippage.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-brand-gray/60 mb-1">Liquidity</div>
            <div className={`text-sm font-mono font-bold ${
              liquidityStrength === 'Strong' ? 'text-emerald-400' : 
              liquidityStrength === 'Moderate' ? 'text-amber-400' : 'text-red-400'
            }`}>
              {liquidityStrength}
            </div>
          </div>
          <div>
            <div className="text-xs text-brand-gray/60 mb-1">Spread</div>
            <div className={`text-sm font-mono font-bold ${
              spreadRisk === 'Low' ? 'text-emerald-400' : 
              spreadRisk === 'Medium' ? 'text-amber-400' : 'text-red-400'
            }`}>
              {spreadRisk}
            </div>
          </div>
          <div>
            <div className="text-xs text-brand-gray/60 mb-1">Fragility</div>
            <div className={`text-sm font-mono font-bold ${
              fragilityScore === 'Low' ? 'text-emerald-400' : 
              fragilityScore === 'Moderate' ? 'text-amber-400' : 'text-red-400'
            }`}>
              {fragilityScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
