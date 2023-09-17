import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import checkboxBorderImg from '../../../assets/icons/checkbox-border.svg'
import disabledCheckedImg from '../../../assets/icons/checkbox-disabled-checked.svg'
import checkboxImg from '../../../assets/icons/checkbox.svg'
import disabledUncheckedImg from '../../../assets/icons/disabled-checkbox-unchecked.svg'

import s from './checkbox.module.scss'

import { Typography } from '@/components/ui/typography'

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  required?: boolean
  id?: string
  className?: string
  labelClassName?: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, label, disabled, onChange, required, id, className, labelClassName } = props

  const classNames = {
    checkbox: clsx(s.checkboxRoot, className && s.className),
    label: clsx(s.textContent, labelClassName && labelClassName, disabled && s.textDisabled),
  }

  let checkboxImageSrc: string = checkboxBorderImg

  if (checked) {
    if (disabled) {
      checkboxImageSrc = disabledCheckedImg
    } else {
      checkboxImageSrc = checkboxImg
    }
  } else if (disabled) {
    checkboxImageSrc = disabledUncheckedImg
  }

  return (
    <CheckboxRadix.Root
      className={classNames.checkbox}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      required={required}
      id={id}
    >
      <div className={s.checkboxContainer}>
        <img src={checkboxImageSrc} alt="checkbox" className={s.customCheckboxSvg} />
      </div>
      <label className={s.textContainer} aria-label={label}>
        <Typography variant="body2" className={classNames.label}>
          {label}
        </Typography>
      </label>
    </CheckboxRadix.Root>
  )
}
