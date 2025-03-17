const getTokenInformation = async (symbol: string): Promise<{ symbol: string; price: number; priceChangePercent: number; quoteVolume: number; upOrDown: string; }> => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/get-token-information?${symbol ? `symbol=${symbol.toUpperCase()}USDT` : ''}`);
    const data = await response.json();
    data.price = parseFloat(data.price).toFixed(6);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get token information');
  }
};

export { getTokenInformation };
