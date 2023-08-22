import * as CheckboxRadix from '@radix-ui/react-checkbox'

import checkboxBorderImg from '../../../assets/images/checkbox-border.svg'
import disabledCheckedImg from '../../../assets/images/checkbox-disabled-checked.svg'
import checkboxImg from '../../../assets/images/checkbox.svg'
import disabledUncheckedImg from '../../../assets/images/disabled-checkbox-unchecked.svg'

import s from './checkbox.module.scss'

type PropsType = {
  checked: boolean
  onChange: (checked: boolean) => void
  text?: string
  disabled?: boolean
  required?: boolean
  id?: string
  className?: string
}

export const Checkbox = (props: PropsType) => {
  const { checked, text, disabled, onChange, required, id } = props

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
      className={s.checkboxRoot}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      required={required}
      id={id}
    >
      <div className={s.checkboxContainer}>
        <img src={checkboxImageSrc} alt="checkbox" className={s.customCheckboxSvg} />
      </div>
      <label className={s.textContainer} aria-label={text}>
        <span className={`${s.textContent} ${disabled ? s.textDisabled : ''}`}>{text}</span>
      </label>
    </CheckboxRadix.Root>
  )
}
