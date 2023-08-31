import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import closeImg from '@/assets/icons/close.svg'
import eyeImg from '@/assets/icons/eye-outline.svg'
import searchImg from '@/assets/icons/searchOutline.svg'
import { Label } from '@/components/ui/label/label.tsx'
import { Typography } from '@/components/ui/typography'

export type TextFieldProps = {
  inputIsSearch: boolean
  inputType: 'text' | 'password'
  label?: string
  value?: string
  inputName?: string
  errorMessage?: string
  onClearClick?: () => void
  onChangeValue?: (e: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = (
  props: TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>
) => {
  const {
    inputType,
    label,
    inputIsSearch,
    errorMessage = false,
    onClearClick,
    onChangeValue,
  } = props

  //const [inputValue, setInputValue] = useState<string>('')
  const [internalInput, setInternalInput] = useState<string>(inputType)

  const isShowClearButton = inputIsSearch && onClearClick && props.value
  const inputIsPassword = inputType === 'password'
  const showError = errorMessage && errorMessage.length > 0

  const inputClassName = {
    standardInput: clsx(s.inputStandard, showError && s.error),
    searchInput: clsx(s.inputSearch, showError && s.error),
    passwordInput: clsx(s.inputPassword, showError && s.error),
  }

  function getStyleNameForInput(isPassword: boolean, isSearch: boolean) {
    if (isPassword) {
      return inputClassName.passwordInput
    } else if (isSearch) {
      return inputClassName.searchInput
    } else {
      return inputClassName.standardInput
    }
  }

  const styleNameForInput = getStyleNameForInput(inputIsPassword, inputIsSearch)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value

    //setInputValue(newValue)
    onChangeValue && onChangeValue(newValue)
  }

  const onClickHandler = () => {
    onClearClick && !inputIsPassword && props.value?.length
    inputIsPassword &&
      setInternalInput(previousValue => (previousValue === 'password' ? 'text' : 'password'))
  }

  return (
    <div className={s.inputMain}>
      <div className={s.internalBlock}>
        {props.inputName && !inputIsSearch && (
          <Typography className={s.inputName} variant="body2">
            {props.inputName}
          </Typography>
        )}
        <Label label={label && label}>
          <div className={s.inputContainer}>
            {inputIsSearch && (
              <button className={s.searchButton} type={'button'}>
                <img src={searchImg} alt={'search logo'} />
              </button>
            )}
            <input
              className={styleNameForInput}
              type={internalInput}
              placeholder={props.placeholder}
              value={props.value}
              onChange={onChangeHandler}
            />
            {isShowClearButton && (
              <button onClick={onClickHandler} className={s.clearSearchButton} type={'button'}>
                <img src={closeImg} alt={'search logo'} />
              </button>
            )}
            {inputIsPassword && (
              <button onClick={onClickHandler} className={s.showPasswordButton} type={'button'}>
                <img src={eyeImg} alt={'search logo'} />
              </button>
            )}
          </div>
        </Label>
        {showError && <div className={s.error}>{errorMessage}</div>}
      </div>
    </div>
  )
}
