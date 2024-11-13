
class MiningRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch a list of all known mining pools 
    async getAllMiningPools() {
        try {
            const response = await this.mempoolClient.get('/v1/mining/pools/1w');
            return response.data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching all mining pools data'); 
            throw error; 
        }
    }

    // Fetch details of specific mining pool 
    async getMiningPool(slug) {
        try {
            const response = await this.mempoolClient.get(`/v1/mining/pool/${slug}`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching mining pool data'); 
            throw error; 
        }
    }

    // Fetch past 10 blocks mined by the specified mining pool 
    async getMiningPoolBlocks(slug) {
        try {
            const response = await this.mempoolClient.get(`/v1/mining/pool/${slug}/blocks`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching blocks mined from specific pool'); 
            throw error; 
        }
    }
}

export default MiningRepository; 