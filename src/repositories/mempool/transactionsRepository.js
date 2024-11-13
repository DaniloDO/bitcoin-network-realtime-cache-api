// TransactionsRepository class responsible of fetching transactions data from Mempool’s API
class TransactionsRepository {
    constructor(mempoolClient) {
        this.mempoolClient = mempoolClient.getClient();
    }

    // Fetch details about a specific transaction
    async getTransactionById(transactionId) {
        try {
            const response = await this.mempoolClient.get(`/tx/${transactionId}`);
            return response.data; 
        }

        catch(error) {
            console.error('Error in transactionsRepository fetching transaction data'); 
            throw error; 
        }
    }
}

export default TransactionsRepository; 