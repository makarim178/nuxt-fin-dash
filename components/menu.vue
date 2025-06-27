<template>
    <div class="h-full w-[250px] flex flex-col bg-linear-165 via-10% to-30% from-blue-950 via-gray-900 to-gray-950 rounded-tl-3xl rounded-bl-3xl pl-8 justify-between pb-24">
        <div class="flex flex-col">
            <div class="flex gap-3 items-center pt-12">
                <Icon name="simple-icons:payloadcms" class="text-blue-400 text-5xl"/>
                <h2 class="font-extrabold font-['Noto_Sans'] text-3xl">Finance</h2>
            </div>
    
            <nav class="pt-8">
                <ul class="flex flex-col gap-3">
                    <li v-for="item in menuItems" :key="item.id" class="p-2" :class="getActiveClass(item.link)">
                        <NuxtLink :to="item.link" class="pl-3 flex gap-x-2 items-center" prefetch-on="interaction">
                            <Icon :name="item.icon" class="text-2xl"/>
                            <h4 class="font-light font-['Maven_Pro'] text-md">{{ item.name }}</h4>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        <ThemeColor />
    </div>
</template>

<script setup lang="ts">
const menuItems = [
    {
        id: 'menu-1',
        name: 'Home',
        icon: 'material-symbols-light:home-rounded',
        link: '/'
    },
    {
        id: 'menu-2',
        name: 'Accounts',
        icon: 'mdi-light:bank',
        link: '/accounts'
    },
    {
        id: 'menu-3',
        name: 'Transaction',
        icon: 'solar:round-transfer-vertical-broken',
        link: '/transaction'
    },
    {
        id: 'menu-4',
        name: 'Reports',
        icon: 'majesticons:home-analytics-line',
        link: '/reports'
    },
    {
        id: 'menu-5',
        name: 'Expenses',
        icon: 'arcticons:expense-register',
        link: '/expenses'
    },
    {
        id: 'menu-6',
        name: 'Notification',
        icon: 'material-symbols:notifications-outline-sharp',
        link: '/notification'
    },
    {
        id: 'menu-7',
        name: 'Messages',
        icon: 'mdi:chat-processing-outline',
        link: '/messages'
    },
    {
        name: 'Supports',
        icon: 'mage:box-3d-question-mark',
        link: '/supports'
    },
    {
        name: 'Settings',
        icon: 'material-symbols-light:settings-outline-rounded',
        link: '/settings'
    },

]

const getActiveClass = (pathName: string): string => {
    const { path } = useRoute()
    return path === pathName ? 'bg-linear-98 from-sky-700 to-50% to-blue-900 rounded-bl-2xl rounded-tl-2xl' : ''
}
</script>