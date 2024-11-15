// FeesController class to handle HTTP requests for the Mempool's API endpoints. 
class FeesController {
    constructor(feesService) {
        this.feesService = feesService; 
    }

    // Controller method to get blocks fees
    async getBlocksFees(req, res) {
        try {
            const data =  await this.feesService.getBlocksFees();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in feesController handling blocks fees data', error.message);
            res.status(500).json({message: 'Unable to retrieve blocks fees data'});
        }
    }

    // Controller method to get current suggested fees for new transactions
    async getRecommendedFees(req, res) {
        try {
            const data = await this.feesService.getRecommendedFees();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in feesController handling recommended fees data', error.message);
            res.status(500).json({message: 'Unable to retrieve recommended fees data'});
        }
    }
}

export default FeesController; 