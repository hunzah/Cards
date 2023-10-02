import { ChangeEvent } from 'react'

import s from './inputTypeFile.module.scss'

import edit from '@/assets/icons/edit-pack.svg'
import profDefaultPicture from '@/assets/images/prof-picture.jpg'
import ComponentWithSvg from '@/components/ComponentWithSVG'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks'
import { setMe } from '@/services/auth/auth.slice'

type ADd = {
  addPhoto: (a: any) => void
  photo: string
}

export const InputTypeFile = (props: ADd) => {
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      convertFileToBase64(file, (file64: string) => {
        props.addPhoto(file)
        dispatch(setMe({ avatar: file64 }))
      })

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(setMe({ avatar: file64 }))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }
  const errorHandler = () => {
    dispatch(setMe({ avatar: profDefaultPicture }))
  }

  return (
    <div>
      <img src={props.photo} className={s.avatar} onError={errorHandler} alt={'photo'} />
      <label className={s.editIcon} style={{ width: '50px' }}>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />

        <Button
          as={'span'}
          variant={'secondary'}
          style={{ position: 'absolute', width: '30px', bottom: '8px', padding: '6px 14px' }}
        >
          <ComponentWithSvg svg={edit} />
        </Button>
      </label>
    </div>
  )
}
