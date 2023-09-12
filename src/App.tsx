import { Provider } from 'react-redux'

import { Card } from '@/components/ui/card'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <Card />
    </Provider>
  )
}
