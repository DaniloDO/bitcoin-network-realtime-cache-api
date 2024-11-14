//MempoolStatsService class to interact with the Mempool's API, and handle business logic.
class MempoolStatsService {
    constructor(mempoolRepository) {
        this.mempoolRepository = mempoolRepository;
    }

    // Fetch current mempool backlog statistics.
    async getMempoolStats() {
        try {
            const data = await this.mempoolRepository.getMempoolStats();
            return data; 
        }

        catch(error) {
            console.error('Error in mempoolStatsRepository fetching mempool data'); 
            throw error; 
        }
    }
}

export default MempoolStatsService; 