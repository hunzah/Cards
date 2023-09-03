// import { AuthForm } from ''
import { SignIn } from '@/components/auth/sing-in'

export function App() {
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <SignIn onSubmit={handleFormSubmitted} />
    </div>
  )
}
