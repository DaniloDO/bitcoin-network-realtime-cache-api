// AddressRepository class responsible of fetching address data from Mempool’s API
class AddressRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch details about a specific address
    async getAddress(address) {
        try {
            const response = await this.mempoolClient.get(`/address/${address}`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in addressRepository fetching address data'); 
            throw error; 
        }
    }

    // Fetch transaction history for the specified address (50 mempool transactions plus the first 25 confirmed transactions)
    async getAddressTransactions(address) {
        try {
            const response = await this.mempoolClient.get(`/address/${address}/txs`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in addressRepository fetching transactions data from address'); 
            throw error; 
        }
    }
}

export default AddressRepository; 