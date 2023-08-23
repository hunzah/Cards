import { ComponentProps, ElementType, JSXElementConstructor, ReactNode } from 'react'

import s from './typography.module.scss'

export type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentProps<TTag>, 'ref'>
  : never

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>

type TypographyVariantTypes =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'

type TypographyPropsType = {
  children: ReactNode
  className?: string
  component?: keyof JSX.IntrinsicElements
  variant?: TypographyVariantTypes
}

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
