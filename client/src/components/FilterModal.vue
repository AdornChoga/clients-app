<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import 'v-calendar/dist/style.css';
import { useClientStore } from '../stores/client';

function onlyOneCheckbox(checkbox) {
  var checkboxes = document.getElementsByName('date-category');
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}
const dateValue = ref('');

const specificDate = ref(false);

const dateRange = ref(false);

const range = reactive({
  start: '',
  end: '',
});

const clientStore = useClientStore();

const { oldestClientDate, newestClientDate } = storeToRefs(clientStore);

const { filterByDate, fetchClients } = clientStore;

const filterClientsByDate = async (range) => {
  await fetchClients();
  if (specificDate.value) {
    await filterByDate(dateValue.value, 'specificDate');
  } else if (dateRange.value) {
    await filterByDate(range, 'dateRange');
  } else {
    await fetchClients();
  }
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
            <h5 class="filter-title">Registration Date</h5>
            <form id="dates" @submit.prevent="filterClientsByDate(range)">
              <div class="date-category">
                <div>
                  <label for="specific-date">Specific Date</label>
                  <input
                    type="checkbox"
                    name="date-category"
                    id="specific-date"
                    @click="onlyOneCheckbox($event.target)"
                    :checked="specificDate"
                    @change="
                      (e) => {
                        specificDate = e.target.checked;
                        dateRange = false;
                      }
                    "
                  />
                </div>
                <v-date-picker
                  v-model="dateValue"
                  mode="date"
                  :available-dates="{
                    start: oldestClientDate,
                    end: newestClientDate,
                  }"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="date-input specific"
                      placeholder="MM/DD/YYYY"
                      :value="inputValue"
                      v-on="inputEvents"
                      :disabled="!specificDate"
                      required
                    />
                  </template>
                </v-date-picker>
              </div>
              <div class="date-category">
                <div>
                  <label for="date-range">Select Range</label>
                  <input
                    type="checkbox"
                    name="date-category"
                    id="date-range"
                    @click="onlyOneCheckbox($event.target)"
                    :checked="dateRange"
                    @change="
                      (e) => {
                        dateRange = e.target.checked;
                        specificDate = false;
                      }
                    "
                  />
                </div>
                <v-date-picker
                  v-model="range"
                  is-range
                  :available-dates="{
                    start: oldestClientDate,
                    end: newestClientDate,
                  }"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <div class="flex justify-center items-center">
                      <input
                        class="date-input"
                        placeholder="MM/DD/YYYY"
                        v-model="inputValue.start"
                        v-on="inputEvents.start"
                        :disabled="!dateRange"
                        required
                      />
                      <i class="fa-solid fa-arrow-right-long"></i>
                      <input
                        class="date-input"
                        placeholder="MM/DD/YYYY"
                        v-model="inputValue.end"
                        v-on="inputEvents.end"
                        :disabled="!dateRange"
                        required
                      />
                    </div>
                  </template>
                </v-date-picker>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
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
.filter-title {
  font-size: 1.8rem;
  background-color: #d0dbe5;
  text-align: center;
  width: 100%;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

select {
  font-size: 1.7rem;
}

form span {
  font-size: 1.7rem;
}

.date-input {
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 500;
  width: 40%;
  text-align: center;
}

.date-input.specific {
  width: 100%;
}

.date-category div:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.date-category label {
  font-size: 1.7rem;
  font-style: italic;
}

.fa-arrow-right-long {
  font-size: 1.7rem;
}
</style>
