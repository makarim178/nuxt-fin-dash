<template>
    <header>
        <div class="flex dark:bg-slate-900/40 py-4 px-8 rounded-2xl justify-between items-center">
            <div>
                <h1 class="dark:text-white font-extrabold">
                    {{ getTitle() }}
                </h1>
            </div>
            <div class="flex gap-2 items-center">
                <div class="flex border-1 border-white/10 p-2 items-center rounded-full gap-2 h-10 w-[300px]">
                    <Icon name="ci:search-magnifying-glass" size="20"/>
                    <input class="outline-0 text-sm" placeholder="Search here"/>
                </div>
                <div class="flex gap-3 items-center pl-8">
                    <NuxtImg :src="data?.picture.medium" class="rounded-full w-10 h-10"/>
                    <div class="w-full flex flex-col">
                        <h5 class="text-sm">{{ getFullName(data.name) }}</h5>
                        <span class="text-xs text-amber-50/40">{{ data.email }}</span>
                    </div>
                </div>
                <Icon class="cursor-pointer" name="material-symbols:keyboard-arrow-down" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const route = useRoute()

const { data, status, error, refresh, clear } = useFetch(`/api/user`, {
    key: 'user'
})

const getFullName = ({ title, first, last }: UserNameType) => `${title} ${last}, ${first}`

const getTitle = () => {
    const { name } = useMenuItems().filterPath(route.path)
    return name
}
</script>