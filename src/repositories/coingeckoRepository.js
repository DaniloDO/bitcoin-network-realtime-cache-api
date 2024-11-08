
// CoingeckoRepository class responsible of fetching data from CoinGecko’s API
class CoinGeckoRepository {
    constructor(coinGeckoClient) {
        this.coinGeckoClient = coinGeckoClient.getClient();
    }

    // Fetch bitcoin price, market cap, and 24hr volume and changes
    async getBitcoinSimpleData() {
        try {
            const response = await this.coinGeckoClient.get('/simple/price', {
                params: {
                    ids: 'bitcoin',
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_vol: true,
                    include_24hr_change: true,
                    include_last_updated_at: true
                }
            });

            return response.data;
        }

        catch(error){
            console.error('Error in coingeckoRepository fetching simple data', error.message);
            throw error;
        }
    }

    // Fetch all available bitcoin data
    async getBitcoinDetailedData() {
        try {
            const response = await this.coinGeckoClient.get('/coins/bitcoin', {
                params: {
                    localization: true,
                    tickers: true,
                    market_data: true,
                    community_data: true,
                    developer_data: true,
                }
            });

            return response.data; 
        }

        catch(error) {
            console.error('Error in coingeckoRepository fetching detailed data', error.message);
            throw error;
        }
    }

    // Fetch bitcoin historical chart data 
    async getBitcoinHistoricalChartData(days = 30) {
        try {
            const response = await this.coinGeckoClient.get('/coins/bitcoin/market_chart', {
                params: {
                    vs_currency: 'usd',
                    days: days
                }
            });

            return response.data; 
        }

        catch(error) {
            console.error('Error in coingeckoRepository fetching historical chart data', error.message);
            throw error;
        }
    }
}

export default CoinGeckoRepository; 