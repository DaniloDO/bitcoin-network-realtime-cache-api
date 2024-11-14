//NetworkService class to interact with the Mempool's API, and handle business logic.
class NetworkService {
    constructor(networkRepository) {
        this.networkRepository = networkRepository; 
    }

    //Fetch details of difficulty-adjustment (Block timestamp, Block height, Difficulty, Difficulty change)
    async getDifficultAdjustment() {
        try {
            const data = await this.networkRepository.getDifficultAdjustment();
            return data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching difficulty-adjustment data'); 
            throw error; 
        }
    }

    //Fetch details of hashrate
    async getHashRate() {
        try {
            const data = await this.networkRepository.getHashRate();
            return data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching hashrate data'); 
            throw error; 
        }       
    }
}

export default NetworkService; 