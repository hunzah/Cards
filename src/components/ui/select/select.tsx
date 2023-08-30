import * as SelectRadix from '@radix-ui/react-select'

// import s from './select.module.scss'

type PropsType = {
  isDisabled: boolean
}

export const Select = (props: PropsType) => {
  const { isDisabled } = props

  return (
    <SelectRadix.Root value={'ds'} disabled={isDisabled}>
      <SelectRadix.Trigger>
        <SelectRadix.Value />
        <SelectRadix.Icon></SelectRadix.Icon>
      </SelectRadix.Trigger>
    </SelectRadix.Root>
  )
}
