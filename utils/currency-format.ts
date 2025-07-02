export default function(value: number) {
    let amt = +value.toFixed(2)
    return amt.toLocaleString('en-us', {
        style: 'currency',
        currency: 'cad'
    })
}