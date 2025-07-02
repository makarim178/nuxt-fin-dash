<template>
    <div
        :class="getBackgroundColor()"
        class="relative cursor-pointer overflow-hidden flex flex-col bg-gradient-to-br from-0% via-25% to-100% rounded-2xl p-4 gap-2"
    >
        <div class="flex items-center justify-between">
            <h4 class="text-xs text-amber-50/75">{{ title }}</h4>
            <Icon name="mi:options-horizontal" size="12"/>
        </div>
        <h1 class="text-lg font-black">{{ currencyFormat(+balance) }}</h1>
        <div class="flex items-center gap-1">
            <span class="text-xs w-7/12">{{getChangeText()}}</span>
            <div :class="getGraphColor()" class="p-1 rounded-full w-4 h-4 flex justify-center items-center">
                <Icon :name="getGraphIconName()" />
            </div>
        </div>
        <Icon class="absolute top-16 left-32 text-white/5 -rotate-15" size="96" name="streamline:bag-dollar-solid"/>
    </div>
</template>

<script setup lang="ts">
type CashHistoryPropsType = {
        title: string
        balance: string
        change: string
        isSelected: boolean
    }
const { title, balance, change, isSelected } = defineProps<CashHistoryPropsType>()

const getChangeText = () => {
    const info = 'last month'
    if (+change > 0 ) return `+${change} Higher than ${info}` 
    else if (+change < 0 ) return `${change} Lower than ${info}`
    return `No changes since ${info}`
}
//
const getGraphIconName = () => {
    const graph = {
        'positive': 'streamline:graph-arrow-increase',
        'negative': 'streamline:graph-arrow-decrease',
        'nochange': 'ix:line-dash'
    }
    if (+change > 0) return graph['positive']
    else if (+change < 0) return graph['negative']
    return graph['nochange']
}
const getGraphColor = () => {
    if (+change > 0) return 'bg-green-800'
    else if (+change < 0) return 'bg-red-800'
    return 'bg-blue-600'
}

const getBorder = () => isSelected ? 'border-1 border-blue-500/80' : ''
const getBackgroundColor = () => {
    let bgStyles = 'from-slate-900 to-blue-950/50'
    if (+change > 0) bgStyles = `from-slate-900 to-green-800/50`
    if (+change < 0) bgStyles = `from-slate-900 to-red-800/50`
    return `${bgStyles} ${getBorder()}`
}
</script>