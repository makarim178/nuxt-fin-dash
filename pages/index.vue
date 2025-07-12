<template>
    <div class="flex">
        <div class="flex flex-col gap-3">
            <div class="flex gap-4">
                <!-- <CashHistoryCard 
                    v-for="account in accountHistory"
                    :key="account.title"
                    :title="account.title" 
                    :balance="account.balance" 
                    :change="account.change" 
                    @click="setFocus(account.title)"
                /> -->
            </div>
            <div class="flex flex-col dash-container dark:bg-default">
                <div class="flex justify-between w-full">
                    <div class="flex flex-col">
                        <h3>Trasactoin Reports</h3>
                        <span class="text-[0.65rem] text-amber-50/20">Trasaction reports graph.</span>
                    </div>
                    <div class="flex rounded-full border-1 border-amber-50/10 justify-center items-center px-4 gap-2 h-8">
                        <span class="text-[0.65rem] cursor-pointer">Monthly</span>
                        <Icon class="" name="mdi:chevron-down" size="10" />
                    </div>
                </div>
                <BarChart
                    class="w-full"
                    :key="colorMode.value"
                    :data="TransactionData"
                    :height="300"
                    :categories="RevenueCategories"
                    :y-axis="['transactions']"
                    :xNumTicks="6"
                    :radius="4"
                    :y-grid-line="true"
                    :x-formatter="xFormatter"
                    :y-formatter="yFormatter"
                    :hide-legend="false"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: accountHistory} = useFetch('/api/account-history', {key: 'account-history'})
const setFocus = (title: string) => useCurrentAccountSelection().setFocus(title)

const colorMode = useColorMode()

const TransactionData = [
  { month: 'January', transactions: 103500 },
  { month: 'February', transactions: 93500  },
  { month: 'March', transactions: 106500  },
  { month: 'April', transactions: 93000  },
  { month: 'May', transactions: 68000  },
  { month: 'June', transactions: 85000  },
  { month: 'July', transactions: 25000  },
]

const RevenueCategories = computed(() => ({
  transactions: {
    name: 'Trasactions',
    color: '#00BFFF',
  },
}))

const xFormatter = (i: number): string => `${TransactionData[i]?.month}`
const yFormatter = (i: number) => i
</script>