import React from 'react'
import { Card } from '@/components/ui/card'
import s from '@/components/auth/check-email-form/check-email.module.scss'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import checkEmailIcon from '@/assets/images/check-email.svg'
import { Label } from '@/components/ui/label'

export const CheckEmail = () => {
  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Check Email
      </Typography>
      <img src={checkEmailIcon} className={s.icon} alt={'check-email-icon'} />
      <Label
        label={' We’ve sent an Email with instructions to example@mail.com'}
        className={s.label}
      />

      <Button type={'link'} fullWidth={true} as={'a'} className={s.buttonLink}>
        Try logging in
      </Button>
    </Card>
  )
}
