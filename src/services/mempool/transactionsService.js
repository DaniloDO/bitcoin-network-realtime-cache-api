//TransactionsService class to interact with the Mempool's API, and handle business logic.
class TransactionsService {
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository; 
    }

    // Fetch current mempool backlog statistics.
    async getTransactionById(transactionId) {
        try {
            const data = await this.transactionsRepository.getTransactionById(transactionId);
            return data; 
        }

        catch(error) {
            console.error('Error in transactionsService fetching transaction data'); 
            throw error; 
        }
    }
}

export default TransactionsService; 