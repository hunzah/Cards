import { toast } from 'react-toastify'

export type ErrorDataType = {
  message: string
  path: string
  statusCode: string
  timestamp: string
}

export type CustomerError = {
  data: ErrorDataType
  status: number
}

export type SingUpError400 = {
  data: { errorMessages: string[] }
  status: number
}

export type FethError = {
  error: string
  status: string
}

export type GeneralErrorType = CustomerError | FethError | SingUpError400

export const handleApiError = (err: GeneralErrorType) => {
  if ('data' in err) {
    if (err.status === 400) {
      const errData = err as SingUpError400

      toast.error(errData.data.errorMessages[0], {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
    const errMsg = err.data as ErrorDataType

    toast.error(errMsg.message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  } else if ('error' in err) {
    toast.error(err.error, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  } else {
    toast.error('Some error', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  // return (newError = <h1>{err.data.message}</h1>)
}
