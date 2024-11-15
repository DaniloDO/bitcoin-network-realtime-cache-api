// TransactionsController class to handle HTTP requests for the Mempool's API endpoints. 
class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }

    // Controller method to get specific transaction details
    async getTransactionById(req, res) {
        const { transactionId } = req.params; 

        try {
            const data = await this.transactionsService.getTransactionById(transactionId);
            res.status(200).json(data);
        }

        catch(error) {
            console.error('Error in transactionsController handling transaction data', error.message);
            res.status(500).json({message: 'Unable to retrieve transaction data'});
        }
    }
}

export default TransactionsController; 