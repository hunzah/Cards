import { useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import selectArrow from '../../../assets/images/select-arrow.svg'

import s from './select.module.scss'

import { Typography } from '@/components/ui/typography'

type PropsType = {
  options: number[] | string[]
  // onChange: (value: number) => void
  contentClassName?: string
  itemClassName?: string
  isDisabled?: boolean
  defaultValue?: number
  name?: string
  placeholder?: string
  required?: boolean
}

type SelectItemPropsType = {
  options: number[] | string[]
  className: string
  setSelectedValue: any
}

export const Select = (props: PropsType) => {
  const {
    isDisabled = false,
    options,
    // onChange,
    contentClassName,
    itemClassName,
    required,
    defaultValue,
  } = props

  const classNames = {
    button: clsx(s.button, isDisabled && s.disabled),
    content: clsx(s.content, contentClassName && contentClassName),
    item: clsx(s.item, itemClassName && itemClassName),
  }
  // const selectedValue = placeholder ? placeholder : options[0]
  const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : options[0])

  // const handleValueChange = (value: number | undefined) => {
  //   onChange(value)
  //   setSelectedValue(value)
  //   console.log(value)
  // }

  return (
    <SelectRadix.Root required={required} disabled={isDisabled}>
      <SelectRadix.Trigger className={classNames.button}>
        <SelectRadix.Value placeholder={selectedValue} className={s.placeholder} />
        <img src={selectArrow} alt="sellect-arrow-icon" className={s.arrowImg} />
      </SelectRadix.Trigger>

      <SelectRadix.Content className={classNames.content} position="popper">
        <SelectRadix.Group>
          <SelectRadix.Label>
            <SelectItem
              className={classNames.item}
              options={options}
              // onChange={handleValueChange}
              setSelectedValue={setSelectedValue}
            />
          </SelectRadix.Label>
        </SelectRadix.Group>
      </SelectRadix.Content>
    </SelectRadix.Root>
  )
}
const SelectItem = (props: SelectItemPropsType) => {
  const { options, className, setSelectedValue, ...rest } = props

  return (
    <>
      {options.map((option, i) => (
        <SelectRadix.Item key={i} value={option.toString()} className={className} {...rest}>
          <SelectRadix.ItemText>
            <Typography variant={'body1'} component={'span'}>
              {option}
            </Typography>
          </SelectRadix.ItemText>
        </SelectRadix.Item>
      ))}
    </>
  )
}
