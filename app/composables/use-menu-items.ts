import { z } from "zod/v4"

export const menuItemSchema = z.object({
    id: z.string(),
    name: z.literal(['Home', 'Accounts', 'Transaction', 'Reports', 'Expenses', 'Notification', 'Messages', 'Supports', 'Settings']),
    icon: z.string(),
    link: z.string(),
    hasNewUpdate: z.boolean().optional()
})

export type MenuItemSchema = z.infer<typeof menuItemSchema>

export const useMenuItems = () => {

const menuItems = useState<MenuItemSchema[]>('menu-items', () => shallowRef([
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
        link: '/notification',
        hasNewUpdate: true
    },
    {
        id: 'menu-7',
        name: 'Messages',
        icon: 'mdi:chat-processing-outline',
        link: '/messages',
        hasNewUpdate: true
    },
    {
        id: 'menu-8',
        name: 'Supports',
        icon: 'mage:box-3d-question-mark',
        link: '/supports'
    },
    {
        id: 'menu-9',
        name: 'Settings',
        icon: 'material-symbols-light:settings-outline-rounded',
        link: '/settings'
    }
]))

const getMenuItems = () => menuItems.value
const setMenuItem = (item:MenuItemSchema) => [...menuItems.value, item]
const filterPath = (path: string): MenuItemSchema | undefined => menuItems.value.filter(item => item.link === path)[0]
return {
    getMenuItems,
    setMenuItem,
    filterPath
}
}