<template>
  <USwitch
    v-model="switchValue"
    label="Theme"
    size="xl"
    class="pl-3"
    @click="setTheme"
  />
</template>

<script lang="ts" setup>
const switchValue = ref(useColorMode().preference === 'light')
const setTheme = () => {
    switchValue.value = !switchValue.value
    useColorMode().preference = switchValue.value ? 'light' : 'dark'
}
</script>