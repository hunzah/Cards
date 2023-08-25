import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import closeImg from '@/assets/icons/close.svg'
import eyeImg from '@/assets/icons/eye-outline.svg'
import searchImg from '@/assets/icons/searchOutline.svg'

export type TextFieldProps = {
  inputIsSearch: boolean
  inputType: string
  value?: string
  inputName?: string
  errorMessage?: string
  onClearClick?: () => void
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onChangeValue?: (newValue: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = (
  props: TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>
) => {
  const {
    inputType,
    inputName,
    inputIsSearch,
    errorMessage = false,
    onClearClick,
    onEnter,
    onChangeValue,
  } = props

  const [inputValue, setInputValue] = useState<string>('')
  const [internalInput, setInternalInput] = useState<string>(inputType)

  const isShowClearButton = inputIsSearch && onClearClick && inputValue
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

    setInputValue(newValue)
    onChangeValue && onChangeValue(newValue)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isShowClearButton && e.key === 'Enter' && onEnter) {
      onEnter(e)
    }
  }
  const onClickHandler = () => {
    onClearClick && !inputIsPassword && setInputValue('')
    inputIsPassword &&
      setInternalInput(previousValue => (previousValue === 'password' ? 'text' : 'password'))
  }

  return (
    <div className={s.inputMain}>
      <div className={s.internalBlock}>
        <label>
          {inputName && !inputIsSearch && <span className={s.inputName}>{inputName}</span>}
          <div className={s.inputContainer}>
            {inputIsSearch && (
              <button className={s.searchButton}>
                <img src={searchImg} alt={'search logo'} />
              </button>
            )}
            <input
              className={styleNameForInput}
              type={internalInput}
              placeholder={props.placeholder}
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={onChangeHandler}
            />
            {isShowClearButton && (
              <button onClick={onClickHandler} className={s.clearSearchButton}>
                <img src={closeImg} alt={'search logo'} />
              </button>
            )}
            {inputIsPassword && (
              <button onClick={onClickHandler} className={s.showPasswordButton}>
                <img src={eyeImg} alt={'search logo'} />
              </button>
            )}
          </div>
        </label>
        {showError && <div className={s.error}>{errorMessage}</div>}
      </div>
    </div>
  )
}
