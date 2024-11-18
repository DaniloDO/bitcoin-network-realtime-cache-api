//import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import AddressRepository from "../../repositories/mempool/addressRepository.js";
import AddressService from "../../services/mempool/addressService.js";
import AddressController from "../../controllers/mempool/addressController.js";

const addressRouter = express.Router();

// Instantiate the repository, service and controller layer
const addressRepository = new AddressRepository(mempoolClient);
const addressService = new AddressService(addressRepository);
const addressController = new AddressController(addressService);

// Route to get address data
addressRouter.get('/:address', (req, res) => addressController.getAddress(req, res));

// Route to get transactions from address
addressRouter.get('/:address/tx', (req, res) => addressController.getAddressTransactions(req, res));

export default addressRouter; 