import { Provider } from 'react-redux'

import { Header } from '@/components/ui/header'
import { Router } from '@/router'
import { store } from '@/services/store'

export function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Router />
      </Provider>
    </div>
  )
}
