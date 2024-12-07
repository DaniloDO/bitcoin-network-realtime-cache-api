# Bitcoin Network Realtime Cache API

The **Bitcoin Network Realtime Cache API** provides high-performance, real-time data from **CoinGecko’s market data API** and **Mempool’s Bitcoin network API**. With **Redis caching** to boost response times and ensure data consistency, the app delivers fast access to both market data and real-time network information through **WebSocket streaming**.

Built with a **modular architecture**, the app offers **vast individual routes** for each functionality, making it easy to extend and maintain. Featuring **MongoDB** for secure user authentication, **JWT-based credentials** for access control, and **encryption** for sensitive data, it ensures robust security. Additionally, **subscription-based feature access** allows users to personalize their data experience.

## Features

- Real-time Bitcoin network data from **Mempool** and **CoinGecko** APIs.
- **Redis caching** for fast response times and data consistency.
- **WebSocket streaming** for real-time updates.
- **MongoDB** for secure user authentication and data persistence.
- **JWT authentication** for secure access control.
- **Subscription-based access** to features for users.
- **Modular architecture** with independent routes for each feature.
- **Encryption** for secure storage and transmission of sensitive data.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (>=16.x)
- **MongoDB** (local or remote instance)
- **Redis** (local or remote instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bitcoin-network-realtime-cache-api.git

2. Navigate to the project directory:
   ```bash
   cd bitcoin-network-realtime-cache-api
   
3. Install dependencies:
   ```bash
   npm install

4. Create a `.env` file and configure the necessary environment variables:

   The application requires the following environment variables:

   ```plaintext
   PORT=your_preferred_port
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=redis://127.0.0.1:6379
   JWT_SECRET=your_jwt_secret_key
   COINGECKO_API_URL=https://api.coingecko.com/api/v3
   MEMPOOL_API_URL=https://mempool.space/api
   MEMPOOL_WEBSOCKET_URL=wss://mempool.space/api/v1/ws
   
5. Start the application:

   Use the following command to run the app in development mode:

   ```bash
   npm run dev

## API Endpoints

### CoinGecko API Routes

| **Route**                | **Method** | **Description**                                                     |
|--------------------------|------------|---------------------------------------------------------------------|
| `/api/coingecko/simple-data`           | GET        | Retrieve bitcoin price, and general market data.           |
| `/api/coingecko//detailed-data`        | GET        | Retrieve all available bitcoin data.                       |
| `/api/coingecko/historical-chart-data` | GET        | Retrieve bitcoin historical chart data.                    |

#### Coingecko Request & Response Examples

GET /simple-data

Example: http://localhost:3000/api/coingecko/simple-data

Response body:
```
{
    "bitcoin": {
        "usd": 95762,
        "usd_market_cap": 1894933171851.5771,
        "usd_24h_vol": 72577902328.1925,
        "usd_24h_change": -1.4798130904104032,
        "last_updated_at": 1733146977
    }
}
```


### Mempool API Routes

| **Route**                | **Method** | **Description**                                                     |
|--------------------------|------------|---------------------------------------------------------------------|
| `/api/mempool/blocks/recent-blocks`             | GET        | Retrieve the past 15 blocks with fee and mining details.|
| `/api/mempool/blocks/block-details/:blockHash`  | GET        | Retrieve details about a specific block.          |
| `/api/mempool/fees/blocks-fees`                 | GET        | Retrieve blocks fees                              |
| `/api/mempool/fees/current-fees`                | GET        | Retrieve current suggested fees for new transactions.|
| `/api/mempool/stats`                            | GET        | Retrieve current mempool backlog statistics.      |
| `/api/mempool/transaction/:transactionId`       | GET        | Retrieve details about a specific transaction.    |
| `/api/mempool/address/:address`                 | GET        | Retrieve details about a specific address.        |
| `/api/mempool/address/:address/tx'`             | GET        | Retrieve transaction history for the specified address.|
| `/api/mempool/network/difficulty-adjustment`    | GET        | Retrieve details of difficulty-adjustment.        |
| `/api/mempool/network/hashratet`                | GET        | Retrieve details of hashrate.                     |
| `/api/mempool/mining/pools`                     | GET        | Retrieve a list of all known mining pools.        |
| `/api/mempool/mining/pool/pool/:slug`           | GET        | Retrieve details of specific mining pool.         |
| `/api/mempool/mining/pool-blocks/:slug`         | GET        | Retrieve past 10 blocks mined by the specified mining pool.|

#### Mempool Request & Response Examples

GET /fees/current-fees

Example: http://localhost:3000/api/mempool/fees/current-fees

Response body:
```
{
    "fastestFee": 7,
    "halfHourFee": 7,
    "hourFee": 7,
    "economyFee": 2,
    "minimumFee": 1
}
```

GET /blocks/block-details/[blockHash]

Example: http://localhost:3000/api/mempool/blocks/block-details/000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce

Response body:
```
{
    "id": "000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce",
    "height": 363366,
    "version": 2,
    "timestamp": 1435766771,
    "tx_count": 494,
    "size": 286494,
    "weight": 1145976,
    "merkle_root": "9d3cb87bf05ebae366b4262ed5f768ce8c62fc385c3886c9cb097647b04b686c",
    "previousblockhash": "000000000000000010c545b6fa3ef1f7cf45a2a8760b1ee9f2e89673218207ce",
    "mediantime": 1435763435,
    "nonce": 2892644888,
    "bits": 404111758,
    "difficulty": 49402014931.22746
}
```

GET /mining/pools

Example: http://localhost:3000/api/mempool/mining/pools

Response body:
```
{
    "pools": [
        {
            "poolId": 112,
            "name": "Foundry USA",
            "link": "https://foundrydigital.com",
            "blockCount": 320,
            "rank": 1,
            "emptyBlocks": 0,
            "slug": "foundryusa",
            "avgMatchRate": 99.65,
            "avgFeeDelta": "-0.02673594",
            "poolUniqueId": 111
        },
        {
            "poolId": 45,
            "name": "AntPool",
            "link": "https://www.antpool.com",
            "blockCount": 196,
            "rank": 2,
            "emptyBlocks": 0,
            "slug": "antpool",
            "avgMatchRate": 99.73,
            "avgFeeDelta": "-0.02532653",
            "poolUniqueId": 44
        },
        {
            "poolId": 74,
            "name": "ViaBTC",
            "link": "https://viabtc.com",
            "blockCount": 152,
            "rank": 3,
            "emptyBlocks": 0,
            "slug": "viabtc",
            "avgMatchRate": 99.5,
            "avgFeeDelta": "-0.02193421",
            "poolUniqueId": 73
        },
    ],
    "blockCount": 994,
    "lastEstimatedHashrate": 702775219816899700000,
    "lastEstimatedHashrate3d": 747697862909398000000,
    "lastEstimatedHashrate1w": 723446208219639600000
}
```


### Realtime API Routes

| **Route**                | **Method** | **Description**                                                     |
|--------------------------|------------|---------------------------------------------------------------------|
| `/api/realtime`                        | GET        | Retrieve real-time data from WebSocket connection.         |
| `/api/realtime/available-data`         | GET        | Retrieve details of all available data from the WebSocket. |
| `/api/realtime/:type`                  | GET        | Retrieve specific requested data.                          |

#### Realtime Request & Response Examples

GET /available-data

Example: http://localhost:3000/api/realtime/available-data

Response body:
```
{
    "data": {
        "available": [
            "mempoolInfo",
            "vBytesPerSecond",
            "transactions",
            "da",
            "fees",
            "mempool-blocks",
            "block",
            "live-2h-chart",
            "loadingIndicators",
            "conversion"
        ]
    }
}
```

### User API Routes

| **Route**                | **Method** | **Description**                                                     |
|--------------------------|------------|---------------------------------------------------------------------|
| `/api/user/create-user`                         | POST       | Register a new user.                         |
| `/api/user/user-id/:userId`                     | GET        | Retrieve data from user through id.               |
| `/api/user/user-email/:userEmail`               | GET        | Retrieve data from user through email                              |
| `/api/user/update-user/`                        | PUT        | Updates data from user through id.           |
| `/api/user/delete-user/`                        | DELETE     | Eliminates data from user through id.           |
| `/api/user/login`                               | GET        | Login user.                                  |
| `/api/user/logout`                              | GET        | Logout user.                                 |



## Technologies Used

- **Node.js**: *Runtime environment for executing JavaScript code server-side.*
- **Express**: *Web framework for building the API and routing.*
- **MongoDB**: *NoSQL database used for storing user data and other application-related data.*
- **Mongoose**: *ODM for MongoDB to interact with the database.*
- **Redis**: *In-memory data structure store used for caching real-time data to improve performance.*
- **JWT (JSON Web Tokens)**: *Used for secure user authentication.*
- **bcrypt**: *Library for hashing passwords and enhancing security.*
- **Axios**: *Used for making HTTP requests to external APIs (e.g., CoinGecko).*
- **ws**: *WebSocket library used for real-time data streaming.*
- **Validator**: *Library used for data validation in the app.*
- **dotenv**: *Loads environment variables from a `.env` file for secure configuration management.*


## Architecture

The app follows a **modular architecture**, ensuring scalability and maintainability by separating different features into distinct modules. Each module has its own set of routes, controllers, services, and repositories, promoting a clean separation of concerns.

- **Controller Layer**: Handles the incoming HTTP requests and sends appropriate responses.
- **Service Layer**: Contains the business logic and interacts with the repository layer to retrieve or manipulate data.
- **Repository Layer**: Abstracts the data access logic, interfacing with MongoDB, Redis, and external APIs.
- **Middleware**: Ensures that each request is authenticated, authorized, and has the necessary permissions to access specific features.
- **WebSocket Integration**: Provides real-time data updates through WebSocket, stored in Redis for optimized performance and consistency.

This structure allows for modular development, easier testing, and the ability to extend or modify individual features without affecting other parts of the app.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.