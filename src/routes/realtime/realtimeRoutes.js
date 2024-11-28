// import all necessary dependencies and layers
import express from "express" ;
import websocketClient from "../../config/websocketClient.js";
import WebsocketRepository from "../../repositories/realtime/websocketRepository.js";
import WebsocketService from "../../services/realtime/websocketService.js";
import WebsocketController from "../../controllers/realtime/websocketController.js";

const realtimeRouter = express.Router(); 

// Instantiate the repository, service and controller layer
const websocketRepository = new WebsocketRepository(websocketClient);
const websocketService = new WebsocketService(websocketRepository);
const websocketController = new WebsocketController(websocketService); 

// Route to get all data from the WebSocket
realtimeRouter.get('/', (req, res) => websocketController.getLatestData(req, res));

// Route to display available data from the WebSocket
realtimeRouter.get('/available-data', (req, res) => websocketController.AvailableData(req, res));  

// Route to get specific requested data
realtimeRouter.get('/:type', (req, res) => websocketController.getDataType(req, res));  

export default realtimeRouter; 