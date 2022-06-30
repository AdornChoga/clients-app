<script setup>
import { reactive } from 'vue';
import { useClientStore } from '../stores/client';
import { useProviderStore } from '../stores/provider';
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

let properties = reactive({
  name: props.client.name,
  email: props.client.email,
  phone: props.client.phone,
  providers: props.client.providers,
});

const { updateClient, deleteClient, setClientError } = useClientStore();
const providerStore = useProviderStore();
const { setProviderError } = providerStore;

let clientProviders = [...props.client.providers];

const deleteCurrentClient = async () => {
  const ClientId = props.client._id;
  $(`#editClientModal${ClientId}`).modal('toggle');
  await deleteClient(ClientId);
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

const editClient = async () => {
  clientProviders = providerStore.providers
    .map((prov1) => clientProviders.find((prov2) => prov1._id === prov2._id))
    .filter((provider) => provider !== undefined);
  const { name, email, phone } = properties;
  const payload = { name, email, phone, providers: clientProviders };
  try {
    await updateClient(props.client._id, payload);
    $(`#editClientModal${props.client._id}`).modal('toggle');
    setClientError('');
    setProviderError('');
  } catch ({ response }) {
    const { error } = response.data;
    if (error.match('email_1 dup key')) {
      setClientError(`Account with the email ${email} already exists!`);
    } else {
      console.error(error);
    }
  }
};

const cancelEditing = () => {
  properties.name = props.client.name;
  properties.email = props.client.email;
  properties.phone = props.client.phone;
};
</script>

<template>
  <ModalForm
    :modal="modal"
    :properties="properties"
    @toggle-provider="toggleProvider"
    @submit-client="editClient"
    @delete-client="deleteCurrentClient"
    @cancel-operation="cancelEditing"
  />
</template>
