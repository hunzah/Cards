import s from './forgot-password.module.scss'

import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const ForgotPassword = () => {
  return (
    <div>
      <Card className={s.container}>
        <Typography variant="large" component="div">
          Forgot your password?
        </Typography>
      </Card>
    </div>
  )
}
