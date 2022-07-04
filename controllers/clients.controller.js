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
  static async createClient(req, res) {
    try {
      const newClient = await Client.create(req.body);
      if (newClient) return res.status(201).send(newClient);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async updateClient(req, res) {
    try {
      await Client.updateOne({ _id: ObjectId(req.params.id) }, req.body);
      const updatedClient = await Client.findById(ObjectId(req.params.id));
      if (updatedClient) {
        return res.status(200).send({ client: updatedClient });
      }
      res
        .status(404)
        .send({ error: 'The client with the specified id could not be found' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async deleteClient(req, res) {
    try {
      const client = await Client.findByIdAndDelete(ObjectId(req.params.id));
      if (client) {
        return res
          .status(200)
          .send({ message: 'Client was deleted successfully' });
      }
      res
        .status(404)
        .send({ error: 'The client with the specified id could not be found' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}
