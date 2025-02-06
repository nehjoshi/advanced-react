import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { decrement, increment, incrementByAmount } from "../state/counter/counterSlice";
import { useState } from "react";


const About = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const [num, setNum] = useState(0);
  return (
    <main className='h-full w-full flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold text-white'>About Us</h1>
      <p className="text-lg">Welcome to the about us page</p>
      <h2 data-testid="count">Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input
        type="number"
        className="mt-3 p-3 border-2 border-blue-900 rounded-md"
        placeholder="Increment by number"
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <button className="mt-3" onClick={() => dispatch(incrementByAmount(num))}>Submit</button>
    </main>
  )
}

export default About;