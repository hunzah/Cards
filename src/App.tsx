import { useState } from 'react'

import { Provider } from 'react-redux'

import { Header } from '@/components/ui/header/header.tsx'
import { Router } from '@/router'
import { store } from '@/services/store'
import { CheckEmail } from '@/components/auth/check-email-form/check-email.tsx'
import {Decks} from "@/pages/decks";
import {useGetMeQuery} from "@/services/auth/auth.service";
import {Navigate} from "react-router-dom";

export function App() {
  const [checked, setChecked] = useState(false)
  const switches = [
    { id: 1, switchTitle: 'first', disabled: false },
    { id: 2, switchTitle: 'second', disabled: false },
    { id: 3, switchTitle: 'third', disabled: true },
  ]
  return (
    <div>

      <Provider store={store}>
          <Header name="Ivan" />
        <Router />
      </Provider>
    </div>
  )
}
