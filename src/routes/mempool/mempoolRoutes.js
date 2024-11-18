//import all necessary dependencies and routers
import express from "express";
import feesRouter from "./feesRoutes.js";
import blocksRouter from "./blocksRoutes.js";
import mempoolStatsRouter from "./mempoolStatsRoutes.js";
import transactionsRouter from "./transactionsRoutes.js";
import addressRouter from "./addressRoutes.js";
import networkRouter from "./networkRoutes.js";
import miningRouter from "./miningRoutes.js";

const mempoolRouter = express();

// All routes to get mempool data
mempoolRouter.use('/fees', feesRouter);
mempoolRouter.use('/blocks', blocksRouter);
mempoolRouter.use('/stats', mempoolStatsRouter);
mempoolRouter.use('/transaction', transactionsRouter);
mempoolRouter.use('/address', addressRouter); 
mempoolRouter.use('/network', networkRouter);
mempoolRouter.use('/mining', miningRouter);


export default mempoolRouter; 