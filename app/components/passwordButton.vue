<script lang="ts" setup>
interface Props {
    show?: boolean, 
    source?: string,
    keyValue?: string
}
// const props = defineProps(['show', 'source', 'keyValue'])
const props = withDefaults(defineProps<Props>(), {
    show: false,
    source: 'password',
    keyValue: 'pass'
})
const emit = defineEmits(['onShowClickEmit'])

const onBttnClick = () => emit('onShowClickEmit', props.keyValue)
const getAriaLabel = computed(() => {
    const label = props.show ? 'Hide' : 'Show'
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
