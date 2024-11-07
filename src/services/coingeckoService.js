
//CoingeckoService class to interact with the CoinGecko's API, and handle business logic.
class CoingeckoService {
    constructor(coingeckoRepository) {
        this.coingeckoRepository = coingeckoRepository;
    }

    // Fetch bitcoin price, market cap, and 24hr volume and changes
    async getBitcoinSimpleData() {
        try {
            const data = await this.coingeckoRepository.getBitcoinSimpleData();
            return data.bitcoin;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching simple-data', error.message);
            throw error; 
        }
    }

    // Fetch all available bitcoin data
    async getBitcoinDetailedData() {
        try {
            const data = await this.coingeckoRepository.getBitcoinDetailedData();
            return data;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching detailed-data', error.message);
            throw error; 
        }
    }

    // Fetch bitcoin historical chart data 
    async getBitcoinHistoricalChartData(days = 30){
        try {
            const data = await this.coingeckoRepository.getBitcoinHistoricalChartData(days);
            return data;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching historical-chart-data', error.message);
            throw error;          
        }
    }
}

export default CoingeckoService; 