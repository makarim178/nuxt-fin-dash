export const useMenuItems = () => {

const menuItems = useState<MenuItemType[]>('menu-items', () => shallowRef([
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
const setMenuItem = (item:MenuItemType) => [...menuItems.value, item]
const filterPath = (path: string) => menuItems.value.filter(item => item.link === path)[0]
return {
    getMenuItems,
    setMenuItem,
    filterPath
}
}