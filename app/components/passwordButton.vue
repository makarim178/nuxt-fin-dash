<script lang="ts" setup>
const props = defineProps(['show', 'source', 'keyValue'])
const emit = defineEmits(['onShowClickEmit'])

const onBttnClick = () => emit('onShowClickEmit', props.keyValue)
const getAriaLabel = computed(() => {
    let label = props.show ? 'Hide' : 'Show'
    return `${label} ${props.source}`
})

</script>
<template>
    <UButton 
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="getAriaLabel"
        :aria-pressed="props.show"
        aria-controls="password"
        @click="onBttnClick"/>
</template>
