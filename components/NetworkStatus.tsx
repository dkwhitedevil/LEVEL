'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

export default function NetworkStatus() {
  const { isConnected, chainId, switchNetwork } = useWallet();
  const [isSwitching, setIsSwitching] = useState(false);

  // Injective Testnet chain ID
  const INJECTIVE_CHAIN_ID = '0x66aeea'; // 421614 in decimal (same for testnet)
  
  const isCorrectNetwork = chainId === INJECTIVE_CHAIN_ID;
  const networkName = isCorrectNetwork ? 'Injective Testnet' : 'Unknown Network';

  const handleSwitchNetwork = async () => {
    if (!isConnected) return;
    
    setIsSwitching(true);
    try {
      await switchNetwork();
    } catch (error) {
      console.error('Failed to switch network:', error);
    } finally {
      setIsSwitching(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
        isCorrectNetwork 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
          : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
      }`}
    >
      {isCorrectNetwork ? (
        <>
          <CheckCircle className="w-3 h-3" />
          <span>{networkName}</span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-3 h-3" />
          <span>Wrong Network</span>
          <button
            onClick={handleSwitchNetwork}
            disabled={isSwitching}
            className="ml-1 p-1 rounded hover:bg-amber-500/20 transition-colors disabled:opacity-50"
            title="Switch to Injective Testnet"
          >
            <RefreshCw className={`w-3 h-3 ${isSwitching ? 'animate-spin' : ''}`} />
          </button>
        </>
      )}
    </motion.div>
  );
}
