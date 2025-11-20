interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const getTopCoins = async (): Promise<CoinData[]> => {
  try {
    // Fetching top coins in EUR
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin,ethereum,matic-network,solana,usd-coin,tether&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Validation: Ensure we actually have an array
    if (!Array.isArray(data)) {
        return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching CoinGecko data:", error);
    // Fallback data if API limit is reached
    return [
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: '', current_price: 58420, price_change_percentage_24h: 2.4 },
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: '', current_price: 2450, price_change_percentage_24h: -1.2 },
      { id: 'solana', symbol: 'sol', name: 'Solana', image: '', current_price: 132.50, price_change_percentage_24h: 5.6 },
      { id: 'matic-network', symbol: 'matic', name: 'Polygon', image: '', current_price: 0.65, price_change_percentage_24h: 0.8 },
      { id: 'usd-coin', symbol: 'usdc', name: 'USDC', image: '', current_price: 0.92, price_change_percentage_24h: 0.01 },
    ];
  }
};