// FeesRepository class responsible of fetching fees data from Mempool’s API
class FeesRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch blocks fees
    async getBlocksFees() {
        try {
            const response = await this.mempoolClient.get('v1/fees/mempool-blocks');
            return response.data;
        }

        catch(error) {
            console.error('Error in fessRepository fetching blocks fees data');
            throw error; 
        }
    }

    // Fetch current suggested fees for new transactions
    async getRecommendedFees() {
        try {
            const response = await this.mempoolClient.get('/v1/fees/recommended');
            return response.data; 
        }

        catch(error) {
            console.error('Error in feesRepository fetching recommended fees data');
            throw error; 
        }
    }
} 

export default FeesRepository; 