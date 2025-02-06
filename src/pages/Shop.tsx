import { products } from "../data.json";
import Item from '../components/Item';
import { Link } from 'react-router';

type Product = {
    name: string,
    price: number
}

const Shop = () => {

    return (
        <main className='h-full w-full flex items-center relative flex-col'>
            <div className='flex flex-wrap gap-4 mx-auto w-full'>
                {products.map((product: Product) => (
                    <Item key={product.name} name={product.name} price={product.price} readOnly={false}/>
                ))}
            </div>
            <Link to="/cart"><button className="mt-5 bg-blue-900">Go to Cart</button></Link>
        </main>
    )
}

export default Shop;