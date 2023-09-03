import s from './create-new-password.module.scss'

import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const CreateNewPassword = () => {
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AuthTemplateCard
        onSubmit={handleFormSubmitted}
        title="Create new password"
        passwordInput
        passwordLabel="Create new password and we will send you further instructions to email"
        buttonName="Create New Password"
        className={s.form}
        titleClassName={s.title}
      />
    </>
  )
}
