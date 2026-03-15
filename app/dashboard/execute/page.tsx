'use client';

import { motion } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Wallet, CheckCircle2, ExternalLink } from 'lucide-react';
import { sendInjectiveTestnetTx, saveTransaction } from '@/services/paymentService';
import { useWallet } from '@/contexts/WalletContext';

export default function ExecutePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { address } = useWallet();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  
  const optionId = searchParams.get('option') || 'immediate';
  const fee = searchParams.get('fee') || '0.002 INJ';

  const executionDetails = {
    immediate: {
      title: 'Immediate Execution',
      description: 'Executing trade at current market price',
      time: '2-3 seconds'
    },
    split: {
      title: 'Split Execution',
      description: 'Executing 2 orders for optimal price',
      time: '5-10 seconds'
    },
    staggered: {
      title: 'Staggered Execution',
      description: 'Executing over 3 time intervals',
      time: '15-30 seconds'
    },
    limit: {
      title: 'Limit Order',
      description: 'Placing limit order at optimal price',
      time: 'Until filled'
    },
    twap: {
      title: 'TWAP Execution',
      description: 'Time-weighted average price execution',
      time: '10-20 seconds'
    }
  };

  const currentExecution = executionDetails[optionId as keyof typeof executionDetails] || executionDetails.immediate;

  const handleExecute = async () => {
  if (!address) {
    alert('Please connect your wallet first');
    return;
  }

  setIsProcessing(true);

  try {
    const result = await sendInjectiveTestnetTx(address);
    
    if (result.success) {
      setTxHash(result.txHash);
      setIsComplete(true);
      setIsProcessing(false);
    }
  } catch (error) {
    console.error('Transaction failed:', error);
    alert('Transaction rejected or network incorrect');
    setIsProcessing(false);
  }
};

  if (!address) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-brand-gray mx-auto mb-4" />
          <h2 className="text-xl font-space font-bold text-white mb-2">
            Wallet Required
          </h2>
          <p className="text-brand-gray mb-6">
            Please connect your wallet to execute this trade
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 rounded-xl bg-brand-blue text-brand-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-space font-bold text-white mb-2">
            {currentExecution.title}
          </h1>
          <p className="text-brand-gray">
            {currentExecution.description}
          </p>
        </div>

        {/* Execution Status */}
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/50 backdrop-blur-sm mb-8">
          {!isComplete ? (
            <div className="text-center">
              {isProcessing ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h2 className="text-xl font-space font-bold text-white mb-2">
                    Processing Transaction
                  </h2>
                  <p className="text-brand-gray mb-4">
                    Waiting for wallet confirmation...
                  </p>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray">Wallet:</span>
                      <span className="text-white font-mono">
                        {address ? `${address.slice(0,6)}...${address.slice(-4)}` : '---'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray">Amount:</span>
                      <span className="text-white font-mono">500 USDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray">Fee:</span>
                      <span className="text-white font-mono">{fee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray">Est. Time:</span>
                      <span className="text-white font-mono">{currentExecution.time}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h2 className="text-xl font-space font-bold text-white mb-2">
                    Ready to Execute
                  </h2>
                  <p className="text-brand-gray mb-6">
                    Click below to confirm the transaction
                  </p>
                  <button
                    onClick={handleExecute}
                    className="px-8 py-4 rounded-xl bg-brand-blue text-brand-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                  >
                    Execute Trade
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <h2 className="text-xl font-space font-bold text-white mb-2">
                Execution Complete
              </h2>
              <p className="text-brand-gray mb-6">
                Trade executed successfully
              </p>
              
              <div className="space-y-3 text-left max-w-md mx-auto mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Transaction Hash:</span>
                  <span className="text-brand-blue font-mono text-xs">
                    {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Status:</span>
                  <span className="text-emerald-400 font-mono">Confirmed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Fee Paid:</span>
                  <span className="text-white font-mono">{fee}</span>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.open(`https://testnet.blockscout.injective.network/tx/${txHash}`, '_blank')}
                  className="px-6 py-3 rounded-xl border border-brand-border bg-brand-black text-white font-medium hover:border-brand-blue/30 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </button>
                <button
                  onClick={() => router.push('/dashboard/success')}
                  className="px-6 py-3 rounded-xl bg-brand-blue text-brand-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wallet Info */}
        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-brand-blue" />
              <div>
                <div className="text-sm text-brand-gray">Executing Wallet</div>
                <div className="text-white font-mono">
                  {address ? `${address.slice(0,6)}...${address.slice(-4)}` : '---'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-brand-gray">INJ Balance</div>
              <div className="text-white font-mono">2.4567 INJ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
