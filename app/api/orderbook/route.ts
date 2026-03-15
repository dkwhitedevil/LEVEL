import { NextResponse } from 'next/server';

const API_BASE = 'https://api.injective.exchange/api/exchange/v1';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const marketId = searchParams.get('marketId');

  if (!marketId) {
    return NextResponse.json({ error: 'Missing marketId' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_BASE}/spot/orderbook?market_id=${marketId}` 
    );

    const json = await res.json();

    console.log('Injective API Response:', json);

    return NextResponse.json(json);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orderbook' },
      { status: 500 }
    );
  }
}
