<script setup>
import { reactive } from 'vue';
import { useClientStore } from '../stores/client';
import ModalForm from './ModalForm.vue';

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

const modal = {
  id: `editClientModal${props.client._id}`,
  type: 'Save Client',
  formId: `editClientForm${props.client._id}`,
  title: 'Edit Client',
};

const properties = reactive({
  name: props.client.name,
  email: props.client.email,
  phone: props.client.phone,
  providers: props.client.providers,
});

const { updateClient } = useClientStore();

let clientProviders = props.client.providers;

const editClient = async () => {
  clientProviders = props.client.providers
    .map((prov1) => clientProviders.find((prov2) => prov1._id === prov2._id))
    .filter((provider) => provider !== undefined);
  const { name, email, phone } = properties;
  const payload = { name, email, phone, providers: clientProviders };
  await updateClient(props.client._id, payload);
  $(`#editClientModal${props.client._id}`).modal('toggle');
};

const toggleProvider = (checkbox) => {
  if (checkbox.checked) {
    const provider = {
      _id: checkbox.id,
    };
    clientProviders.push(provider);
  } else {
    clientProviders = clientProviders.filter(
      (provider) => provider._id !== checkbox.id,
    );
  }
};
</script>

<template>
  <ModalForm
    :modal="modal"
    :properties="properties"
    @toggle-provider="toggleProvider"
    @submit-client="editClient"
  />
</template>
