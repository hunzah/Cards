import { CreateNewPassword } from '@/components/auth/create-new-password-form'

const handle = () => {
  console.log('submit')
}

export function App() {
  return (
    <div style={{ display: 'flex' }}>
      <CreateNewPassword onSubmit={handle} />
    </div>
  )
}
