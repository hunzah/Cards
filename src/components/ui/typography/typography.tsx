import { ComponentProps, ElementType, JSXElementConstructor, ReactNode } from 'react'

import s from './typography.module.scss'

export type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentProps<TTag>, 'ref'>
  : never

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>

type TypographyPropsType = {
  children: ReactNode
  className?: string
  component?: keyof JSX.IntrinsicElements
  variant?: keyof typeof VARIANTS
}

type IntrinsicElementKeys = keyof JSX.IntrinsicElements

const VARIANTS: Record<string, IntrinsicElementKeys> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body2: 'p',
  subtitle1: 'p',
  subtitle2: 'p',
  caption: 'span',
  overline: 'p',
  link1: 'a',
  link2: 'a',
} as const

export const Typography = ({
  children,
  className,
  component,
  variant,
  ...rest
}: TypographyPropsType) => {
  const Component = component || 'span'

  const classNames = className || ''
  const variantClassName = variant ? s[variant] : ''

  const combinedClassNames = `${classNames} ${variantClassName}`

  return (
    <Component className={combinedClassNames} {...rest}>
      {children}
    </Component>
  )
}
