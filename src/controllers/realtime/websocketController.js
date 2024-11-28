// WebsocketController class to handle HTTP requests for the Mempool's WebSocket 
class WebsocketController {
    constructor(websocketService) {
        this.websocketService = websocketService; 
    }

    // Controller method to show available data from WebSocket connection
    AvailableData(req, res) {
        try {
            const data = this.websocketService.AvailableData(); 
            res.status(200).json({ data });
        }

        catch(error) {
            console.error('Error in websocketController handling available data', error.message);
            res.status(500).json({message: 'Unable to retrieve available data'});
        }
    }

    // Controller method to get specific requested data
    async getDataType(req, res) {
        const { type } = req.params; 

        try {
            const data = await this.websocketService.getDataType(type); 
            res.status(200).json({ data });
        }

        catch(error) {
            console.error(`Error in websocketController handling ${type} data`, error.message);
            res.status(500).json({message: `Unable to retrieve ${type} data`});
        }
    }

    // Controller method to get all available data from the WebSocket
    getLatestData(req, res) {
        try {
            const data = this.websocketService.getLatestData(); 
            res.status(200).json({ data });
        }

        catch(error) {
            console.error('Error in websocketController handling data', error.message);
            res.status(500).json({message: 'Unable to retrieve data'});
        }
    }
}

export default WebsocketController; 