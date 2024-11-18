//import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import FeesRepository from "../../repositories/mempool/feesRepository.js";
import FeesService from "../../services/mempool/feesService.js";
import FeesController from "../../controllers/mempool/feesController.js";

const feesRouter = express.Router();

// Instantiate the repository, service and controller layer
const feesRepository = new FeesRepository(mempoolClient);
const feesService = new FeesService(feesRepository);
const feesController = new FeesController(feesService);

// Route to get blocks fees
feesRouter.get('/blocks-fees', (req, res) => feesController.getBlocksFees(req, res));

// Route to get current suggested fees for new transactions
feesRouter.get('/current-fees', (req, res) => feesController.getRecommendedFees(req, res));

export default feesRouter; 