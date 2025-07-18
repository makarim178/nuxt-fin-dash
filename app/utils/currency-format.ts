export default function(value: number) {
    const amt = +value.toFixed(2)
    return amt.toLocaleString('en-us', {
        style: 'currency',
        currency: 'cad'
    })
}