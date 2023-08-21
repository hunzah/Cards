import * as CheckboxRadix from '@radix-ui/react-checkbox'

import checkboxSvg from '../../../assets/images/checkbox.svg'
import checkboxBorderSvg from '../../../assets/images/checkboxBorderSvg.svg'

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
        {checked ? (
          <img src={checkboxSvg} alt="checkbox" className={s.customCheckboxSvg} />
        ) : (
          <img src={checkboxBorderSvg} alt="checkbox-border" className={s.customCheckboxSvg} />
        )}
      </div>
      <label className={s.textContainer} aria-label={text}>
        <span className={s.textContent}>{text}</span>
      </label>
    </CheckboxRadix.Root>
  )
}
