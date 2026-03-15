'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Copy, ExternalLink, ChevronDown, Check } from 'lucide-react';

interface WalletButtonProps {
  isConnected: boolean;
  walletType: string;
  address: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function WalletButton({ 
  isConnected, 
  walletType, 
  address, 
  onConnect, 
  onDisconnect 
}: WalletButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'metamask': return '🦊';
      case 'keplr': return '🌟';
      case 'leap': return '🚀';
      default: return '👛';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  if (!isConnected) {
    return (
      <button
        onClick={onConnect}
        className="hidden md:flex px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white items-center gap-2"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="hidden md:flex px-5 py-2.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 hover:bg-brand-blue/20 transition-colors text-sm font-medium text-white items-center gap-3"
      >
        <span className="text-lg">{getWalletIcon(walletType)}</span>
        <span>{formatAddress(address)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 bg-[#050A15] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Wallet Info */}
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                  {getWalletIcon(walletType)}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">{walletType}</p>
                  <p className="text-xs text-brand-gray/70">Connected</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                <span className="text-xs text-brand-gray/60 font-mono">{formatAddress(address)}</span>
                <button
                  onClick={copyAddress}
                  className="p-1 rounded hover:bg-white/5 transition-colors"
                >
                  {copiedAddress ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-brand-gray/60" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={() => {
                  copyAddress();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-brand-gray/70 hover:text-white"
              >
                <Copy className="w-4 h-4" />
                Copy Address
              </button>
              
              <button
                onClick={() => {
                  // Open block explorer
                  window.open(`https://explorer.injective.network/account/${address}`, '_blank');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-brand-gray/70 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </button>
              
              <div className="h-px bg-white/5 my-2" />
              
              <button
                onClick={() => {
                  onDisconnect();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-sm text-red-400"
              >
                <Wallet className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
