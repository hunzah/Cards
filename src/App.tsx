import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
