'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { walletService, WalletInfo } from '@/services/walletService';

interface WalletContextType {
  isConnected: boolean;
  walletType: string;
  address: string;
  chainId: number | string;
  isConnecting: boolean;
  connect: (walletType: string, address: string) => void;
  disconnect: () => void;
  setConnecting: (connecting: boolean) => void;
  getBalance: () => Promise<string>;
  switchNetwork: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState<number | string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('level_wallet');
    if (savedWallet) {
      try {
        const wallet = JSON.parse(savedWallet);
        // Try to reconnect to the wallet
        reconnectWallet(wallet.type);
      } catch (error) {
        console.error('Failed to load wallet from localStorage:', error);
        localStorage.removeItem('level_wallet');
      }
    }
  }, []);

  // Reconnect to wallet on app load
  const reconnectWallet = async (type: string) => {
    try {
      setIsConnecting(true);
      
      let walletInfo: WalletInfo;
      switch (type) {
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

      setIsConnected(true);
      setWalletType(walletInfo.type);
      setAddress(walletInfo.address);
      setChainId(walletInfo.chainId);
    } catch (error) {
      console.error('Failed to reconnect wallet:', error);
      // Clear saved wallet if reconnection fails
      localStorage.removeItem('level_wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const connect = (type: string, addr: string) => {
    setIsConnected(true);
    setWalletType(type);
    setAddress(addr);
    
    // Get current chain ID from wallet service
    const currentWallet = walletService.getCurrentWallet();
    if (currentWallet) {
      setChainId(currentWallet.chainId);
    }
    
    // Save to localStorage
    localStorage.setItem('level_wallet', JSON.stringify({
      type,
      address: addr
    }));
  };

  const disconnect = () => {
    setIsConnected(false);
    setWalletType('');
    setAddress('');
    setChainId('');
    setIsConnecting(false);
    
    // Disconnect from wallet service
    walletService.disconnect();
    
    // Remove from localStorage
    localStorage.removeItem('level_wallet');
  };

  const getBalance = async (): Promise<string> => {
    try {
      return await walletService.getBalance();
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0.0000';
    }
  };

  const switchNetwork = async (): Promise<void> => {
    try {
      await walletService.switchToInjectiveNetwork();
      // Update chain ID after switching
      const currentWallet = walletService.getCurrentWallet();
      if (currentWallet) {
        setChainId(currentWallet.chainId);
      }
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  };

  const setConnecting = (connecting: boolean) => {
    setIsConnecting(connecting);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletType,
        address,
        chainId,
        isConnecting,
        connect,
        disconnect,
        setConnecting,
        getBalance,
        switchNetwork
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
