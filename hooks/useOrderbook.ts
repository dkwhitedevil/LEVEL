import { useEffect, useState, useCallback } from 'react';
import { injectiveService } from '@/services/injectiveService';

export function useOrderbook({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await injectiveService.fetchOrderbook(symbol);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch orderbook:', error);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Also fetch when symbol changes
  useEffect(() => {
    fetchData();
  }, [symbol]);

  return { data, loading, refresh: fetchData };
}
