'use client';

import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const txHash = searchParams.get('txHash') || '';

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface/60 p-8 text-center backdrop-blur-sm">

        <CheckCircle2 className="w-14 h-14 text-brand-blue mx-auto mb-6" />

        <h1 className="text-2xl font-space font-bold text-white mb-3">
          Execution Confirmed
        </h1>

        <p className="text-brand-gray mb-6">
          Transaction submitted successfully
        </p>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-brand-gray">Transaction Fee</span>
            <span className="text-white">0.002 INJ</span>
          </div>

          <div className="flex justify-between">
            <span className="text-brand-gray">Tx Hash</span>
            <span className="text-brand-blue font-mono">
              {txHash.slice(0, 8)}...{txHash.slice(-6)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-brand-gray">Status</span>
            <span className="text-brand-blue">Confirmed</span>
          </div>

        </div>

        <button
          onClick={() =>
            window.open(
              `https://testnet.blockscout.injective.network/tx/${txHash}`,
              '_blank'
            )
          }
          className="mt-8 px-6 py-3 rounded-xl bg-brand-blue text-brand-black font-bold"
        >
          View Transaction
        </button>

      </div>
    </div>
  );
}
