<script setup>
import { ref } from 'vue';
import { useProviderStore } from '../stores/provider';

const { updateProvider } = useProviderStore();

const props = defineProps({
  provider: {
    type: Object,
    required: true,
  },
});

const providerName = ref(props.provider.name);

const editProvider = async () => {
  await updateProvider({ ...props.provider, name: providerName.value });
  props.provider.editing = false;
};
</script>

<template>
  <form class="edit-provider-form" @submit.prevent="editProvider">
    <input type="text" v-model="providerName" required />
    <button type="submit" class="btn btn-secondary">Update</button>
    <button
      type="button"
      class="m-3 btn btn-danger"
      @click="() => (provider.editing = false)"
    >
      Cancel
    </button>
  </form>
</template>

<style scoped></style>
