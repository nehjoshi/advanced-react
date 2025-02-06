import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import Cart from './pages/Cart.tsx'

const AboutComp = lazy(() => import('./pages/About.tsx'));
const ShopComp = lazy(() => import('./pages/Shop.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <AboutComp />
            </Suspense>
          }
          />
          <Route path="/shop" element={
            <Suspense fallback={<h1>Loading the shop...</h1>}>
              <ShopComp />
            </Suspense>
          }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)