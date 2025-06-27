export const useUtilities = () => {

    const capitlizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

    return {
        capitlizeWord
    }
}