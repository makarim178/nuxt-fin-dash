<template>
    <USwitch
        label="Theme"
        size="xl"
        class="pl-3"
        v-model="switchValue"
        @click="setTheme"
    />
</template>

<script setup lang="ts">
const switchValue = ref(useColorMode().preference === 'light')
const setTheme = () => {
    switchValue.value = !switchValue.value
    useColorMode().preference = switchValue.value ? 'light' : 'dark'
}
</script>