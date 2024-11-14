//NetworkService class to interact with the Mempool's API, and handle business logic.
class MiningService {
    constructor(miningRepository) {
        this.miningRepository = miningRepository; 
    }

    // Fetch a list of all known mining pools 
    async getAllMiningPools() {
        try {
            const data = await this.miningRepository.getAllMiningPools();
            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching all mining pools data'); 
            throw error; 
        }
    }

    // Fetch details of specific mining pool 
    async getMiningPool(slug) {
        try {
            const data = await this.miningRepository.getMiningPool(slug);
            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching mining pool data'); 
            throw error; 
        }   
    }

    // Fetch past 10 blocks mined by the specified mining pool 
    async getMiningPoolBlocks(slug) {
        try {
            const data = await this.miningRepository.getMiningPoolBlocks(slug);
            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching blocks mined from specific pool'); 
            throw error; 
        }     
    }
}

export default MiningService; 