// MiningController class to handle HTTP requests for the Mempool's API endpoints. 
class MiningController {
    constructor(miningService) {
        this.miningService = miningService;
    }

    // Controller method to get all mining pools
    async getAllMiningPools(req, res) {
        try {
            const data =  await this.miningService.getAllMiningPools();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in miningController handling all mining pools data', error.message);
            res.status(500).json({message: 'Unable to retrieve all mining pools data'});
        }
    }

    // Controller method to get details of specific mining pool 
    async getMiningPool(req, res) {
        const { slug } = req.params; 

        try {
            const data =  await this.miningService.getMiningPool(slug);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in miningController handling mining pool data', error.message);
            res.status(500).json({message: 'Unable to retrieve mining pool data'});
        }
    }

    // Controller method to get past 10 blocks mined by the specified mining pool 
    async getMiningPoolBlocks(req, res) {
        const { slug } = req.params; 

        try {
            const data =  await this.miningService.getMiningPoolBlocks(slug);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in miningController handling blocks mined from specific pool', error.message);
            res.status(500).json({message: 'Unable to retrieve blocks mined from specific pool'});
        }
    }
}

export default MiningController; 