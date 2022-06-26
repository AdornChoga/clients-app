import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const useClientStore = defineStore({
  id: 'client',
  state: () => ({
    clients: [],
    clientError: '',
  }),
  actions: {
    setClientError(error) {
      this.clientError = error;
    },
    async fetchClients() {
      try {
        const { data } = await axios.get(`${baseUrl}/clients`);
        this.clients = data;
      } catch (error) {
        console.error(error.message);
      }
    },
    async createClient(payload) {
      try {
        const response = await axios.post(`${baseUrl}/clients/`, payload);
        if (response.status === 201) this.clients.push(response.data);
      } catch (error) {
        throw error;
      }
    },
    async updateClient(id, payload) {
      try {
        const response = await axios.patch(`${baseUrl}/clients/${id}`, payload);
        if (response.status === 200) {
          this.clients = this.clients.map((client) => {
            if (client._id === id) return { ...client, ...payload };
            return client;
          });
        }
      } catch (error) {
        throw error;
      }
    },
    async deleteClient(id) {
      try {
        const res = await axios.delete(`${baseUrl}/clients/${id}`);
        if (res.status === 200)
          this.clients = this.clients.filter((client) => client._id !== id);
      } catch (error) {
        console.error(error.message);
      }
    },
    async removeClientProvider(id) {
      try {
        this.clients = this.clients.map((client) => ({
          ...client,
          providers: client.providers.filter((provider) => provider._id !== id),
        }));
      } catch (error) {
        console.error(error.message);
      }
    },
  },
});
