<template>
    <header>
        <div class="flex dark:bg-default dash-container">
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
                <div v-if="pending" class="flex gap-3 items-center pl-8 animate-pulse">
                    <div class="w-10 h-8 bg-gray-600/50 rounded-full"></div>
                    <div class="w-full flex flex-col gap-2">
                        <div class="w-36 h-3 bg-amber-50/40"></div>
                        <div class="w-32 h-1 bg-amber-50/40"></div>
                    </div>
                </div>
                <div v-else class="flex gap-3 items-center pl-8">
                    <NuxtImg :src="user?.imageUrl" class="rounded-full w-10 h-10"/>
                    <div class="w-full flex flex-col">
                        <h5 class="text-sm">{{ user?.titleName}}</h5>
                        <span class="text-xs text-amber-50/40">{{ user?.email }}</span>
                    </div>
                </div>
                <Icon class="cursor-pointer" name="material-symbols:keyboard-arrow-down" />
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">

const route = useRoute()

const { data: user, status, pending } = useLazyFetch(`/api/user`, {
    key: 'user',
    transform: (user: UserType) => {
        const { contacts, images, title, firstName, lastName } = user
        const email = contacts.filter(({ contactType, isPrimary}) => contactType === 'email' && isPrimary)[0].contact
        const titleName = `${title} ${lastName}, ${firstName}`
        return {
            titleName,
            email,
            imageUrl: images[0]?.imageUrl ?? ''
        } as {
            titleName: string
            email: string
            imageUrl: string
        }
    }
});

const getTitle = () => {
    const { name } = useMenuItems().filterPath(route.path)
    return name
}
</script>