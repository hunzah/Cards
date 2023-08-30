import { useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

import arrowCloseIcon from '../../../assets/images/select-close-arrow.svg'
import arrowOpenIcon from '../../../assets/images/select-open-arrow.svg'

// import s from './select.module.scss'

type PropsType = {
  isDisabled?: boolean
  options: string[]
}

export const Select = (props: PropsType) => {
  const { isDisabled, options } = props

  const mappedOptions = options.map((el, i) => {
    return (
      <SelectRadix.Item key={i} value={el}>
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
    >
      <SelectRadix.Trigger>
        <SelectRadix.Icon>
          {isSelectOpen ? (
            <img src={arrowCloseIcon} alt={'arrow-close-icon-for-select'} />
          ) : (
            <img src={arrowOpenIcon} alt={'arrow-open-icon-for-select'} />
          )}
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Content className="SelectContent" position="popper">
        {mappedOptions}
      </SelectRadix.Content>
    </SelectRadix.Root>
  )
}
