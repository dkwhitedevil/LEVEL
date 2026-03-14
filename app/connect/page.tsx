'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Wallet, CheckCircle2, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ConnectWalletScreen() {
  const router = useRouter();

  const handleConnect = (wallet: string) => {
    // Simulate connection delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="p-8 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-2 text-brand-gray hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="text-xl font-space font-bold tracking-widest text-white">LEVEL</div>
        <div className="w-16" /> {/* Spacer */}
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Column: Wallet Connection */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-space font-bold mb-2">Connect Wallet</h2>
            <p className="text-brand-gray mb-8 font-light">
              Securely authenticate to access pre-trade liquidity intelligence on Injective.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleConnect('keplr')}
                className="w-full p-6 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-surface-hover hover:border-brand-blue/30 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Keplr Wallet</div>
                    <div className="text-sm text-brand-gray">Connect using Keplr extension</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-gray group-hover:text-brand-blue transition-colors" />
              </button>

              <button
                onClick={() => handleConnect('leap')}
                className="w-full p-6 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-surface-hover hover:border-[#2AC16E]/30 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2AC16E]/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-[#2AC16E]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Leap Wallet</div>
                    <div className="text-sm text-brand-gray">Connect using Leap extension</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-gray group-hover:text-[#2AC16E] transition-colors" />
              </button>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-brand-blue/5 border border-brand-blue/20 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <div className="text-sm text-brand-gray">
                <span className="text-white font-medium">Injective Network Connected.</span>
                <br />
                Latency: 12ms. Block height: 84,291,004.
              </div>
            </div>
          </div>

          {/* Right Column: Market Preview */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono text-brand-gray uppercase tracking-wider">Live Markets</h3>
              <div className="flex items-center gap-2 text-xs text-brand-green">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Real-time
              </div>
            </div>

            <div className="space-y-3">
              {[
                { pair: 'INJ/USDT', price: '34.21', change: '+2.4%', vol: '12.4M', trend: 'up' },
                { pair: 'BTC/USDT', price: '64,102.50', change: '-0.8%', vol: '450.2M', trend: 'down' },
                { pair: 'ETH/USDT', price: '3,412.80', change: '+1.1%', vol: '210.5M', trend: 'up' },
              ].map((market, i) => (
                <div key={i} className="p-5 rounded-xl border border-brand-border bg-brand-surface flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-navy-light flex items-center justify-center border border-white/5">
                      <Activity className="w-5 h-5 text-brand-gray" />
                    </div>
                    <div>
                      <div className="font-space font-bold">{market.pair}</div>
                      <div className="text-xs text-brand-gray font-mono">Vol: {market.vol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium">${market.price}</div>
                    <div className={`text-xs font-mono ${market.trend === 'up' ? 'text-brand-green' : 'text-brand-red'}`}>
                      {market.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-brand-gray font-light">
                By connecting a wallet, you agree to LEVEL&apos;s Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
