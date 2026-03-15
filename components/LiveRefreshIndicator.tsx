'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface LiveRefreshIndicatorProps {
  lastUpdated?: Date | null;
  isRefreshing?: boolean;
  error?: string | null;
  interval?: number;
}

export default function LiveRefreshIndicator({
  lastUpdated,
  isRefreshing = false,
  error = null,
  interval = 3000
}: LiveRefreshIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastUpdated) {
        setTimeAgo('Live');
        return;
      }

      const now = Date.now();
      const diff = now - lastUpdated.getTime();

      if (diff < 1000) {
        setTimeAgo('Just now');
      } else if (diff < 60000) {
        setTimeAgo(`${Math.floor(diff / 1000)}s ago`);
      } else if (diff < 3600000) {
        setTimeAgo(`${Math.floor(diff / 60000)}m ago`);
      } else {
        setTimeAgo(`${Math.floor(diff / 3600000)}h ago`);
      }
    };

    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(intervalId);
  }, [lastUpdated]);

  const getStatusColor = () => {
    if (error) return 'text-red-400';
    if (isRefreshing) return 'text-amber-400';
    if (!lastUpdated) return 'text-brand-gray/50';
    const diff = Date.now() - lastUpdated.getTime();
    if (diff < 10000) return 'text-emerald-400'; // Fresh (under 10s)
    if (diff < 30000) return 'text-brand-blue'; // Recent (under 30s)
    return 'text-brand-gray/60'; // Stale
  };

  const getStatusIcon = () => {
    if (error) return <WifiOff className="w-3 h-3 text-red-400" />;
    if (isRefreshing) return <Activity className="w-3 h-3 text-amber-400 animate-pulse" />;
    return <Wifi className="w-3 h-3 text-emerald-400" />;
  };

  const getStatusText = () => {
    if (error) return 'Connection error';
    if (isRefreshing) return 'Updating...';
    if (!lastUpdated) return 'Live data';
    return `Updated ${timeAgo}`;
  };

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 ${
        error 
          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
          : isRefreshing 
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          : lastUpdated && Date.now() - lastUpdated.getTime() < 10000
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue'
      }`}
      animate={{
        opacity: error ? 0.8 : 1,
        scale: isRefreshing ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Icon */}
      <motion.div
        animate={{
          rotate: isRefreshing ? 360 : 0,
          scale: error ? [1, 1.2, 1] : 1
        }}
        transition={{
          rotate: isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {},
          scale: error ? { duration: 0.5, repeat: Infinity } : {}
        }}
        className={getStatusColor()}
      >
        {getStatusIcon()}
      </motion.div>

      {/* Status Text */}
      <span className="font-mono">
        {getStatusText()}
      </span>

      {/* Live Indicator */}
      {!error && lastUpdated && (
        <motion.div
          className="flex items-center gap-1"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-current"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs opacity-70">LIVE</span>
        </motion.div>
      )}

      {/* Refresh Progress */}
      {isRefreshing && (
        <motion.div
          className="w-8 h-0.5 bg-current rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
