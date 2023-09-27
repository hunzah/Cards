import s from '../cardTitle/CardTitle.module.scss'

import { Typography } from '@/components/ui/typography'

type PropsType = {
  title: string
}

export const CardTitle = (props: PropsType) => {
  const { title } = props

  return (
    <div className={s.CardTitle}>
      <Typography variant={'large'}>{title}</Typography>
    </div>
  )
}
