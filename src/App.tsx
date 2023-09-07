import { useState } from 'react'

import { Provider } from 'react-redux'

import { Header } from '@/components/ui/header/header.tsx'
import { Router } from '@/router'
import { store } from '@/services/store'
import { CheckEmail } from '@/components/auth/check-email-form/check-email.tsx'

export function App() {
  const [checked, setChecked] = useState(false)
  const switches = [
    { id: 1, switchTitle: 'first', disabled: false },
    { id: 2, switchTitle: 'second', disabled: false },
    { id: 3, switchTitle: 'third', disabled: true },
  ]

  return (
    <div>
      <Header name="Ivan" />
      <CheckEmail />
      {/*<Provider store={store}>*/}
      {/*  <Router />*/}
      {/*</Provider>*/}
    </div>
  )
}
