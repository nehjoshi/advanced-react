export type CartProduct = {
    name: string,
    price: number,
    quantity: number
}
export type CartSlice = {
    total: number,
    products: CartProduct[],
    numberOfProducts: number
}