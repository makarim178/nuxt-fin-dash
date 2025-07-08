export const useCurrentAccountSelection = () => {
    const focussedAccount = useState<string>('focus-account', () => shallowRef('Total Balance'))

    const setFocus = (key: string) => focussedAccount.value = key

    const getCurrentFocus = () => focussedAccount.value

    return {
        getCurrentFocus,
        setFocus
    }
}