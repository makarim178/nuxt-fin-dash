<template>
    <USwitch
        :label="getLabel()"
        size="xl"
        class="pl-3"
        v-model="value"
        @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
    />
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark'
const value = ref(true)
const setColorTheme = (newTheme: Theme) => useColorMode().preference = newTheme
const getLabel = () => `${useUtilities().capitlizeWord(useColorMode().preference)} Theme`
</script>