import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { Decks } from '@/pages/decks'
import { SignIn } from '@/pages/SignIn.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn />,
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
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>Loading...</div>

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()
  const isAuthenticated = me && me?.success !== false

  if (isMeLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

//ррд штука в нее рендерится всё что передаётся в чилдренов оутлет для отрисовки чилдренов
