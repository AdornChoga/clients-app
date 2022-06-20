import { ObjectId } from 'bson';
import Client from '../models/client.js';

export default class ClientsApi {
  static async fetchClients(req, res) {
    try {
      const clients = await Client.find({});
      res.status(200).send(clients);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async fetchClient(req, res) {
    try {
      const client = await Client.findById(ObjectId(req.params.id));
      if (client) return res.status(200).send(client);
      res.status(404).send({ error: 'Client with provided id not found.' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async createClient(req, res) {
    try {
      const newClient = await Client.create(req.body);
      if (newClient)
        return res.status(200).send({ message: 'Client created successfully' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async updateClient(req, res) {
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        ObjectId(req.params.id),
        req.body,
      );
      if (updatedClient)
        return res.status(200).send({ message: 'Client updated successfully' });
      res.status(404).send({ message: 'Client with provided id not found' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}
