export function generateExplanation(slippage: number, liquidity: string) {
  if (slippage < 0.5 && liquidity === 'Strong') {
    return {
      recommendation: 'Execute Now',
      confidence: 92,
      text: 'Depth remains stable across nearby levels.'
    };
  }

  if (slippage < 1.5) {
    return {
      recommendation: 'Split Trade',
      confidence: 78,
      text: 'Liquidity weakens above level 2.'
    };
  }

  return {
    recommendation: 'Wait',
    confidence: 61,
    text: 'Fragile liquidity may widen execution cost.'
  };
}
