export default function(min: number, max:number ) {
    let number = Math.random() * (max - min + 1) + min 
    return +number.toFixed(2)
}