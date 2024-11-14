//AddressService class to interact with the Mempool's API, and handle business logic.
class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository; 
    }

    // Fetch details about a specific address
    async getAddress(address) {
        try {
            const data = await this.addressRepository.getAddress(address);
            return data; 
        }

        catch(error) {
            console.error('Error in addressService fetching address data');
            throw error; 
        }
    }

    // Fetch transaction history for the specified address (50 mempool transactions plus the first 25 confirmed transactions)
    async getAddressTransactions(address) {
        try {
            const data = await this.addressRepository.getAddressTransactions(address);
            return data; 
        }

        catch(error) {
            console.error('Error in addressService fetching transactions data from address');
            throw error; 
        }     
    }
}

export default AddressService; 