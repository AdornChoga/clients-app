<script setup>
import { reactive } from 'vue';
import { useClientStore } from '../stores/client';
import ModalForm from './FormModal.vue';

const { createClient } = useClientStore();

let clientProviders = [];

const modal = {
  id: 'newClientModal',
  type: 'Create Client',
  formId: 'newClientForm',
  title: 'New Client',
};

const properties = reactive({
  name: '',
  email: '',
  phone: '',
});

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

const resetInputData = () => {
  properties.name = '';
  properties.email = '';
  properties.phone = '';
  clientProviders = [];
};

const submitClient = async () => {
  let { name, email, phone } = properties;
  const payload = { name, email, phone, providers: clientProviders };
  await createClient(payload);
  resetInputData();
  $('#newClientModal').modal('toggle');
};
</script>

<template>
  <ModalForm
    :modal="modal"
    :properties="properties"
    @toggle-provider="toggleProvider"
    @submit-client="submitClient"
  />
</template>
