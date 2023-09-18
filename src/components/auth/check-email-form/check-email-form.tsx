import { Link } from 'react-router-dom'

import checkEmailIcon from '@/assets/images/check-email.svg'
import s from '@/components/auth/check-email-form/check-email.module.scss'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'

export const CheckEmailForm = () => {
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

      <Button type={'link'} fullWidth={true} as={Link} to="/login" className={s.buttonLink}>
        Try logging in
      </Button>
    </Card>
  )
}
