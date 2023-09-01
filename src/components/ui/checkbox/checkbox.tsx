import * as CheckboxRadix from '@radix-ui/react-checkbox'

import checkboxBorderImg from '../../../assets/images/checkbox-border.svg'
import disabledCheckedImg from '../../../assets/images/checkbox-disabled-checked.svg'
import checkboxImg from '../../../assets/images/checkbox.svg'
import disabledUncheckedImg from '../../../assets/images/disabled-checkbox-unchecked.svg'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  required?: boolean
  id?: string
  className?: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, className, label, disabled, onChange, required, id } = props

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
      className={`${s.checkboxRoot} ${className}`}
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
        <span className={`${s.textContent} ${disabled ? s.textDisabled : ''}`}>{label}</span>
      </label>
    </CheckboxRadix.Root>
  )
}
