// BlockRepository class responsible of fetching fees data from Mempool’s API
class BlocksRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch the past 15 blocks with fee and mining details 
    async getRecentBlocks() {
        try {
            const response = await this.mempoolClient.get('/v1/blocks');
            return response.data; 
        }

        catch(error) {
            console.error('Error in blocksRepository fetching recent blocks data'); 
            throw error; 
        }
    }

    // Fetch details about a block
    async getBlockDetails(blockHash) {
        try {
            const response = await this.mempoolClient.get(`/block/${blockHash}`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in blocksRepository fetching block details data');
            throw error; 
        }
    }

   // Fetch the confirmation status of a block
    async getBlockStatus(blockHash) {
        try {
            const response = await this.mempoolClient.get(`/block/${blockHash}/status`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in blocksRepository fetching block status data');
            throw error; 
        }
    }
}

export default BlocksRepository; 