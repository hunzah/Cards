import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { DecksPage } from '@/pages/decks-page.tsx'
import { SignInPage } from '@/pages/signIn-page.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
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
