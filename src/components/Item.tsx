import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { add, remove } from '../state/cart/cartSlice'

type ItemProps = {
    name: string,
    price: number,
    quantity?: number,
    readOnly: boolean
}

const Item = ({ name, price, quantity, readOnly }: ItemProps) => {7
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const productInCart = cart.products.find(p => p.name === name);

    const handleAddProduct = () => {
        dispatch(add({
            name, price,
            quantity: (productInCart?.quantity || 0) + 1
        }))
    }

    const handleRemoveProduct = () => {
        dispatch(remove(name));
    }

    return (
        <div className='bg-white rounded-lg p-4 text-white w-[300px]'>
            <h4 className='text-black font-bold'>{name}</h4>
            <h6 className='text-blue-900 font-bold'>${price}.00</h6>
            {!readOnly &&
                <div className='flex justify-between mt-6'>
                    <button className='bg-black hover:bg-blue-950' onClick={handleAddProduct}>+</button>
                    <p className='text-black' data-testid="quantity">{productInCart?.quantity || 0}</p>
                    <button className='bg-black hover:bg-blue-950' onClick={handleRemoveProduct}>-</button>
                </div>
            }
            {readOnly &&
                <div className='flex justify-center mt-6'>
                    <p className='text-black'>Quantity: {quantity}</p>
                </div>}
        </div>
    )
}

export default Item