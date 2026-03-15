# LEVEL - Pre-Trade Liquidity Intelligence Platform

LEVEL is a comprehensive pre-trade liquidity intelligence application built on Injective that analyzes native orderbook depth to estimate slippage, spread risk, and liquidity strength before execution. The platform provides real-time market analysis, AI-powered recommendations, and complete transaction management with MetaMask integration.

## 🚀 Features

### 📊 Market Intelligence
- **Real-time Orderbook Analysis**: Deep liquidity analysis across multiple trading pairs
- **Slippage Prediction**: Advanced algorithms to predict execution costs
- **Spread Risk Assessment**: Market condition monitoring and risk evaluation
- **Liquidity Strength Metrics**: Comprehensive liquidity scoring system

### 🤖 AI-Powered Recommendations
- **Smart Strategy Suggestions**: AI-driven trading recommendations
- **Multiple Execution Strategies**: Split trades, TWAP, limit orders, and more
- **Risk/Reward Analysis**: Detailed risk assessment for each recommendation
- **Confidence Scoring**: Probability-based success indicators

### 💰 Trading Execution
- **MetaMask Integration**: Seamless wallet connectivity and transaction signing
- **Injective Testnet Support**: Real blockchain transaction execution
- **Real-time Transaction Tracking**: Live status updates and confirmation
- **Transaction History**: Complete audit trail with advanced filtering

### 📈 Performance Analytics
- **Post-Trade Analysis**: Detailed execution outcome comparison
- **Predicted vs Actual**: Slippage and performance tracking
- **Historical Intelligence**: Learning from past executions
- **Comprehensive Reporting**: Export and analysis tools

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom brand colors
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Modern icon library
- **Recharts**: Interactive data visualization

### Blockchain Integration
- **MetaMask**: Web3 wallet provider
- **Injective Testnet**: EVM-compatible blockchain
- **ethers.js**: Ethereum interaction library
- **Real-time Events**: Transaction status monitoring

### Data Management
- **LocalStorage**: Client-side transaction persistence
- **Real-time Updates**: Event-driven state management
- **Advanced Filtering**: Multi-dimensional data filtering
- **Export Capabilities**: Data portability features

## 📱 Pages & Functionality

### Main Application Flow

#### 1. **Home Page** (`/`)
- Landing page with market overview
- Quick access to all trading functions
- Wallet connection status
- Recent activity summary

#### 2. **Main Dashboard** (`/dashboard`)
- Central trading hub with comprehensive overview
- Real-time market data and charts
- Liquidity depth visualization
- Performance metrics and KPIs
- Quick action navigation

#### 3. **Market Analysis** (`/dashboard/analysis`)
- Advanced charting and technical analysis
- Volume analysis and price trends
- Technical indicators and overlays
- Customizable timeframes

#### 4. **AI Recommendations** (`/dashboard/recommendations`)
- Personalized trading strategy suggestions
- Risk assessment and confidence scores
- Multiple recommendation types
- Historical performance tracking

#### 5. **Trading Alerts** (`/dashboard/alerts`)
- Price and volume alerts
- Market condition notifications
- Custom alert configuration
- Alert history and management

### Trading Execution Flow

#### 6. **Recommendation Detail** (`/dashboard/recommendation`)
- Detailed strategy breakdown
- Expected outcomes and risks
- Execution options and parameters
- Real-time market context

#### 7. **Payment/Transaction** (`/dashboard/payment`)
- MetaMask wallet integration
- Transaction confirmation modal
- Real Injective Testnet execution
- Fee display and confirmation
- **Transaction Details**: 0.002 INJ fee

#### 8. **Direct Execution** (`/dashboard/execute`)
- Parameter-based trade execution
- Real-time processing status
- Transaction hash tracking
- Auto-redirect to success page

#### 9. **Success Confirmation** (`/dashboard/success`)
- Transaction completion confirmation
- Transaction hash display
- Blockchain explorer integration
- Navigation to next steps

### Post-Trade Analysis

#### 10. **Execution Outcome** (`/dashboard/outcome`)
- Predicted vs actual slippage comparison
- Execution quality metrics
- Performance charts and insights
- Trading efficiency analysis

#### 11. **Transaction History** (`/dashboard/history`)
- Complete trading history with real-time updates
- **Advanced Filtering System**:
  - Pair filtering (INJ/USDT, BTC/USDT, ETH/USDT)
  - Time range filtering (24h, 7d, 30d, All time)
  - Recommendation type filtering (Execute Now, Split Trade, Wait, Limit Order, TWAP, Staggered)
  - Outcome quality filtering (Improved, Stable, Warning)
