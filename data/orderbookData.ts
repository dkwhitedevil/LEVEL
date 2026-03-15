export const orderbookSamples: Record<string, any> = {
  'INJ/USDT': {
    currentPrice: 27.42,
    spread: 0.04,
    spreadPercentage: 0.146,
    bids: [
      { price: 27.42, quantity: 420, total: 11516 },
      { price: 27.40, quantity: 380, total: 10412 },
      { price: 27.38, quantity: 350, total: 9583 },
      { price: 27.35, quantity: 290, total: 7931 },
      { price: 27.30, quantity: 260, total: 7098 }
    ],
    asks: [
      { price: 27.46, quantity: 310, total: 8512 },
      { price: 27.48, quantity: 340, total: 9343 },
      { price: 27.51, quantity: 370, total: 10178 },
      { price: 27.54, quantity: 420, total: 11566 },
      { price: 27.58, quantity: 500, total: 13790 }
    ]
  },

  'BTC/USDT': {
    currentPrice: 68240,
    spread: 12,
    spreadPercentage: 0.018,
    bids: [
      { price: 68240, quantity: 1.5, total: 102360 },
      { price: 68220, quantity: 1.8, total: 122796 }
    ],
    asks: [
      { price: 68252, quantity: 1.2, total: 81902 },
      { price: 68270, quantity: 1.4, total: 95578 }
    ]
  },

  'ETH/USDT': {
    currentPrice: 3564,
    spread: 3,
    spreadPercentage: 0.084,
    bids: [
      { price: 3564, quantity: 18, total: 64152 }
    ],
    asks: [
      { price: 3567, quantity: 15, total: 53505 }
    ]
  },

  'SOL/USDT': {
    currentPrice: 184.7,
    spread: 0.3,
    spreadPercentage: 0.162,
    bids: [
      { price: 184.7, quantity: 150, total: 27705 }
    ],
    asks: [
      { price: 185.0, quantity: 140, total: 25900 }
    ]
  },

  'ATOM/USDT': {
    currentPrice: 11.42,
    spread: 0.02,
    spreadPercentage: 0.175,
    bids: [
      { price: 11.42, quantity: 900, total: 10278 }
    ],
    asks: [
      { price: 11.44, quantity: 850, total: 9724 }
    ]
  },

  'BNB/USDT': {
    currentPrice: 612.8,
    spread: 1.2,
    spreadPercentage: 0.195,
    bids: [
      { price: 612.8, quantity: 35, total: 21448 }
    ],
    asks: [
      { price: 614.0, quantity: 30, total: 18420 }
    ]
  }
};
