<script setup>
import { ref, reactive } from 'vue';
import { useClientStore } from '../stores/client';
import DateFilter from './DateFilter.vue';
import ProvidersFilter from './ProvidersFilter.vue';

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

const providersFilterProps = reactive({
  exactMatching: true,
  selected: [],
});

const clientStore = useClientStore();

const { filterByDate, filterByProviders, fetchClients } = clientStore;

const filterClients = async () => {
  await fetchClients();
  const { dateValue, specificDate, dateRange, startDate, endDate } =
    dateProperties;

  const { exactMatching, selected } = providersFilterProps;
  if (specificDate) {
    await filterByDate(dateValue, 'specificDate');
  } else if (dateRange) {
    const range = { start: startDate, end: endDate };
    await filterByDate(range, 'dateRange');
  }
  if (selected.length) {
    exactMatching
      ? await filterByProviders(selected, 'strictProvidersSelection')
      : await filterByProviders(selected, 'oneOfProvidersSelection');
  }
  $('#filterModal').modal('toggle');
};

const clearFilters = async () => {
  dateProperties.dateValue = '';
  dateProperties.specificDate = false;
  dateProperties.dateRange = false;
  dateProperties.startDate = '';
  dateProperties.endDate = '';
  providersFilterProps.exactMatching = true;
  providersFilterProps.selected = [];
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
              <DateFilter
                :dateProperties="dateProperties"
                @toggle-checkbox="onlyOneCheckbox"
              />
              <ProvidersFilter
                :providersFilterProps="providersFilterProps"
                @toggle-checkbox="onlyOneCheckbox"
              />
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
