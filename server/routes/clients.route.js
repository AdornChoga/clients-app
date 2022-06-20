import express from 'express';
import ClientsApi from '../controllers/clients.controller.js';

const router = express.Router();

router.get('/', ClientsApi.fetchClients);
router.get('/:id', ClientsApi.fetchClient);
router.post('/', ClientsApi.createClient);
router.patch('/:id', ClientsApi.updateClient);

export default router;
