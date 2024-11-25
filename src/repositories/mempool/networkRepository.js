// NetworkRepository class responsible of fetching network data from Mempool’s API
class NetworkRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch details of difficulty-adjustment (Block timestamp, Block height, Difficulty, Difficulty change)
    async getDifficultAdjustment() {
        try {
            const response = await this.mempoolClient.get('v1/mining/difficulty-adjustments/1m');
            return response.data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching difficulty-adjustment data'); 
            throw error; 
        }
    }

    // Fetch details of hashrate
    async getHashRate() {
        try {
            const response = await this.mempoolClient.get('v1/mining/hashrate/3d');
            return response.data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching hashrate data'); 
            throw error; 
        }
    }
}

export default NetworkRepository; 