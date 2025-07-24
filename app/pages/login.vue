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

const onSubmit = async (event: FormSubmitEvent<UserAuthLoginSchema>) => {
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

const handleGuestLogin = async () => {
  try {
    const { data, error } = await client.auth.signInAnonymously()
    if (error) throw new Error('Could not login as a guest, please try again later!')
    console.log(data)
    toast.add({
      title: 'Success', 
      color: 'info',
      description: 'Thank you for logging in as a Guest user!'
    })
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
      <div class="flex justify-between">
        <UButton type="submit" class="cursor-pointer">Login</UButton>
        <UButton 
          type="button"
          class="cursor-pointer bg-cyan-700 hover:bg-cyan-950 text-white"
          @click="handleGuestLogin">
          Continue as a Guest
        </UButton>
      </div>
    </UForm>
    <template #footer>
      <div class="flex justify-between">
        <h6 class="text-sm">Not a registered user? Please 
          <NuxtLink 
            to="/register" 
            class="cursor-pointer text-success hover:text-success-500">Register</NuxtLink>.</h6>
          <h6>Continue as a Guest</h6>
      </div>
    </template>
  </UCard>
</template>