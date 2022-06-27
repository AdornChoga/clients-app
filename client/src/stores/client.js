import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const useClientStore = defineStore({
  id: 'client',
  state: () => ({
    clients: [],
    clientError: '',
    fieldSort: {
      name: '',
      email: '',
      phone: '',
      providers: '',
    },
    dateSort: '',
  }),
  actions: {
    setClientError(error) {
      this.clientError = error;
    },
    sortByField(field, order) {
      Object.keys(this.fieldSort).forEach((key) => {
        if (key === field) {
          this.fieldSort[field] = order;
        } else {
          this.fieldSort[key] = '';
        }
      });
      switch (order) {
        case 'Asc':
          this.clients = this.clients.sort((a, b) => {
            if (field === 'providers') {
              return a[field].length > b[field].length ? 1 : -1;
            }
            return a[field] > b[field] ? 1 : -1;
          });
          break;
        case 'Desc':
          this.clients = this.clients.sort((a, b) => {
            if (field === 'providers') {
              return a[field].length < b[field].length ? 1 : -1;
            }
            return a[field] < b[field] ? 1 : -1;
          });
          break;
        default:
          this.clients = this.clients;
      }
    },
    sortByDate(dateType, order) {
      switch (order) {
        case 'Asc':
          this.clients = this.clients.sort((a, b) =>
            a[dateType] > b[dateType] ? 1 : -1,
          );
          break;
        case 'Desc':
          this.clients = this.clients.sort((a, b) =>
            a[dateType] < b[dateType] ? 1 : -1,
          );
          break;
        default:
          this.clients = this.clients;
      }
      this.dateSort = `${dateType}${order}`;
    },
    async fetchClients() {
      try {
        const { data } = await axios.get(`${baseUrl}/clients/`);
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
