import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import selectArrow from '../../../assets/icons/select-arrow.svg'

import s from './select.module.scss'

import { Typography, TypographyVariantTypes } from '@/components/ui/typography'

type PropsType = {
  options: number[] | string[]
  value?: string
  callback: (e: string) => void
  contentClassName?: string
  itemClassName?: string
  buttonClassName?: string
  isDisabled?: boolean
  defaultValue?: number
  name?: string
  placeholder?: string
  required?: boolean
  textStyle?: TypographyVariantTypes
}

type SelectItemPropsType = {
  options: number[] | string[]
  className: string
  textStyle?: TypographyVariantTypes
}

export const Select = (props: PropsType) => {
  const {
    isDisabled = false,
    options,
    callback,
    contentClassName,
    itemClassName,
    required,
    textStyle,
    buttonClassName,
    value,
  } = props

  const classNames = {
    button: clsx(s.button, isDisabled && s.disabled, buttonClassName),
    content: clsx(s.content, contentClassName && contentClassName),
    item: clsx(s.item, itemClassName && itemClassName),
  }

  const setSelectedValueHandler = (e: string) => {
    callback(e)
  }

  return (
    <SelectRadix.Root
      required={required}
      disabled={isDisabled}
      onValueChange={e => setSelectedValueHandler(e.toString())}
      value={value ? value : '10'}
    >
      <SelectRadix.Trigger className={classNames.button}>
        <SelectRadix.Value
          /*placeholder={defaultValue ? defaultValue : options[0]}*/
          className={s.placeholder}
        />
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
            <Typography variant={textStyle ? textStyle : 'body1'}>{option}</Typography>
          </SelectRadix.ItemText>
        </SelectRadix.Item>
      ))}
    </>
  )
}
