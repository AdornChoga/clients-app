import Client from '../models/client';

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
      const newClient = Client.create(req.body);
      res.status(200).send(newClient);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}
