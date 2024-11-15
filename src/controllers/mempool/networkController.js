// NetworkController class to handle HTTP requests for the Mempool's API endpoints. 
class NetworkController {
    constructor(networkService) {
        this.networkService = networkService;
    }

    // Controller method to get difficulty-adjustment
    async getDifficultAdjustment(req, res) {
        try {
            const data =  await this.networkService.getDifficultAdjustment();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in networkController handling difficulty-adjustment data', error.message);
            res.status(500).json({message: 'Unable to retrieve difficulty-adjustment data'});
        }
    }

    // Controller method to get hashrate
    async getHashRate(req, res) {
        try {
            const data =  await this.networkService.getHashRate();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in networkController handling hashrate data', error.message);
            res.status(500).json({message: 'Unable to retrieve hashrate data'});
        }
    }
}

export default NetworkController; 