<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { userAuthRegisterSchema } from '../../shared/types';
import type { TitleSchema, UserAuthRegisterSchema } from '../../shared/types';
import { z } from 'zod/v4';

const titleRef = ref<TitleSchema[]>(['Mr.', 'Ms.', 'Mrs.'])

const state = reactive<Partial<UserAuthRegisterSchema>>({
  title: 'Mr.',
  firstName: '',
  lastName: '',
  email: '',
  role: 6,
  password: '',
  confirmPassword: ''
})

const toast = useToast()
const client = useSupabaseClient()

const { data, pending } = useFetch('/api/role-setup', { key: 'user-roles'})
const itemValue = ref(1)
// const items = ref([
//   {
//     label: 'Backlog',
//     id: 'backlog'
//   },
//   {
//     label: 'Todo',
//     id: 'todo'
//   },
//   {
//     label: 'In Progress',
//     id: 'in_progress'
//   },
//   {
//     label: 'Done',
//     id: 'done'
//   }
// ])

// {
//     "user": {
//         "id": "3d24d3ab-dc03-4bef-bb0d-d469bf13be61",
//         "aud": "authenticated",
//         "role": "authenticated",
//         "email": "makarim178@gmail.com",
//         "phone": "",
//         "confirmation_sent_at": "2025-07-19T06:08:21.381738075Z",
//         "app_metadata": {
//             "provider": "email",
//             "providers": [
//                 "email"
//             ]
//         },
//         "user_metadata": {
//             "email": "makarim178@gmail.com",
//             "email_verified": false,
//             "phone_verified": false,
//             "sub": "3d24d3ab-dc03-4bef-bb0d-d469bf13be61"
//         },
//         "identities": [
//             {
//                 "identity_id": "74993f98-ad56-4979-b03d-48c9f38cb395",
//                 "id": "3d24d3ab-dc03-4bef-bb0d-d469bf13be61",
//                 "user_id": "3d24d3ab-dc03-4bef-bb0d-d469bf13be61",
//                 "identity_data": {
//                     "email": "makarim178@gmail.com",
//                     "email_verified": false,
//                     "phone_verified": false,
//                     "sub": "3d24d3ab-dc03-4bef-bb0d-d469bf13be61"
//                 },
//                 "provider": "email",
//                 "last_sign_in_at": "2025-07-19T06:08:21.361223685Z",
//                 "created_at": "2025-07-19T06:08:21.361281Z",
//                 "updated_at": "2025-07-19T06:08:21.361281Z",
//                 "email": "makarim178@gmail.com"
//             }
//         ],
//         "created_at": "2025-07-19T06:08:21.337323Z",
//         "updated_at": "2025-07-19T06:08:21.82178Z",
//         "is_anonymous": false
//     },
//     "session": null
// }

const onSubmit = async (event: FormSubmitEvent<UserAuthRegisterSchema>) => {
  try {
    const { data, error } = await client.auth.signUp({      
      email: event.data.email, 
      password: event.data.password      
    })
    if (error) throw error
    const uuidType = z.uuidv4()
    const uuid = uuidType.parse(data?.user?.id)
    if (uuid) {

    }

    toast.add({ title: 'Success', description: 'Please check your email and confirm registration!', color: 'success' })
  } catch (error) {
    const description = handleToastErrorMsg(error)
    toast.add({
      title: 'Failed',
      color: 'error',
      description
    })
  }
}
</script>

<template>
  <UCard variant="subtle" class="w-1/2">
    <template #header>
      <h4>User Registration</h4>
    </template>
    <UForm 
      :schema="userAuthRegisterSchema"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit">
        <div class="flex w-full gap-2">
          <UFormField label="Title" name="title">
            <USelect v-model="state.title" :items="titleRef" class="w-24" color="success" 
            variant="outline" 
            :ui="{
              content: 'bg-slate-800/90'
            }"/>
          </UFormField>
          <UFormField label="First Name" name="firstName" class="w-1/2">
            <UInput v-model="state.firstName" class="w-full"/>
          </UFormField>
          <UFormField label="Last Name" name="lastName" class="w-1/2">
            <UInput v-model="state.lastName" class="w-full"/>
          </UFormField>
        </div>
        <div class="flex w-full gap-2">
          <UFormField label="Email" name="email" class="w-2/3">
            <UInput 
              v-model="state.email" 
              class="w-full"/>
          </UFormField>
          <UFormField v-if="!pending" label="User Role" name="role" class="w-1/3">
            <USelect v-model="state.role" value-key="id" :items="data.roles" class="w-full" color="success" label-key="role"
            variant="outline" 
            :ui="{
              content: 'bg-slate-800/90'
            }"/>
          </UFormField>

        </div>
      <UFormField 
        label="Password" 
        name="password">
        <UInput 
          v-model="state.password" 
          type="password" 
          class="w-full"/>
      </UFormField>
      <UFormField 
        label="Confirm Password" 
        name="confirmPassword">
        <UInput 
          v-model="state.confirmPassword" 
          type="password" 
          class="w-full"/>
      </UFormField>
      <div class="flex justify-end">
        <UButton type="submit" size="xl">Register</UButton>
      </div>
    </UForm>
    <template #footer>
      <h4>Please <NuxtLink to="/login" class="text-blue-300 hover:text-blue-600">login</NuxtLink> if you are an existing user.</h4>
    </template>
  </UCard>
</template>

