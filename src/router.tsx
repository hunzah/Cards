import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { PageNotFound } from '@/pages/404-page/404-page.tsx'
import { DecksPage } from '@/pages/decks-page.tsx'
import { SignInPage } from '@/pages/signIn-page.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service'

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
  {
    path: '*',
    element: <PageNotFound />,
  },
])

export const Router = () => {
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) {
    return <>MELsOAD</>
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me, isLoading: ssss } = useGetMeQuery()
  const isAuthenticated = me && me?.success !== false

  if (ssss) {
    return <div>MELOAD</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

//ррд штука в нее рендерится всё что передаётся в чилдренов оутлет для отрисовки чилдренов
