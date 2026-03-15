'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Play, Activity, BarChart2, ShieldAlert } from 'lucide-react';
import MarketsSection from '@/components/MarketsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WalletButton from '@/components/WalletButton';
import WalletConnectModal from '@/components/WalletConnectModal';
import NetworkStatus from '@/components/NetworkStatus';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';

export default function RevealEntryScreen() {
  const { isConnected, walletType, address, connect, disconnect } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const router = useRouter();

  const handleWalletConnect = (walletType: string, address: string) => {
    connect(walletType, address);
    // Auto-redirect to dashboard after connection
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-x-hidden bg-[#02040A] text-white font-sans selection:bg-brand-blue/30">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Navy / Black Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040A] via-[#050A15] to-[#02040A]" />
        
        {/* Subtle Electric Blue Atmospheric Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full opacity-50 mix-blend-screen" />
        
        {/* Abstract Orderbook Depth Glow (Green/Red hints) */}
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-brand-green/5 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-red/5 blur-[100px] rounded-full mix-blend-screen" />

        {/* Elegant Animated Liquidity Wave */}
        <svg className="absolute w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path
            d="M0,60 C20,50 40,70 60,50 C80,30 100,60 100,60 L100,100 L0,100 Z"
            fill="url(#wave-gradient)"
            animate={{
              d: [
                "M0,60 C20,50 40,70 60,50 C80,30 100,60 100,60 L100,100 L0,100 Z",
                "M0,60 C20,70 40,50 60,60 C80,50 100,40 100,60 L100,100 L0,100 Z",
                "M0,60 C20,50 40,70 60,50 C80,30 100,60 100,60 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft Market Structure Curves (Lines) */}
        <svg className="absolute w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path
            d="M0,40 C30,60 70,20 100,50"
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth="0.2"
            animate={{
              d: [
                "M0,40 C30,60 70,20 100,50",
                "M0,50 C40,30 60,70 100,40",
                "M0,40 C30,60 70,20 100,50"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,55 C40,35 60,75 100,45"
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth="0.1"
            animate={{
              d: [
                "M0,55 C40,35 60,75 100,45",
                "M0,45 C30,65 70,25 100,55",
                "M0,55 C40,35 60,75 100,45"
              ]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-20 w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-space font-bold tracking-[0.2em] text-white">LEVEL</div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-gray/80">
          <Link href="#markets" className="hover:text-white transition-colors scroll-smooth">Markets</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors scroll-smooth">How It Works</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <NetworkStatus />
        </div>
        <WalletButton
          isConnected={isConnected}
          walletType={walletType}
          address={address}
          onConnect={() => setIsWalletModalOpen(true)}
          onDisconnect={disconnect}
        />
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-space font-bold text-white tracking-[0.15em] leading-none mb-6 ml-[0.15em]">
            LEVEL
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white tracking-wide mb-4">
            Know the market before you enter on Injective Testnet
          </p>
          <p className="text-base md:text-lg text-brand-gray/70 font-light tracking-wide max-w-2xl mb-12">
            See what price does not explain before execution on Injective Testnet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-24"
        >
        <Link href={isConnected ? "/dashboard" : "#"} 
              onClick={(e) => {
                if (!isConnected) {
                  e.preventDefault();
                  setIsWalletModalOpen(true);
                }
              }}
              className="group relative px-10 py-4 bg-brand-blue text-brand-black font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] flex items-center justify-center gap-3 text-lg">
            <span className="relative z-10">{isConnected ? "Enter Dashboard" : "Enter Platform"}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
          
          <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/40 transition-colors flex items-center justify-center gap-3 text-lg">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </motion.div>

        {/* Lower Hero Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full pb-12"
        >
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-space font-medium text-white mb-2">Liquidity Strength</h3>
            <p className="text-sm text-brand-gray/70 font-light leading-relaxed">
              Measure nearby market absorption before entry
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-space font-medium text-white mb-2">Slippage Prediction</h3>
            <p className="text-sm text-brand-gray/70 font-light leading-relaxed">
              Estimate execution cost before order placement
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-space font-medium text-white mb-2">Execution Advice</h3>
            <p className="text-sm text-brand-gray/70 font-light leading-relaxed">
              Understand safer ways to enter
            </p>
          </div>
        </motion.div>
      </main>

      <MarketsSection />
      <HowItWorksSection />
      
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
}
