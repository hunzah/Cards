import { useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import arrowCloseIcon from '../../../assets/images/select-close-arrow.svg'
import arrowOpenIcon from '../../../assets/images/select-open-arrow.svg'

import s from './select.module.scss'

type PropsType = {
  contentClassName?: string
  itemClassName?: string
  isDisabled?: boolean
  options: string[]
  defaultValue?: string
  name?: string
  placeholder?: string
  required?: boolean
}

export const Select = (props: PropsType) => {
  const {
    isDisabled,
    options,
    defaultValue,
    contentClassName,
    itemClassName,
    name,
    required,
    placeholder,
  } = props

  const classNames = {
    // disabled: clsx(isDisabled && s.disabled),
    button: clsx(s.button, isDisabled && s.disabled),
    content: clsx(s.content, contentClassName && contentClassName),
    item: clsx(s.item, itemClassName && itemClassName),
  }

  const mappedOptions = options.map((el, i) => {
    return (
      <SelectRadix.Item key={i} value={el} placeholder={'fdsfg'} className={classNames.item}>
        {el}
      </SelectRadix.Item>
    )
  })

  const [isSelectOpen, setIsSelectIsOpen] = useState(false)

  return (
    <SelectRadix.Root
      value={'ds'}
      disabled={isDisabled}
      open={isSelectOpen}
      onOpenChange={() => setIsSelectIsOpen(!isSelectOpen)}
      name={name}
      required={required}
    >
      <SelectRadix.Trigger className={classNames.button}>
        <SelectRadix.Value placeholder="Pick an option" />

        <SelectRadix.Icon>
          {isSelectOpen ? (
            // <ChevronDownIcon />
            <img src={arrowCloseIcon} alt={'arrow-close-icon-for-select'} />
          ) : (
            // <ChevronUpIcon />
            <img src={arrowOpenIcon} alt={'arrow-open-icon-for-select'} />
          )}
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content alignOffset={0} className={classNames.content} position="popper">
          {mappedOptions}
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
