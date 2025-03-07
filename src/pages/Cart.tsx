import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import Item from '../components/Item';
import { Link } from 'react-router';
import { clear } from "../state/cart/cartSlice";

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const sortedProducts = useMemo(() => {
        return [...cart.products].sort((a, b) => b.quantity - a.quantity);
    }, [cart.products]);

    const handleClearCart = () => {
        dispatch(clear());
    }

    return (
        <main className='w-full h-full flex flex-col'>
            <h1 className='font-bold mb-6'>Cart</h1>
            {sortedProducts.length === 0 &&
                <p className='text-blue-800 text-lg font-semibold'>Your cart is empty. <Link className='underline text-blue-50' to="/shop">Add items now.</Link></p>
            }
            <div className='flex flex-col gap-2 min-w-[300px]'>
                {sortedProducts.map((product) => (
                    <Item
                        name={product.name}
                        key={product.name}
                        price={product.price}
                        readOnly={true}
                        quantity={product.quantity}
                    />
                ))}
            </div>
            <section className='mt-4'>
                <hr className='border-gray-200 border-[1px]' />
                <div className='flex justify-between mt-2'>
                    <p className="text-lg text-white"># of products</p>
                    <p className="text-lg text-white">{cart.numberOfProducts}</p>
                </div>
                <div className='flex justify-between'>
                    <p className="text-lg text-white">Cart total</p>
                    <p className="text-lg text-white">${cart.total}.00</p>
                </div>
                <button
                    className="w-full mt-4 bg-red-500 text-white"
                    onClick={handleClearCart}>Clear cart</button>
            </section>
        </main>
    )
}

export default Cart