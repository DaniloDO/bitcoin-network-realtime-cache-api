// MempoolStatsController class to handle HTTP requests for the Mempool's API endpoints. 
class MempoolStatsController {
    constructor(mempoolStatsService) {
        this.mempoolStatsService = mempoolStatsService;
    }

    // Controller method to get mempool data
    async getMempoolStats(req, res) {
        try {
            const data = await this.mempoolStatsService.getMempoolStats();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in mempoolStatsController handling mempool data', error.message);
            res.status(500).json({message: 'Unable to retrieve mempool data'});
        }
    }
}

export default MempoolStatsController; 