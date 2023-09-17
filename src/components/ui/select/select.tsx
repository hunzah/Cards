import { useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import selectArrow from '../../../assets/icons/select-arrow.svg'

import s from './select.module.scss'

import { Typography, TypographyVariantTypes } from '@/components/ui/typography'

type PropsType = {
  options: number[] | string[]
  setItemsPerPage: (value: number) => void
  contentClassName?: string
  itemClassName?: string
  isDisabled?: boolean
  defaultValue?: number
  name?: string
  placeholder?: string
  required?: boolean
  textStyle: TypographyVariantTypes
}

type SelectItemPropsType = {
  options: number[] | string[]
  className: string
  textStyle: TypographyVariantTypes
}

export const Select = (props: PropsType) => {
  const {
    isDisabled = false,
    options,
    setItemsPerPage,
    contentClassName,
    itemClassName,
    required,
    defaultValue,
    textStyle,
  } = props

  const classNames = {
    button: clsx(s.button, isDisabled && s.disabled),
    content: clsx(s.content, contentClassName && contentClassName),
    item: clsx(s.item, itemClassName && itemClassName),
  }

  const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : options[0])

  const setSelectedValueHandler = (e: number) => {
    setSelectedValue(e)
    setItemsPerPage(e)
  }

  return (
    <SelectRadix.Root
      required={required}
      disabled={isDisabled}
      onValueChange={e => setSelectedValueHandler(Number(e))}
    >
      <SelectRadix.Trigger className={classNames.button}>
        <SelectRadix.Value placeholder={selectedValue} className={s.placeholder} />
        <img src={selectArrow} alt="sellect-arrow-icon" className={s.arrowImg} />
      </SelectRadix.Trigger>

      <SelectRadix.Content className={classNames.content} position="popper" collisionPadding={0}>
        <SelectRadix.Group>
          <SelectRadix.Label>
            <SelectItem className={classNames.item} options={options} textStyle={textStyle} />
          </SelectRadix.Label>
        </SelectRadix.Group>
      </SelectRadix.Content>
    </SelectRadix.Root>
  )
}
const SelectItem = (props: SelectItemPropsType) => {
  const { options, className, textStyle, ...rest } = props

  return (
    <>
      {options.map((option, i) => (
        <SelectRadix.Item key={i} value={option.toString()} className={className} {...rest}>
          <SelectRadix.ItemText>
            <Typography variant={textStyle}>{option}</Typography>
          </SelectRadix.ItemText>
        </SelectRadix.Item>
      ))}
    </>
  )
}
