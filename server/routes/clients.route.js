import express from 'express';
import ClientsApi from '../controllers/clients.controller';

const router = express.Router();

router.get('/', ClientsApi.fetchClients());
router.post('/', ClientsApi.createClient());

export default router;
