'use client';

const pairs = [
  'INJ/USDT',
  'BTC/USDT',
  'ETH/USDT',
  'SOL/USDT',
  'ATOM/USDT',
  'BNB/USDT'
];

export default function PairSelector({
  selectedSymbol,
  onSymbolChange
}: {
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-mono text-brand-gray uppercase tracking-wider mb-2 block">
        Market Pair
      </label>

      <select
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="w-full p-4 rounded-xl border border-brand-border bg-brand-black text-white"
      >
        {pairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </select>
    </div>
  );
}
