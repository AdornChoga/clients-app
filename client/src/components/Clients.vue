<script setup>
import ClientsTable from './ClientsTable.vue';
import NewClient from './NewClient.vue';
import FilterModal from './FilterModal.vue';
import SortDropdown from './SortDropdown.vue';
import { useClientStore } from '../stores/client';
import { useProviderStore } from '../stores/provider';

const { fetchProviders } = useProviderStore();
const { fetchClients } = useClientStore();

fetchProviders();
fetchClients();
</script>

<template>
  <div class="container">
    <div class="table-header">
      <div class="title-section">
        <h2>Clients</h2>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#newClientModal"
        >
          New Client
        </button>
      </div>
      <div class="d-flex gap-3">
        <SortDropdown />
        <div>
          <button
            type="button"
            class="btn btn-secondary p-2"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            <span>Filter</span>
            &nbsp;&nbsp;
            <i class="fa-solid fa-filter"></i>
          </button>
          <FilterModal />
        </div>
      </div>
    </div>
    <NewClient />
    <ClientsTable />
  </div>
</template>

<style scoped>
.table-header {
  padding: 2.5rem 2.5rem;
  background-color: #f0f5f9;
  margin-inline: auto;
  margin-top: 3rem;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-section > h2 {
  color: #35748a;
  font-size: 2.5rem;
}

.title-section > button {
  border: solid rgb(192, 191, 191);
  outline: none;
  padding: 0.6rem 2.3rem;
  font-size: 1.9rem;
  background-color: #f3f3f3;
  border-radius: 0.7rem;
}
</style>
