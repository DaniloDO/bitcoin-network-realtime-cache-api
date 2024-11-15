// AddressController class to handle HTTP requests for the Mempool's API endpoints. 
class AddressController {
    constructor(addressService) {
        this.addressService = addressService; 
    }

    // Controller method to get details from address
    async getAddress(req, res) {
        const { address } = req.params;

        try {
            const data =  await this.addressService.getAddress(address);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in addressController handling address data', error.message);
            res.status(500).json({message: 'Unable to retrieve address data'});
        }
    }

    // Controller method to get transactions from address
    async getAddressTransactions(req, res) {
        const { address } = req.params;

        try {
            const data =  await this.addressService.getAddressTransactions(address);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in addressController handling transactions data from address', error.message);
            res.status(500).json({message: 'Unable to retrieve transactions data from address'});
        }
    }
}

export default AddressController; 