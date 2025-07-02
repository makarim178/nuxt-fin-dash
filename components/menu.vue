<template>
    <div class="h-full w-[250px] flex flex-col bg-linear-165 via-10% to-30% from-blue-950 via-gray-900 to-gray-950 rounded-tl-3xl rounded-bl-3xl pl-8 justify-between pb-24">
        <div class="flex flex-col">
            <div class="flex gap-3 items-center pt-12">
                <Icon name="simple-icons:payloadcms" class="text-blue-400 text-3xl"/>
                <h2 class="font-extrabold font-['Noto_Sans'] text-2xl">Finance</h2>
            </div>
    
            <nav class="pt-8">
                <ul class="flex flex-col gap-3">
                    <li v-for="item in menuItems" :key="item.id" class="p-2" :class="getActiveClass(item.link)">
                        <NuxtLink :to="item.link" class="pl-3 pr-3 flex justify-between items-center" prefetch-on="interaction">
                            <div class="flex gap-x-2 items-center">
                                <Icon :name="item.icon" class="text-2xl"/>
                                <h4 class="font-light font-['Maven_Pro'] text-md">{{ item.name }}</h4>
                            </div>
                            <div 
                                v-if="item.hasOwnProperty('hasNewUpdate')"
                                class="rounded-full w-1.5 h-1.5" 
                                :class="item?.hasNewUpdate ? 'bg-green-500' : ''"
                            ></div>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        <ThemeColor />
    </div>
</template>

<script setup lang="ts">
const menuItems = useMenuItems().getMenuItems()

const getActiveClass = (pathName: string): string => {
    const { path } = useRoute()
 
    return path === pathName ? 'bg-linear-98 from-sky-700 to-50% to-blue-900 rounded-bl-2xl rounded-tl-2xl' : ''
    // max@phoenixmates.com
}
</script>