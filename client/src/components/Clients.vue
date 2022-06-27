<script setup>
import { storeToRefs } from 'pinia';
import ClientsTable from './ClientsTable.vue';
import NewClient from './NewClient.vue';
import { useClientStore } from '../stores/client';

const { dateSort } = storeToRefs(useClientStore());
const { sortByDate } = useClientStore();
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
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            Sorty By
          </button>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
            <li :class="dateSort === 'createdAtDesc' ? 'date-sort-active' : ''">
              <button
                class="dropdown-item"
                type="button"
                @click="sortByDate('createdAt', 'Desc')"
              >
                Newest to Oldest (Created)
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li :class="dateSort === 'createdAtAsc' ? 'date-sort-active' : ''">
              <button
                class="dropdown-item"
                type="button"
                @click="sortByDate('createdAt', 'Asc')"
              >
                Oldest to Newest (Created)
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li :class="dateSort === 'updatedAtDesc' ? 'date-sort-active' : ''">
              <button
                class="dropdown-item"
                type="button"
                @click="sortByDate('updatedAt', 'Desc')"
              >
                Newest to Oldest (Updated)
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li :class="dateSort === 'updatedAtAsc' ? 'date-sort-active' : ''">
              <button
                class="dropdown-item"
                type="button"
                @click="sortByDate('updatedAt', 'Asc')"
              >
                Oldest to Newest (Updated)
              </button>
            </li>
          </ul>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            Filter By
          </button>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
            <li><button class="dropdown-item" type="button">Action</button></li>
            <li>
              <button class="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Something else here
              </button>
            </li>
          </ul>
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

.date-sort-active {
  border-left: 0.5rem solid #35748a;
  border-right: 0.5rem solid #35748a;
}
</style>
