// Real Wallet Connection Service for LEVEL
// This service handles actual wallet connections to MetaMask, Keplr, and Leap

export interface WalletInfo {
  type: 'metamask' | 'keplr' | 'leap';
  address: string;
  chainId: number | string;
  isConnected: boolean;
}

export interface NetworkInfo {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// Injective Testnet Network Configuration
const INJECTIVE_TESTNET: NetworkInfo = {
  chainId: '0x66aeea',
  chainName: 'Injective Testnet',
  nativeCurrency: {
    name: 'Injective Coin',
    symbol: 'INJ',
    decimals: 18
  },
  rpcUrls: ['https://testnet-rpc.injective.network'],
  blockExplorerUrls: ['https://testnet.explorer.injective.network']
};

class WalletService {
  private currentWallet: WalletInfo | null = null;

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  /**
   * Check if Keplr is installed
   */
  isKeplrInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).keplr;
  }

  /**
   * Check if Leap is installed
   */
  isLeapInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).leap;
  }

  /**
   * Connect to MetaMask wallet
   */
  async connectMetaMask(): Promise<WalletInfo> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      const ethereum = window.ethereum;
      
      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your MetaMask wallet.');
      }

      const address = accounts[0];
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      // Switch to Injective network if not already connected
      await this.switchToInjectiveNetwork();

      const walletInfo: WalletInfo = {
        type: 'metamask',
        address,
        chainId,
        isConnected: true
      };

      this.currentWallet = walletInfo;
      
      // Listen for account changes
      ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
      ethereum.on('chainChanged', this.handleChainChanged.bind(this));

      return walletInfo;
    } catch (error) {
      console.error('MetaMask connection error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          throw new Error('Connection rejected by user.');
        }
      }
      throw error;
    }
  }

  /**
   * Connect to Keplr wallet
   */
  async connectKeplr(): Promise<WalletInfo> {
    if (!this.isKeplrInstalled()) {
      throw new Error('Keplr is not installed. Please install Keplr to continue.');
    }

    try {
      const keplr = (window as any).keplr;
      
      // Enable Injective chain
      await keplr.enable('injective-1');

      // Get account
      const key = await keplr.getKey('injective-1');
      const address = key.bech32Address;

      const walletInfo: WalletInfo = {
        type: 'keplr',
        address,
        chainId: 'injective-1',
        isConnected: true
      };

      this.currentWallet = walletInfo;
      return walletInfo;
    } catch (error) {
      console.error('Keplr connection error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          throw new Error('Connection rejected by user.');
        }
      }
      throw error;
    }
  }

  /**
   * Connect to Leap wallet
   */
  async connectLeap(): Promise<WalletInfo> {
    if (!this.isLeapInstalled()) {
      throw new Error('Leap is not installed. Please install Leap to continue.');
    }

    try {
      const leap = (window as any).leap;
      
      // Enable Injective chain
      await leap.enable('injective-1');

      // Get account
      const key = await leap.getKey('injective-1');
      const address = key.bech32Address;

      const walletInfo: WalletInfo = {
        type: 'leap',
        address,
        chainId: 'injective-1',
        isConnected: true
      };

      this.currentWallet = walletInfo;
      return walletInfo;
    } catch (error) {
      console.error('Leap connection error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          throw new Error('Connection rejected by user.');
        }
      }
      throw error;
    }
  }

  /**
   * Switch to Injective network (for MetaMask)
   */
  async switchToInjectiveNetwork(): Promise<void> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed.');
    }

    const ethereum = window.ethereum;
    
    try {
      // Try to switch to Injective testnet
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: INJECTIVE_TESTNET.chainId }]
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          // Add Injective testnet to MetaMask
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [INJECTIVE_TESTNET]
          });
        } catch (addError) {
          console.error('Failed to add Injective testnet:', addError);
          throw new Error('Failed to add Injective testnet to MetaMask.');
        }
      } else {
        console.error('Failed to switch network:', switchError);
        throw new Error('Failed to switch to Injective testnet.');
      }
    }
  }

  /**
   * Disconnect wallet
   */
  disconnect(): void {
    this.currentWallet = null;
    
    // Remove event listeners
    if (this.isMetaMaskInstalled()) {
      const ethereum = window.ethereum;
      ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      ethereum.removeListener('chainChanged', this.handleChainChanged);
    }
  }

  /**
   * Get current connected wallet
   */
  getCurrentWallet(): WalletInfo | null {
    return this.currentWallet;
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return this.currentWallet !== null && this.currentWallet.isConnected;
  }

  /**
   * Get wallet balance
   */
  async getBalance(): Promise<string> {
    if (!this.currentWallet || !this.currentWallet.address) {
      throw new Error('No wallet connected');
    }

    if (this.currentWallet.type === 'metamask') {
      if (!this.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed');
      }

      const ethereum = window.ethereum;
      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [this.currentWallet.address, 'latest']
      });

      // Convert from wei to ETH (or INJ in this case)
      return (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);
    }

    // For Keplr and Leap, you'd need to query the Injective RPC
    // This is a simplified implementation
    return '0.0000';
  }

  /**
   * Handle account changes (MetaMask)
   */
  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      // User disconnected their wallet
      this.disconnect();
    } else if (accounts[0] !== this.currentWallet?.address) {
      // Account changed, update wallet info
      if (this.currentWallet) {
        this.currentWallet.address = accounts[0];
      }
    }
  }

  /**
   * Handle chain changes (MetaMask)
   */
  private handleChainChanged(chainId: string): void {
    if (this.currentWallet) {
      this.currentWallet.chainId = chainId;
    }
  }

  /**
   * Sign message (for authentication)
   */
  async signMessage(message: string): Promise<string> {
    if (!this.currentWallet || !this.currentWallet.address) {
      throw new Error('No wallet connected');
    }

    if (this.currentWallet.type === 'metamask') {
      if (!this.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed');
      }

      const ethereum = window.ethereum;
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, this.currentWallet.address]
      });

      return signature;
    }

    // For Keplr and Leap, implement similar signing logic
    throw new Error('Message signing not implemented for this wallet type');
  }

  /**
   * Get all available wallets
   */
  getAvailableWallets(): Array<{ id: string; name: string; installed: boolean }> {
    return [
      { id: 'metamask', name: 'MetaMask', installed: this.isMetaMaskInstalled() },
      { id: 'keplr', name: 'Keplr', installed: this.isKeplrInstalled() },
      { id: 'leap', name: 'Leap', installed: this.isLeapInstalled() }
    ];
  }
}

// Extend Window interface for wallet types
declare global {
  interface Window {
    ethereum?: any;
    keplr?: any;
    leap?: any;
  }
}

// Singleton instance
export const walletService = new WalletService();
