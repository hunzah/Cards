import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-new-card.module.scss'

import addPhotoCover from '@/assets/icons/cover-add-photo.svg'
import { ControlledTextField, Select, TemplateModal, Typography } from '@/components'
import { useCreateCardMutation } from '@/services/decks/decks.service.ts'
import { FormDataType } from '@/services/decks/types.ts'

type Props = {
  id: string
  closeModalCallback: (isAddNewPackOpen: boolean) => void
  isOpen: boolean
}

const createCardSchema = z.object({
  question: z.string().min(3),
  questionImg: z.any(),
  answer: z.string().min(3),
  answerImg: z.any(),
})

type FormValuesType = z.infer<typeof createCardSchema>
export const AddNewCardWithForm = ({ closeModalCallback, id, isOpen }: Props) => {
  const [createCard, { isLoading }] = useCreateCardMutation()
  const [questionType, setQuestionType] = useState<string>('Text')
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const QuestionType = (e: string) => setQuestionType(e)

  //logic to close the modal when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      closeModalCallback(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, clickedOutside])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      question: '',
      questionImg: '',
      answer: '',
      answerImg: '',
    },
  })

  const handleFormSubmitted = handleSubmit(data => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg[0])
    formData.append('answerImg', data.answerImg[0])
    questionType === 'Text'
      ? createCard({
          id: id,
          formData: {
            question: data.question,
            answer: data.answer,
          },
        })
      : createCard({ id: id, formData: formData as unknown as FormDataType })

    closeModalCallback(false)
  })

  return (
    <form className={s.content} onSubmit={handleFormSubmitted}>
      <TemplateModal
        ref={menuRef}
        className={s.root}
        title="Add New Card"
        buttonName="Add New Card"
        closeModalCallback={closeModalCallback}
        mainActionCallback={() => {}}
      >
        <div>
          <Typography className={s.selectName} variant="body2">
            Choose a question format
          </Typography>
          <Select
            callback={QuestionType}
            options={['Text', 'Video', 'Photo']}
            textStyle={'body1'}
            buttonClassName={s.select}
          />
        </div>
        <ControlledTextField
          placeholder={'write a question'}
          errorMessage={errors.question?.message}
          inputIsSearch={false}
          inputType={'text'}
          label={'Question'}
          name={'question'}
          control={control}
          inputName="question"
          className={s.input}
        />
        {questionType === 'Photo' && (
          <div>
            <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
              <img src={addPhotoCover} alt={'cover-add-photo'} />
              <input type="file" className={s.addImgInput} {...register('questionImg')} />
            </label>
          </div>
        )}
        <ControlledTextField
          placeholder={'write your answer '}
          errorMessage={errors.question?.message}
          inputIsSearch={false}
          inputType={'text'}
          name={'answer'}
          control={control}
          inputName="answer"
          className={s.input}
        />
        {questionType === 'Photo' && (
          <div>
            <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
              <img src={addPhotoCover} alt={'cover-add-photo'} />
              <input type="file" className={s.addImgInput} {...register('answerImg')} />
            </label>
          </div>
        )}
        {isLoading && (
          <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>
            Loading...
          </div>
        )}
      </TemplateModal>
    </form>
  )
}
