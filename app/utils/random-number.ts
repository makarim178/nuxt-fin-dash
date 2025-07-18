export default function(min: number, max:number ) {
    const number = Math.random() * (max - min + 1) + min 
    return +number.toFixed(2)
}