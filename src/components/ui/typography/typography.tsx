import { ComponentProps, ElementType, JSXElementConstructor, ReactNode } from 'react'

import s from './typography.module.scss'

export type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentProps<TTag>, 'ref'>
  : never

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>

type TypographyType<Tag extends ReactTag> = {
  children: ReactNode
  className?: string
  component?: Tag
  variant?: string
} & PropsOf<Tag>

const createTypography = () => {}

export const Typography = () => {
  return <div className={s.container}>card card</div>
}
