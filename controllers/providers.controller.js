import { ObjectId } from 'bson';
import Provider from '../models/provider.js';
import Client from '../models/client.js';

export default class ProvidersApi {
  static async fetchProviders(req, res) {
    try {
      const providers = await Provider.find({});
      res.status(200).send(providers);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async createProvider(req, res) {
    try {
      const newProvider = await Provider.create(req.body);
      if (newProvider) return res.status(200).send(newProvider);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async updateProvider(req, res) {
    try {
      await Provider.updateOne({ _id: ObjectId(req.params.id) }, req.body);
      const updatedProvider = await Provider.findById(ObjectId(req.params.id));
      if (updatedProvider) {
        return res.status(200).send(updatedProvider);
      }
      res
        .status(404)
        .send({
          error: 'The provider with the specified id could not be found',
        });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  static async deleteProvider(req, res) {
    try {
      const provider = await Provider.findByIdAndDelete(
        ObjectId(req.params.id),
      );
      await Client.updateMany(
        { providers: { _id: req.params.id } },
        { $pull: { providers: { _id: req.params.id } } },
      );
      if (provider) {
        return res
          .status(200)
          .send({ message: 'The provider was deleted successfully' });
      }
      res.status(404).send({
        error: 'The provider with the specified id could not be found',
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}
