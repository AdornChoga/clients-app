<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import 'v-calendar/dist/style.css';
import 'vue-select/dist/vue-select.css';
import { useClientStore } from '../stores/client';
import { useProviderStore } from '../stores/provider';
import DateFilter from './DateFilter.vue';

function onlyOneCheckbox(checkbox) {
  var checkboxes = document.getElementsByName(checkbox.name);
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}

const dateProperties = reactive({
  dateValue: '',
  specificDate: false,
  dateRange: false,
  startDate: '',
  endDate: '',
});

const strictProvidersSelection = ref(true);

const oneOfProvidersSelection = ref(false);

const selected = ref([]);

const { providers } = storeToRefs(useProviderStore());

const clientStore = useClientStore();

const { filterByDate, filterByProviders, fetchClients } = clientStore;

const filterClients = async () => {
  await fetchClients();
  const { dateValue, specificDate, dateRange, startDate, endDate } =
    dateProperties;
  if (specificDate) {
    await filterByDate(dateValue, 'specificDate');
  } else if (dateRange) {
    const range = { start: startDate, end: endDate };
    await filterByDate(range, 'dateRange');
  }
  if (selected.value.length) {
    strictProvidersSelection.value
      ? await filterByProviders(selected.value, 'strictProvidersSelection')
      : await filterByProviders(selected.value, 'oneOfProvidersSelection');
  }
  $('#filterModal').modal('toggle');
};

const clearFilters = async () => {
  specificDate.value = false;
  dateRange.value = false;
  strictProvidersSelection.value = true;
  oneOfProvidersSelection.value = false;
  selected.value = [];
  await fetchClients();
  $('#filterModal').modal('toggle');
};
</script>

<template>
  <div
    class="modal fade"
    id="filterModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="filterModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="filterModalLabel">Filter By</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <form id="dates" @submit.prevent="filterClients">
              <DateFilter :dateProperties="dateProperties" />
              <div class="providers-section">
                <h5 class="filter-title">Providers</h5>
                <v-select
                  multiple
                  class="providers-dropdown"
                  placeholder="Select some providers"
                  v-model="selected"
                  label="name"
                  :options="providers"
                  :reduce="(option) => option._id"
                ></v-select>
                <div class="providers-filtering-conditions">
                  <div>
                    <input
                      type="checkbox"
                      id="strictly-all-selected"
                      name="provider-selection"
                      @click="onlyOneCheckbox($event.target)"
                      :checked="strictProvidersSelection"
                      @change="
                        (e) => {
                          strictProvidersSelection = e.target.checked;
                          oneOfProvidersSelection = false;
                        }
                      "
                    />
                    <label for="strictly-all-selected"
                      >Strictly All Selected</label
                    >
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="either-of-selected"
                      name="provider-selection"
                      @click="onlyOneCheckbox($event.target)"
                      :checked="oneOfProvidersSelection"
                      @change="
                        (e) => {
                          oneOfProvidersSelection = e.target.checked;
                          strictProvidersSelection = false;
                        }
                      "
                    />
                    <label for="either-of-selected"
                      >At least One Of Selected</label
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn clear-filters-btn"
            @click="clearFilters"
          >
            Clear Filters
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" form="dates" class="btn btn-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

select {
  font-size: 1.7rem;
}

form span {
  font-size: 1.7rem;
}

.providers-section {
  width: 100%;
}

.providers-dropdown {
  font-size: 1.4rem;
  margin: 1.4rem;
}

.providers-filtering-conditions {
  display: flex;
  justify-content: center;
  gap: 5rem;
  font-size: 1.4rem;
  font-style: italic;
  margin: 1rem 0;
}

.providers-filtering-conditions > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: solid rgb(240, 237, 237);
}

.clear-filters-btn {
  margin-right: auto;
  border: none;
  background-color: #35748a;
  color: white;
}
</style>
