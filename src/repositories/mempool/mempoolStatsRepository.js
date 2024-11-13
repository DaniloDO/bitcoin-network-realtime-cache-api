// MempoolStatsRepository class responsible of fetching mempool data from Mempool’s API
class MempoolStatsRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch current mempool backlog statistics
    async getMempoolStats() {
        try {
            const response = await this.mempoolClient.get('/mempool');
            return response.data; 
        }

        catch(error) {
            console.error('Error in mempoolStatsRepository fetching mempool data'); 
            throw error; 
        }
    }
}

export default MempoolStatsRepository; 