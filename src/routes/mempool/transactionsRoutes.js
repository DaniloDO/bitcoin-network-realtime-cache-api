// import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import TransactionsRepository from "../../repositories/mempool/transactionsRepository.js";
import TransactionsService from "../../services/mempool/transactionsService.js";
import TransactionsController from "../../controllers/mempool/transactionsController.js"

const transactionsRouter = express.Router();

const transactionsRepository = new TransactionsRepository(mempoolClient);
const transactionsService = new TransactionsService(transactionsRepository);
const transactionsController = new TransactionsController(transactionsService);

transactionsRouter.get('/:transactionId', (req, res) => transactionsController.getTransactionById(req, res));

export default transactionsRouter; 