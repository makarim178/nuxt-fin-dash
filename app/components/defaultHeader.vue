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
                    <Icon name="ci:search-magnifying-glass" size="20" />
                    <input class="outline-0 text-sm" placeholder="Search here" >
                </div>
                <div v-if="pending" class="flex gap-3 items-center pl-8 animate-pulse">
                    <div class="w-10 h-8 bg-gray-600/50 rounded-full"/>
                    <div class="w-full flex flex-col gap-2">
                        <div class="w-36 h-3 bg-amber-50/40"/>
                        <div class="w-32 h-1 bg-amber-50/40"/>
                    </div>
                </div>
                <div v-else class="flex gap-3 items-center pl-8">
                    <UAvatar :src="user.imageUrl ?? ''" size="xl"/>
                    <div class="w-full flex flex-col">
                        <h5 class="text-sm">{{ user?.titleName}}</h5>
                        <span class="text-xs text-amber-50/40">{{ user?.email }}</span>
                    </div>
                    <UDropdownMenu
                        arrow
                        :items="items"
                        :ui="{ content: 'w-48 bg-slate-900'}"
                        class="cursor-pointer">
                        <UButton icon="material-symbols:keyboard-arrow-down" color="neutral" variant="ghost" />
                    </UDropdownMenu>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { UserWithRelationSchema, UserContactSchema } from '../../shared/types/index'
import { userWithRelations } from '../../shared/types/index'

import type { DropdownMenuItem } from '@nuxt/ui'
const client = useSupabaseClient()
const toast = useToast()

const signOut = async () => {
    try {
        const { error } = await client.auth.signOut()
        if (error) throw error
        toast.add({
            color:'success',
            title: 'success',
            description: 'Successfully logged out!'
        })
        navigateTo('/login')
    } catch (error) {
        const description = handleToastErrorMsg(error)
        toast.add({
            title: 'Failed',
            color: 'error',
            description
        })
    }
}

const items = computed(() => [
    [{
        label: 'Profile',
        icon: 'i-lucide-user'
    },
    {
        label: 'Billing',
        icon: 'i-lucide-credit-card'
    }, 
    {
        label: 'Settings',
        icon: 'i-lucide-cog'
    },
    {
        label: 'Support',
        icon: 'i-lucide-life-buoy',
        to: '/supports'
    }],
    [{
        label: 'Logout',
        icon: 'i-lucide-log-out',
        kbds: ['shift', 'meta', 'q'],
        async onSelect(e: Event) {
            e.preventDefault()
            await signOut()
        }
    } ]   
] satisfies DropdownMenuItem[])

const route = useRoute()
const getTitle = () => {
    const { data: item, success} = menuItemSchema.safeParse(useMenuItems().filterPath(route.path))
    return success ? item.name : ''
}


// Requires userId
const { data: user, pending }  = useLazyFetch('/api/user', {
    key: 'user-for-header',
    transform: (user: UserWithRelationSchema) => {
        const { contacts, images, title, firstName, lastName } = userWithRelations.parse(user)
        const filteredContact = userContactSchema.parse(contacts.filter(({ contactType, isPrimary}: UserContactSchema) => contactType === 'email' && isPrimary)[0])
        const userImage = userImageSchema.parse(images[0])
        
        const titleName = `${title} ${lastName}, ${firstName}`
        return { 
            titleName, 
            email: filteredContact ? filteredContact.contact : '', 
            imageUrl: userImage ? userImage.imageUrl : '' 
        }
    }
})
</script>

<style>

</style>