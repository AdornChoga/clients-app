<script setup>
import Client from './Client.vue';
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/client';

const store = useClientStore();
const { clients } = storeToRefs(store);
const { fetchClients } = useClientStore();
fetchClients();
</script>

<template>
  <table class="table table-bordered container">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Providers</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <Client v-for="client in clients" :key="client._id" :client="client" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100% !important;
}

th,
td {
  padding-left: 3rem;
  font-size: 1.8rem;
}

th {
  background-color: #f3f3f3;
}
</style>
