'use client';

export default function DepthChart({ orderbookData }: { orderbookData: any }) {
  if (!orderbookData) return null;

  return (
    <div className="space-y-3">
      {orderbookData.asks.map((ask: any, i: number) => (
        <div key={i} className="flex justify-between text-red-400 font-mono text-sm">
          <span>{ask.price}</span>
          <span>{ask.quantity}</span>
        </div>
      ))}

      <div className="border-t border-brand-border my-3" />

      {orderbookData.bids.map((bid: any, i: number) => (
        <div key={i} className="flex justify-between text-green-400 font-mono text-sm">
          <span>{bid.price}</span>
          <span>{bid.quantity}</span>
        </div>
      ))}
    </div>
  );
}
