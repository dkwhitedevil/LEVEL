'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Activity, ShieldAlert, Zap, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface PremiumIntelligenceCardProps {
  title: string;
  value: string | number;
  status: 'excellent' | 'good' | 'warning' | 'danger' | 'neutral';
  description: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  change?: string;
  animated?: boolean;
}

export default function PremiumIntelligenceCard({
  title,
  value,
  status,
  description,
  icon,
  trend,
  change,
  animated = true
}: PremiumIntelligenceCardProps) {
  const statusConfig = {
    excellent: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20'
    },
    good: {
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/30',
      text: 'text-brand-green',
      glow: 'shadow-brand-green/20'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20'
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-red-500/20'
    },
    neutral: {
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue/30',
      text: 'text-brand-blue',
      glow: 'shadow-brand-blue/20'
    }
  };

  const config = statusConfig[status];

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-brand-green" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'stable':
        return <Activity className="w-4 h-4 text-brand-gray/60" />;
      default:
        return null;
    }
  };

  const getBackgroundPattern = () => {
    switch (status) {
      case 'excellent':
      case 'good':
        return 'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)';
      case 'warning':
        return 'radial-gradient(circle at 80% 20%, rgba(255, 184, 0, 0.1) 0%, transparent 50%)';
      case 'danger':
        return 'radial-gradient(circle at 50% 50%, rgba(255, 51, 102, 0.1) 0%, transparent 50%)';
      case 'neutral':
        return 'radial-gradient(circle at 30% 30%, rgba(0, 229, 255, 0.1) 0%, transparent 50%)';
      default:
        return 'none';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -2,
        boxShadow: `0 8px 32px ${config.glow}`,
        transition: { duration: 0.2 }
      }}
      className={`relative p-6 rounded-2xl border ${config.border} ${config.bg} backdrop-blur-sm overflow-hidden group cursor-pointer`}
      style={{ background: getBackgroundPattern() }}
    >
      {/* Animated Background Pattern */}
      {animated && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${config.text.replace('text-', '').replace('400', '400').replace('500', '500')}20 50%, transparent 70%)`,
          }}
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center ${config.text}`}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-xs font-mono text-brand-gray/60 uppercase tracking-wider mb-1">
                {title}
              </h3>
              {trend && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  {change && (
                    <span className="text-xs font-mono text-brand-gray/60">
                      {change}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className={`w-2 h-2 rounded-full ${config.text} ${animated ? 'animate-pulse' : ''}`} />
        </div>

        {/* Value */}
        <div className="mb-3">
          <div className={`text-3xl font-space font-bold ${config.text} tabular-nums`}>
            {value}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-brand-gray/70 leading-relaxed">
          {description}
        </p>

        {/* Additional Metrics */}
        {(status === 'excellent' || status === 'good') && (
          <div className="mt-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-brand-green" />
            <span className="text-xs text-brand-gray/60">Optimal conditions detected</span>
          </div>
        )}

        {status === 'warning' && (
          <div className="mt-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-brand-gray/60">Monitor closely</span>
          </div>
        )}

        {status === 'danger' && (
          <div className="mt-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-xs text-brand-gray/60">High risk detected</span>
          </div>
        )}
      </div>

      {/* Subtle Animated Border */}
      {animated && (
        <motion.div
          className={`absolute inset-0 rounded-2xl border ${config.border} opacity-0 group-hover:opacity-100`}
          animate={{ 
            boxShadow: [
              `0 0 0 0px ${config.text.replace('text-', '').replace('400', '400').replace('500', '500')}40`,
              `0 0 0 4px transparent`,
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
