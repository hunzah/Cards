import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import selectArrow from '../../../assets/images/select-arrow.svg'

import s from './select.module.scss'

import { Typography } from '@/components/ui/typography'

export type OptionType = {
  id?: string | number
  option: string
}

type SelectPropsType = {
  contentClassName?: string
  itemClassName?: string
  isDisabled?: boolean
  options: OptionType[]
  defaultValue?: string
  name?: string
  placeholder?: string
  required?: boolean
}

type SelectItemPropsType = {
  options: OptionType[]
  className: string
}

export const Select = (props: SelectPropsType) => {
  const {
    isDisabled = false,
    options,
    contentClassName,
    itemClassName,
    required,
    placeholder,
  } = props

  const classNames = {
    button: clsx(s.button, isDisabled && s.disabled),
    content: clsx(s.content, contentClassName && contentClassName),
    item: clsx(s.item, itemClassName && itemClassName),
  }

  return (
    <SelectRadix.Root required={required} disabled={isDisabled}>
      <SelectRadix.Trigger className={classNames.button}>
        <img src={selectArrow} alt="sellect-arrow-icon" className={s.arrowImg} />
        <SelectRadix.Value style={{ backgroundColor: 'black' }} placeholder={placeholder} />
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className={classNames.content} position="popper">
          <SelectRadix.Group>
            <SelectItem className={classNames.item} options={options} />
          </SelectRadix.Group>

          <SelectRadix.ScrollDownButton className="SelectScrollButton"></SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
const SelectItem = (props: SelectItemPropsType) => {
  const { options, className, ...rest } = props

  const items = options.map((el, i) => (
    <SelectRadix.Item key={el.id ? el.id : i} value={el.option} className={className} {...rest}>
      <SelectRadix.ItemText>
        <Typography variant={'body1'} component={'span'}>
          {el.option}
        </Typography>
      </SelectRadix.ItemText>
    </SelectRadix.Item>
  ))

  return <>{items}</>
}
