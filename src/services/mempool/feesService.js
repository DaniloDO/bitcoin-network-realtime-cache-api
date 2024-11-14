//FeesService class to interact with the Mempool's API, and handle business logic.
class FeesService {
    constructor(feesRepository) {
        this.feesRepository = feesRepository;
    }

    // Fetch blocks fees
    async getBlocksFees() {
        try {
            const data = await this.feesRepository.getBlocksFees();
            return data; 
        }

        catch(error) {
            console.error('Error in fessService fetching blocks fees data');
            throw error; 
        }
    }
    
    // Fetch current suggested fees for new transactions
    async getRecommendedFees() {
        try {
            const data = await this.feesRepository.getRecommendedFees();
            return data; 
        }

        catch(error) {
            console.error('Error in feesService fetching recommended fees data');
            throw error; 
        }
    }
}

export default FeesService;