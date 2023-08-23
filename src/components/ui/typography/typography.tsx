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
  variant?: keyof typeof VARIANTS
} & PropsOf<Tag>

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

const createTypography = <T extends ReactTag>(basicClassName: keyof typeof VARIANTS) => {
  return ({ children, className, component, variant, ...rest }: TypographyType<T>) => {
    const Component = component || basicClassName

    const classNames = className ? `${s[basicClassName]} ${className}` : s[basicClassName]

    const variantStyles = variant ? VARIANTS[variant] : basicClassName

    return (
      <Component variant={variantStyles} className={classNames} {...rest}>
        {children}
      </Component>
    )
  }
}

export const Typography = {
  Large: createTypography('large'),
  H1: createTypography('h1'),
  H2: createTypography('h2'),
  H3: createTypography('h3'),
  Body1: createTypography('body1'),
  Body2: createTypography('body2'),
  Subtitle1: createTypography('subtitle1'),
  Subtitle2: createTypography('subtitle2'),
  Caption: createTypography('caption'),
  Overline: createTypography('overline'),
  Link1: createTypography('link1'),
  Link2: createTypography('link2'),
}