- **Real-time Updates**: New transactions appear instantly
- **Visual Indicators**: "NEW" badges for recent transactions
- **Comprehensive Demo Data**: 10+ sample transactions covering all filter types

### Supporting Pages

#### 12. **Wallet Connection** (`/connect`)
- Multi-wallet support interface
- Connection status management
- Account information display
- Network switching capabilities

#### 13. **API Integration** (`/api`)
- Backend services and data endpoints
- Real-time data fetching
- Transaction processing
- User authentication and data persistence

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- MetaMask browser extension
- Injective Testnet network configured in MetaMask

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd LEVEL
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
# Create environment file
cp .env.example .env.local

# Add required environment variables
NEXT_PUBLIC_INJECTIVE_RPC_URL=https://k8s.testnet.json-rpc.injective.network
NEXT_PUBLIC_INJECTIVE_EXPLORER_URL=https://testnet.blockscout.injective.network
```

4. **MetaMask Configuration**
- Install MetaMask browser extension
- Add Injective Testnet network:
  - Network Name: Injective Testnet
  - RPC URL: https://k8s.testnet.json-rpc.injective.network
  - Chain ID: 1439 (0x59f)
  - Currency Symbol: INJ

5. **Run Development Server**
```bash
npm run dev
# or
yarn dev
```

6. **Access Application**
- Open http://localhost:3000
- Connect your MetaMask wallet
- Switch to Injective Testnet network

## 📊 Key Features Deep Dive

### Real-Time Transaction System
- **Event-Driven Architecture**: Custom events for real-time updates
- **LocalStorage Persistence**: Transactions survive browser sessions
- **Cross-Tab Sync**: Updates work across multiple browser tabs
- **Instant History Updates**: New transactions appear immediately

### Advanced Filtering System
- **Multi-Dimensional Filtering**: Combine multiple filter criteria
- **Real-Time Results**: Instant filtering without page refresh
- **Comprehensive Coverage**: All transaction types and time periods
- **Smart Time Filtering**: Accurate timestamp-based filtering

### Smart Recommendation Engine
- **Market Condition Analysis**: Real-time orderbook depth analysis
- **Risk Assessment**: Multi-factor risk evaluation
- **Strategy Optimization**: AI-powered strategy selection
- **Performance Learning**: Improves recommendations based on history

### Transaction Management
- **Blockchain Integration**: Real Injective Testnet transactions
- **MetaMask Integration**: Seamless wallet connectivity
- **Transaction Tracking**: Real-time status monitoring
- **Explorer Integration**: Direct links to blockchain explorer

## 🎯 Usage Guide

### Basic Trading Flow
1. **Connect Wallet**: Connect MetaMask and select Injective Testnet
2. **Market Analysis**: Review market conditions and liquidity
3. **Get Recommendations**: View AI-powered trading suggestions
4. **Execute Trade**: Confirm and execute transaction via MetaMask
5. **Track Results**: Monitor execution outcomes and performance

### Advanced Features
- **Set Alerts**: Configure price and volume notifications
- **Analyze History**: Use advanced filters to review past trades
- **Performance Tracking**: Compare predicted vs actual outcomes
- **Export Data**: Download transaction history for analysis

## 🔧 Technical Details

### Smart Contract Integration
- **Chain ID**: 0x59f (1439 decimal)
- **Transaction Fee**: 0.002 INJ
- **Gas Limit**: 21000
- **RPC Endpoint**: Injective Testnet

### Data Storage
- **Transaction History**: LocalStorage with JSON serialization
- **Real-time Events**: Custom event system for updates
- **Filter State**: React state management with persistence
- **Market Data**: Real-time API integration

### Security Features
- **MetaMask Integration**: Secure wallet connectivity
- **Transaction Signing**: User confirmation required
- **Network Validation**: Automatic network switching
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

### Environment Variables
```bash
NEXT_PUBLIC_INJECTIVE_RPC_URL=https://k8s.testnet.json-rpc.injective.network
NEXT_PUBLIC_INJECTIVE_EXPLORER_URL=https://testnet.blockscout.injective.network
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (recommended)
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- **Injective Testnet Explorer**: https://testnet.blockscout.injective.network
- **Injective Documentation**: https://docs.injective.network
- **MetaMask**: https://metamask.io
- **Next.js Documentation**: https://nextjs.org/docs

## 📞 Support & Community

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common solutions
- Join our community discussions

---

**Built with ❤️ for the Injective ecosystem**
