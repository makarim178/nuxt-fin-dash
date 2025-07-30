<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { userAuthLoginSchema } from '../../shared/types/user';
import type { UserAuthLoginSchema } from '../../shared/types/user';

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
    toast.add({ title: 'Success', color: 'success', description: 'Please check your email and confirm registration!' })
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
    const { error } = await client.auth.signInAnonymously()
    if (error) throw new Error('Could not login as a guest, please try again later!')
    toast.add({
      title: 'Success', 
      color: 'success',
      description: 'Thank you for logging in as a Guest user!'
    })
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
  <UCard variant="subtle" class="w-1/3">
    <template #header>
      <h4 class="flex justify-center">User Registration</h4>
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
      <div class="flex justify-between gap-4">
        <UButton type="submit" class="cursor-pointer w-full justify-center">Login</UButton>
        <UButton 
          type="button"
          class="cursor-pointer bg-cyan-700 hover:bg-cyan-950 text-white w-full justify-center"
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
      </div>
    </template>
  </UCard>
</template>