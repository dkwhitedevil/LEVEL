'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { injectiveService, OrderbookData, Market } from '@/services/injectiveService';

interface UseOrderbookOptions {
  marketId?: string;
  symbol?: string;
  refreshInterval?: number;
  autoRefresh?: boolean;
}

interface OrderbookState {
  data: OrderbookData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export function useOrderbook(options: UseOrderbookOptions = {}) {
  const {
    marketId,
    symbol,
    refreshInterval = 3000, // 3 seconds default
    autoRefresh = true
  } = options;

  const [state, setState] = useState<OrderbookState>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Determine market ID from symbol or use provided market ID
  const getMarketId = useCallback(() => {
    if (marketId) return marketId;
    if (symbol) {
      const market = injectiveService.getMarketBySymbol(symbol);
      return market?.marketId;
    }
    // Default to INJ/USDT
    return injectiveService.getMarkets()[0]?.marketId;
  }, [marketId, symbol]);

  // Fetch orderbook data
  const fetchOrderbook = useCallback(async () => {
    const currentMarketId = getMarketId();
    if (!currentMarketId) {
      setState(prev => ({
        ...prev,
        error: 'Market not found',
        loading: false
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await injectiveService.fetchOrderbook(currentMarketId);
      
      if (mountedRef.current) {
        setState(prev => ({
          ...prev,
          data,
          loading: false,
          error: null,
          lastUpdated: Date.now()
        }));
      }
    } catch (error) {
      console.error('Orderbook fetch error:', error);
      if (mountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orderbook';
        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false
        }));
      }
    }
  }, [getMarketId]);

  // Start auto-refresh
  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchOrderbook();
      }, refreshInterval);
    }
  }, [autoRefresh, refreshInterval, fetchOrderbook]);

  // Stop auto-refresh
  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Manual refresh
  const refresh = useCallback(() => {
    fetchOrderbook();
  }, [fetchOrderbook]);

  // Initial fetch
  useEffect(() => {
    fetchOrderbook();
    
    // For demo mode, stop loading immediately after first fetch
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setState(prev => ({ ...prev, loading: false }));
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [fetchOrderbook]);

  // Calculate slippage
  const calculateSlippage = useCallback((orderSize: number, isBuy: boolean) => {
    if (!state.data) return 0;
    return injectiveService.calculateSlippage(state.data, orderSize, isBuy);
  }, [state.data]);

  // Get market depth
  const getMarketDepth = useCallback((depthLevels?: number) => {
    if (!state.data) return null;
    return injectiveService.getMarketDepth(state.data, depthLevels);
  }, [state.data]);

  // Initialize and set up auto-refresh
  useEffect(() => {
    fetchOrderbook();
    startAutoRefresh();

    return () => {
      mountedRef.current = false;
      stopAutoRefresh();
    };
  }, [fetchOrderbook, startAutoRefresh, stopAutoRefresh]);

  // Update auto-refresh when options change
  useEffect(() => {
    if (autoRefresh) {
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }
  }, [autoRefresh, refreshInterval, startAutoRefresh, stopAutoRefresh]);

  return {
    ...state,
    refresh,
    calculateSlippage,
    getMarketDepth,
    startAutoRefresh,
    stopAutoRefresh
  };
}

// Hook for managing multiple markets
export function useMultipleOrderbooks(marketIds: string[], refreshInterval: number = 3000) {
  const [orderbooks, setOrderbooks] = useState<Record<string, OrderbookData>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const fetchOrderbook = useCallback(async (marketId: string) => {
    setLoading(prev => ({ ...prev, [marketId]: true }));
    setErrors(prev => ({ ...prev, [marketId]: null }));

    try {
      const data = await injectiveService.fetchOrderbook(marketId);
      setOrderbooks(prev => ({ ...prev, [marketId]: data }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        [marketId]: error instanceof Error ? error.message : 'Failed to fetch orderbook'
      }));
    } finally {
      setLoading(prev => ({ ...prev, [marketId]: false }));
    }
  }, []);

  // Fetch all orderbooks
  const fetchAll = useCallback(async () => {
    await Promise.all(marketIds.map(id => fetchOrderbook(id)));
  }, [marketIds, fetchOrderbook]);

  // Initialize and set up auto-refresh
  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchAll, refreshInterval]);

  return {
    orderbooks,
    loading,
    errors,
    refresh: fetchAll,
    refreshSingle: fetchOrderbook
  };
}
