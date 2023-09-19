import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'
import {Header} from "@/components/ui/header";

export function App() {
  return (
    <div>
      <Provider store={store}>
          <Header/>
        <Router />
      </Provider>
    </div>
  )
}
