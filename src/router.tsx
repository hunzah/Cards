import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom'
import { Decks } from '@/pages/decks'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  }, //вот эти чилдрены
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

//ррд штука в нее рендерится всё что передаётся в чилдренов оутлет для отрисовки чилдренов
