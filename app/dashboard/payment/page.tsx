'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { useState } from 'react';
import { Wallet, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { sendInjectiveTestnetTx, saveTransaction } from '@/services/paymentService';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { address } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Get trade details from URL params
  const tradeDetails = {
    pair: searchParams.get('pair') || 'INJ/USDT',
    tradeSize: searchParams.get('tradeSize') || '500',
    recommendation: searchParams.get('recommendation') || 'Split Trade',
    predictedFill: searchParams.get('predictedFill') || '27.51',
    actualFill: searchParams.get('actualFill') || '27.47'
  };

  const handlePayment = async () => {
    if (!address) {
      setShowWalletModal(true);
      return;
    }

    setIsProcessing(true);
    setShowWalletModal(true); // Show wallet popup for confirmation
    // Don't execute anything yet - wait for user confirmation
  };

  const handleWalletConfirmation = async () => {
  try {
    const result = await sendInjectiveTestnetTx(address || '');

    if (result.success) {
      setTxHash(result.txHash);
      setIsComplete(true);
      setShowWalletModal(false);

      setTimeout(() => {
        router.push(`/dashboard/success?txHash=${result.txHash}`);
      }, 2000);
    }

    setIsProcessing(false);

  } catch (err) {
    console.error(err);
    alert('Transaction rejected or network incorrect');
    setIsProcessing(false);
    setShowWalletModal(false);
  }
};

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface/60 p-8 backdrop-blur-sm">
        <h1 className="text-2xl font-space font-bold text-white mb-8">
          Confirm Execution
        </h1>

        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-brand-gray">Market Pair</span>
            <span className="text-white font-mono">{tradeDetails.pair}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Trade Size</span>
            <span className="text-white font-mono">{tradeDetails.tradeSize} USDT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Recommendation</span>
            <span className="text-brand-blue font-mono">{tradeDetails.recommendation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Predicted Fill</span>
            <span className="text-white font-mono">${tradeDetails.predictedFill}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Actual Simulated Fill</span>
            <span className="text-white font-mono">${tradeDetails.actualFill}</span>
          </div>
          <div className="border-t border-brand-border my-5 pt-5">
            <div className="flex justify-between">
              <span className="text-brand-gray">Execution Fee</span>
              <span className="text-white font-mono">0.002 INJ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Wallet</span>
              <span className="text-white font-mono">
                {address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-4 rounded-xl bg-brand-blue text-brand-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full mx-auto mb-3 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              Approve 0.002 INJ
            </>
          )}
        </button>
      </div>

      {/* Wallet Popup Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-space font-bold text-white">
                Wallet Required
              </h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-2 rounded-lg border border-brand-border bg-brand-black hover:border-brand-gray transition-colors"
              >
                <X className="w-5 h-5 text-brand-gray" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-lg font-space font-bold text-white mb-2">
                {address ? 'Confirm Transaction' : 'Connect Your Wallet'}
              </h3>
              <p className="text-brand-gray mb-6">
                {address 
                  ? 'Please confirm the transaction of 0.002 INJ in your wallet.'
                  : 'Please connect your Injective wallet to execute this transaction.'
                }
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleWalletConfirmation}
                  className="flex-1 px-6 py-3 rounded-xl bg-brand-blue text-brand-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                >
                  {address ? 'Confirm Transaction' : 'Connect Wallet'}
                </button>
                <button
                  onClick={() => {
                    setShowWalletModal(false);
                    setIsProcessing(false);
                  }}
                  className="flex-1 px-6 py-3 rounded-xl border border-brand-border bg-brand-black text-white hover:border-brand-gray transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {isComplete && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-space font-bold text-white mb-2">
            Transaction Confirmed
          </h2>
          <p className="text-brand-gray mb-4">
            Transaction submitted successfully
          </p>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-brand-gray">Transaction Hash:</span>
              <span className="text-brand-blue font-mono text-sm">
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Amount:</span>
              <span className="text-white font-mono">0.002 INJ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Status:</span>
              <span className="text-emerald-400 font-mono">Confirmed</span>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/dashboard/success')}
            className="px-8 py-3 rounded-xl bg-brand-blue text-brand-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
