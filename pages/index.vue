<template>
    <div class="flex">
        <div class="flex gap-4">
            <CashHistoryCard title="Total balance" balance="10250" change="2.1" :is-selected="true"/>
            <CashHistoryCard title="Debt" balance="3500" change="-3.5" :is-selected="false" />
            <CashHistoryCard title="Credit" balance="4200" change="0" :is-selected="false"/>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>