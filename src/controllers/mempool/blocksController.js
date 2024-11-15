// BlocksController class to handle HTTP requests for the Mempool's API endpoints. 
class BlocksController {
    constructor(blocksService) {
        this.blocksService = blocksService; 
    }

    // Controller method to get recent blocks
    async getRecentBlocks(req, res) {
        try {
            const data =  await this.blocksService.getRecentBlocks();
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in blocksController handling recent blocks data', error.message);
            res.status(500).json({message: 'Unable to retrieve recent blocks data'});
        }
    }

    // Controller method to get blocks details
    async getBlockDetails(req, res) {
        const { blockHash } = req.params; 
 
        try {
            const data =  await this.blocksService.getBlockDetails(blockHash);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in blocksController handling block details data', error.message);
            res.status(500).json({message: 'Unable to retrieve blocks details data'});
        }        
    }

    // Controller method to get block status
    async getBlockStatus(req, res) {
        const { blockHash } = req.params; 
 
        try {
            const data =  await this.blocksService.getBlockStatus(blockHash);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in blocksController handling block status data', error.message);
            res.status(500).json({message: 'Unable to retrieve block status data'});
        }
    }
}

export default BlocksController; 