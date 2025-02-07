import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import Cart from './pages/Cart.tsx'
import Fun from './pages/Fun'

const AboutComp = lazy(() => import('./pages/About.tsx'));
const ShopComp = lazy(() => import('./pages/Shop.tsx'))

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
            <Route path="/fun" element={<Fun />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)