<script setup>
import ClientsTable from './ClientsTable.vue';
import NewClient from './NewClient.vue';
</script>

<template>
  <div class="container">
    <div class="table-header">
      <h2>Clients</h2>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#newClientModal"
      >
        New Client
      </button>
    </div>
    <NewClient />
    <ClientsTable />
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2.5rem;
  background-color: #f0f5f9;
  margin-inline: auto;
  margin-top: 3rem;
}

.table-header > h2 {
  color: #35748a;
  font-size: 2.5rem;
}

.table-header > button {
  border: solid rgb(192, 191, 191);
  outline: none;
  padding: 0.6rem 2.3rem;
  font-size: 1.9rem;
  background-color: #f3f3f3;
  border-radius: 0.7rem;
}
</style>
