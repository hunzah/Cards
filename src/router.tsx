import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { PageNotFound } from '@/pages/404-page/404-page.tsx'
import { CardsFromTheDeck } from '@/pages/cards-from-deck-page/cards-from-the-deck-page.tsx'
import { CheckEmailPage } from '@/pages/check-email-page/check-email-page.tsx'
import { DecksPage } from '@/pages/decks-page/decks-page.tsx'
import { ForgotPasswordPage } from '@/pages/forgot-password-page/forgot-password-page.tsx'
import { NewPasswordPage } from '@/pages/new-password-page/new-password-page.tsx'
import { PlayDeck } from '@/pages/play-deck-page/play-deck.tsx'
import { SignInPage } from '@/pages/signIn-page.tsx'
import { SingUpPage } from '@/pages/sing-up-page.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sing-up',
    element: <SingUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
  {
    path: '/confirm-email/:code',
    element: <NewPasswordPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/decks',
    element: <DecksPage />,
  },
  {
    path: '/decks/:deckId',
    element: <CardsFromTheDeck />,
  },
  {
    path: '/decks/:deckId/learn',
    element: <PlayDeck />,
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
