import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type PropsType = {
  children?: ReactNode
  className?: string
}

export const Card = ({ children, className }: PropsType) => {
  const classNames = { container: clsx(s.container, className) }

  return <div className={classNames.container}>{children}</div>
}
