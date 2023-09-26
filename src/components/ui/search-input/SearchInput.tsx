import { ChangeEvent } from 'react'

import { TextField } from '@/components/ui/text-field'

type SearchInputProps = {
  value: string
  setValue: (value: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
  const { value, setValue } = props
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  return (
    <div>
      <TextField inputIsSearch inputType={'text'} value={value} onChange={onChangeHandler} />
    </div>
  )
}
