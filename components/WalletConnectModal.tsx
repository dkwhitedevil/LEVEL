'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, Copy, ExternalLink, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { walletService } from '@/services/walletService';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string, address: string) => void;
}

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Get available wallets and their installation status
  const availableWallets = walletService.getAvailableWallets();

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect using MetaMask browser extension',
      icon: '🦊',
      recommended: true,
      installed: availableWallets.find(w => w.id === 'metamask')?.installed || false
    },
    {
      id: 'keplr',
      name: 'Keplr',
      description: 'Native Injective ecosystem wallet',
      icon: '🌟',
      recommended: false,
      installed: availableWallets.find(w => w.id === 'keplr')?.installed || false
    },
    {
      id: 'leap',
      name: 'Leap',
      description: 'Cosmos ecosystem wallet',
      icon: '🚀',
      recommended: false,
      installed: availableWallets.find(w => w.id === 'leap')?.installed || false
    }
  ];

  const handleWalletConnect = async (walletId: string) => {
    setIsConnecting(true);
    setSelectedWallet(walletId);
    setConnectionError(null);

    try {
      let walletInfo;
      
      switch (walletId) {
        case 'metamask':
          walletInfo = await walletService.connectMetaMask();
          break;
        case 'keplr':
          walletInfo = await walletService.connectKeplr();
          break;
        case 'leap':
          walletInfo = await walletService.connectLeap();
          break;
        default:
          throw new Error('Unsupported wallet type');
      }

      onConnect(walletInfo.type, walletInfo.address);
      onClose();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const getWalletDownloadUrl = (walletId: string) => {
    switch (walletId) {
      case 'metamask':
        return 'https://metamask.io/download/';
      case 'keplr':
        return 'https://www.keplr.app/download';
      case 'leap':
        return 'https://www.leapwallet.io/download';
      default:
        return '#';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#050A15] border border-white/10 rounded-2xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-space font-medium text-white mb-1">Connect Wallet</h3>
                <p className="text-sm text-brand-gray/70">Choose your preferred wallet</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-brand-gray/70" />
              </button>
            </div>

            {/* Connection Error */}
            {connectionError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-400">{connectionError}</p>
                </div>
              </div>
            )}

            {/* Wallet Options */}
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => wallet.installed ? handleWalletConnect(wallet.id) : window.open(getWalletDownloadUrl(wallet.id), '_blank')}
                  disabled={isConnecting || (!wallet.installed && false)}
                  className="w-full p-4 rounded-xl border border-white/10 hover:border-brand-blue/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 relative overflow-hidden group"
                >
                  {wallet.recommended && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs text-brand-blue font-medium">
                      Recommended
                    </div>
                  )}
                  
                  {!wallet.installed && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium">
                      Not Installed
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                      {wallet.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-white font-medium mb-1">{wallet.name}</h4>
                      <p className="text-sm text-brand-gray/70">
                        {wallet.installed ? wallet.description : `Download ${wallet.name} to connect`}
                      </p>
                    </div>
                    {selectedWallet === wallet.id && isConnecting && (
                      <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-brand-gray/60 text-center mb-3">
                By connecting a wallet, you agree to LEVEL's Terms of Service
              </p>
              <div className="text-center">
                <p className="text-xs text-brand-gray/50 mb-2">Need help?</p>
                <button
                  onClick={() => window.open('https://docs.injective.network/wallets', '_blank')}
                  className="text-xs text-brand-blue hover:underline"
                >
                  Wallet Setup Guide
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
