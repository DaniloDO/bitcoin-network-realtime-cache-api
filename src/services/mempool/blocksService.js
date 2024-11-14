//BlocksService class to interact with the Mempool's API, and handle business logic.
class BlocksService {
    constructor(blocksRepository) {
        this.blocksRepository = blocksRepository;
    }

    // Fetch the past 15 blocks with fee and mining details 
    async getRecentBlocks() {
        try {
            const data = await this.blocksRepository.getRecentBlocks();
            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching recent blocks data');
            throw error; 
        }
    }

    // Fetch details about a block
    async getBlockDetails(blockHash) {
        try {
            const data = await this.blocksRepository.getBlockDetails(blockHash);
            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching block details data');
            throw error; 
        }
    }

   // Fetch the confirmation status of a block
    async getBlockStatus(blockHash) {
        try {
            const data = await this.blocksRepository.getBlockStatus(blockHash);
            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching block status data');
            throw error; 
        }
    }
}

export default BlocksService; 