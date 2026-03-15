import { orderbookSamples } from '@/data/orderbookData';

export const injectiveService = {
  async fetchOrderbook(symbol: string) {
    await new Promise((r) => setTimeout(r, 400));
    return orderbookSamples[symbol] || orderbookSamples['INJ/USDT'];
  },

  calculateSlippage(orderbook: any, amount: number, isBuy: boolean) {
    const levels = isBuy ? orderbook.asks : orderbook.bids;

    let remaining = amount;
    let totalCost = 0;

    for (const level of levels) {
      const levelValue = level.price * level.quantity;

      if (remaining <= levelValue) {
        totalCost += remaining;
        break;
      }

      totalCost += levelValue;
      remaining -= levelValue;
    }

    const avgFill = totalCost / amount;

    return ((avgFill - orderbook.currentPrice) / orderbook.currentPrice) * 100;
  },

  getMarketDepth(orderbook: any, levels = 5) {
    const bidDepth = orderbook.bids.reduce((a: number, b: any) => a + b.total, 0);
    const askDepth = orderbook.asks.reduce((a: number, b: any) => a + b.total, 0);

    const ratio = bidDepth / askDepth;

    return {
      bidDepth,
      askDepth,
      depthRatio: ratio,
      liquidityStrength:
        ratio > 1.2 ? 'Strong' :
        ratio > 0.8 ? 'Moderate' :
        'Weak'
    };
  }
};
