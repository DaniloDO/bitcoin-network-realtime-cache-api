// CoingeckoController class to handle HTTP requests for the CoinGecko's API endpoints. 
class CoingeckoController {
    constructor(coingeckoService) {
        this.coingeckoService = coingeckoService;
    }

    // Controller method to get bitcoin price
    async getBitcoinSimpleData(req, res) {
        try {
            const data = await this.coingeckoService.getBitcoinSimpleData();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in coingeckoController handling simple data', error.message);
            res.status(500).json({message: 'Unable to retrieve bitcoin simple data'});
        }
    }

    // Controller method to get bitcoin market data
    async getBitcoinDetailedData(req, res) {
        try {
            const data = await this.coingeckoService.getBitcoinDetailedData();
            res.status(200).json({data});
        }

        catch(error) {
            console.error('Error in coingeckoController handling detailed data', error.message);
            res.status(500).json({message: 'Unable to retrieve bitcoin detailed data'});
        }
    }

    // Controller method to get bitcoin historical chart data
    async getBitcoinHistoricalChartData(req, res) {
        const { days } = req.query;

        try {
            const data = await this.coingeckoService.getBitcoinHistoricalChartData(days);
            res.status(500).json({data});
        }

        catch(error) {
            console.error('Error in coingeckoController handling historical chart data', error.message);
            res.status(500).json({message: 'Unable to retrieve bitcoin historical chart data'});        
        }
    }
}

export default CoingeckoController; 