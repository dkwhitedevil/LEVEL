export function generateOutcome(price: number, slippage: number, size: number) {
  const predictedFill = price * (1 + slippage / 100);
  const actualFill = predictedFill - predictedFill * 0.002;
  const received = size / actualFill;

  return {
    predictedFill,
    actualFill,
    received
  };
}
