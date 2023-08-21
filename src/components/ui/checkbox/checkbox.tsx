import * as Checkbox from '@radix-ui/react-checkbox'

import CheckboxSvg from '../../../assets/images/Checkbox.svg'
import CheckboxBorderSvg from '../../../assets/images/CheckboxBorderSvg.svg'

import s from './checkbox.module.scss'

type PropsType = {
  isChecked: boolean
}

export const CheckboxDemo = (props: PropsType) => {
  const { isChecked } = props

  return (
    <Checkbox.Root className={s.CheckboxRoot} checked={isChecked}>
      {isChecked ? (
        <img src={CheckboxSvg} alt="Custom Checkbox" className={s.CustomCheckboxSvg} />
      ) : (
        <img src={CheckboxBorderSvg} alt="Custom Checkbox" className={s.CustomCheckboxSvg} />
      )}
    </Checkbox.Root>
  )
}
