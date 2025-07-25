<script lang="ts" setup>
import { userAuthRegisterSchema } from '../../shared/types/user';
import type { TitleSchema, UserAuthRegisterSchema } from '../../shared/types/user';

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

const showRef = ref<{ [key: string]: boolean }>({
  pass: false,
  confirmPass: false
})

const toast = useToast()

const { data, pending } = useFetch('/api/role-setup', { key: 'user-roles'})

const onSubmit = async () => {
  try {
    const response = await $fetch('/api/user', {
      method: 'POST',
      body: {
        title: state.title,
        firstName: state.firstName,
        lastName: state.lastName,
        roleTypeId: state.role,
        email: state.email,
        password: state.password
      }
    })
    if (!response) throw new Error('Error registering user, please try again!')
    toast.add({ title: 'Success', description: 'Please check your email and confirm registration!', color: 'success' })

    await navigateTo('/login')
  } catch (error) {
    const description = handleToastErrorMsg(error)
    toast.add({
      title: 'Failed',
      color: 'error',
      description
    })
  }
}

const showClickHandler = (key:string) => {
  showRef.value[key] = !showRef.value[key]
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
            <USelect 
              v-model="state.title" 
              :items="titleRef"
              class="w-24" 
              color="success" 
              variant="outline" 
              :ui="{ content: 'bg-slate-900' }"/>
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
              class="w-full" />
          </UFormField>
          <UFormField v-if="!pending" label="User Role" name="role" class="w-1/3">
            <USelect 
              v-model="state.role" 
              value-key="id"
              :items="data.roles"
              class="w-full"
              color="success"
              label-key="role"
              variant="outline" 
              :ui="{ content: 'bg-slate-800/90' }"/>
          </UFormField>

        </div>
      <UFormField 
        label="Password" 
        name="password">
        <UInput 
          v-model="state.password" 
          :type="showRef.pass ? 'text' : 'password'" 
          class="w-full"
          :ui="{ trailing: 'pe-1'}">
          <template #trailing>
            <PasswordButton :show="showRef.pass ?? false" @on-show-click-emit="showClickHandler" />
          </template>
        </UInput>
      </UFormField>
      <UFormField 
        label="Confirm Password" 
        name="confirmPassword">
        <UInput 
          v-model="state.confirmPassword" 
          :type="showRef.confirmPass ? 'text' : 'password'" 
          class="w-full"
          :ui="{ trailing: 'pe-1'}">
          <template #trailing>
            <PasswordButton :show="showRef.confirmPass ?? false" source="confirmPassword" key-value="confirmPass" @on-show-click-emit="showClickHandler" />
          </template>
        </UInput>
      </UFormField>
      <div class="flex justify-end">
        <UButton type="submit" size="xl" class="cursor-pointer">Register</UButton>
      </div>
    </UForm>
    <template #footer>
      <h4>Please <NuxtLink to="/login" class="text-success hover:text-success-500 cursor-pointer">login</NuxtLink> if you are an existing user.</h4>
    </template>
  </UCard>
</template>

