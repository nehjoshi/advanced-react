import { useSelector } from 'react-redux';
import '../App.css'
import { Link } from 'react-router'
import { RootState } from '../state/store';

function Home() {
  // const [count, setCount] = useState(0)
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <main className="flex flex-col gap-4">
      <h1 className='font-bold'>Hello There</h1>
      <h4 className='text-xl'>This is a smaller heading</h4>
      <h3 className='text-2xl text-blue-900 font-bold'>Count: {count}</h3>
      <Link to="/about"><button>About Us</button></Link>
      <Link to="/shop"><button>Start shopping</button></Link>
    </main>
  )
}

export default Home;
