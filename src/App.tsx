import { useState } from 'react'

import { Provider } from 'react-redux'

import { SignInForm } from '@/components/auth/sing-in-form'
import { Router } from '@/router'
import { store } from '@/services/store'

export function App() {
  const [checked, setChecked] = useState(false)
  const switches = [
    { id: 1, switchTitle: 'first', disabled: false },
    { id: 2, switchTitle: 'second', disabled: false },
    { id: 3, switchTitle: 'third', disabled: true },
  ]
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <SignInForm onSubmit={handleFormSubmitted} />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}
