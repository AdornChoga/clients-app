import { defineStore } from 'pinia';
import axios from 'axios';
import { useClientStore } from './client';

const baseUrl = 'http://localhost:5000';

export const useProviderStore = defineStore({
  id: 'provider',
  state: () => ({
    providers: [],
    providerError: '',
  }),
  actions: {
    async fetchProviders() {
      try {
        const { data } = await axios.get(`${baseUrl}/providers`);
        this.providers = data.map((provider) => ({
          ...provider,
          editing: false,
        }));
      } catch (error) {
        console.error(error.message);
      }
    },
    async createProvider(payload) {
      try {
        const response = await axios.post(`${baseUrl}/providers`, payload);
        if (response.status === 200)
          this.providers.push({ ...response.data, editing: false });
      } catch (error) {
        console.error(error.message);
      }
    },
    async updateProvider(payload) {
      try {
        const response = await axios.patch(
          `${baseUrl}/providers/${payload._id}`,
          payload,
        );
        if (response.status === 200) {
          this.providers = this.providers.map((provider) => {
            if (provider._id === payload._id) {
              return { ...provider, ...payload };
            }
            return provider;
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteProvider(id) {
      try {
        const response = await axios.delete(`${baseUrl}/providers/${id}`);
        if (response.status === 200) {
          this.providers = this.providers.filter(
            (provider) => provider._id !== id,
          );
          const { removeClientProvider } = useClientStore();
          removeClientProvider(id);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },
});
