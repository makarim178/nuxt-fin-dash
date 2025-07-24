<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { userAuthLoginSchema } from '../../shared/types';
import type { UserAuthLoginSchema } from '../../shared/types';
definePageMeta({
  layout: 'default'
})

const showRef = ref<boolean>(false)
const client = useSupabaseClient()

const state = reactive<Partial<UserAuthLoginSchema>>({
  email: undefined,
  password: undefined,
})

const toast = useToast()

const showClickHandler = () => {
  showRef.value = !showRef.value
}

async function onSubmit(event: FormSubmitEvent<UserAuthLoginSchema>) {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password
    })
    if (error) throw error
    console.log(event.data)
    toast.add({ title: 'Success', description: 'Please check your email and confirm registration!', color: 'success' })
    navigateTo('/')
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
      :schema="userAuthLoginSchema"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit">
      <UFormField 
        label="Email" 
        name="email">
        <UInput 
          v-model="state.email" 
          class="w-full"/>
      </UFormField>
      <UFormField 
        label="Password" 
        name="password">
        <UInput 
          v-model="state.password" 
          :type="showRef ? 'text' : 'password'" 
          class="w-full">
          <template #trailing>
            <PasswordButton :show="showRef" @on-show-click-emit="showClickHandler" />
          </template>
        </UInput>
      </UFormField>
      <UButton type="submit" class="cursor-pointer">Login</UButton>
    </UForm>
    <template #footer>
      <h6 class="text-sm">Not a registered user? Please 
        <NuxtLink 
          to="/register" 
          class="cursor-pointer text-success hover:text-success-500">Register</NuxtLink>.</h6>
    </template>
  </UCard>
</template>
