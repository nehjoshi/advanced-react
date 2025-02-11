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

const About = lazy(() => import('./pages/About.tsx'));
const Shop = lazy(() => import('./pages/Shop.tsx'))

const queryClient = new QueryClient();

type Route = {
  path: string,
  element: React.ReactNode,
  lazyLoad: boolean,
  lazyLoadMessage?: string,
}

const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
    lazyLoad: false,
  },
  {
    path: "/about",
    element: <About />,
    lazyLoad: true,
    lazyLoadMessage: "Loading about page..."
  },
  {
    path: "/shop",
    element: <Shop />,
    lazyLoad: true,
    lazyLoadMessage: "Loading shop..."
  },
  {
    path: "/cart",
    element: <Cart />,
    lazyLoad: false,
  },
  {
    path: "/fun",
    element: <Fun />,
    lazyLoad: false,
  },
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {routes.map((route) => route.lazyLoad ?
              (
                <Route key={route.path} path={route.path} element={
                  <Suspense fallback={<h1>{route.lazyLoadMessage}</h1>}>
                    {route.element}
                  </Suspense>}
                />
              )
              :
              (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)