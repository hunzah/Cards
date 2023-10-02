import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import s from './edit-card.module.scss'

import addPhotoCover from '@/assets/icons/cover-add-photo.svg'
import { ControlledTextField } from '@/components'
import { TemplateModal } from '@/components/ui/modals/template'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import {
  setAnswerImgCard,
  setEditCardModalIsOpen,
  setQuestionImgCard,
} from '@/services/cards/cards.slice.ts'
import { useUpdateCardMutation } from '@/services/decks/decks.service.ts'
import { FormDataType } from '@/services/decks/types.ts'

type Props = {
  closeModalCallback: (value: boolean) => void
  name?: string
}

const editCardSchema = z.object({
  question: z.string().min(3),
  questionImg: z.any(),
  answer: z.string().min(3),
  answerImg: z.any(),
})

type FormValuesType = z.infer<typeof editCardSchema>
export const EditCardWithForm = ({ closeModalCallback }: Props) => {
  const { cardIdFromDeck, questionCard, answerCard, questionImgCard, answerImgCard } =
    useAppSelector(state => state.cards)

  const dispatch = useDispatch()

  //const cardId = useAppSelector(state => state.decks.cardId)
  //const { data: cardData } = useGetCardQuery({ id: cardId })
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const startTypeOfCard = questionImgCard ? 'Photo' : 'Text'

  /*const [questionType, setQuestionType] = useState<string>(startTypeOfCard)*/

  //const QuestionType = (e: string) => setQuestionType(e)
  const QuestionType = (e: string) => {
    if (e === 'Text') {
      dispatch(setQuestionImgCard(''))
      dispatch(setAnswerImgCard(''))
    } else {
      dispatch(setQuestionImgCard('ttt'))
      dispatch(setAnswerImgCard('tttt'))
    }
    //setQuestionType(e)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      closeModalCallback(false)
    }
  }
  const closeModalCallbackHandler = () => {
    dispatch(setEditCardModalIsOpen(false))
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      question: questionCard,
      /* questionImg: '',*/
      answer: answerCard,
      /* answerImg: '',*/
    },
  })

  const onSubmitEditCard = handleSubmit(data => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg[0])
    formData.append('answerImg', data.answerImg[0])
    startTypeOfCard === 'Text'
      ? updateCard({
          id: cardIdFromDeck,
          formData: {
            question: data.question,
            answer: data.answer,
          },
        })
      : updateCard({ id: cardIdFromDeck, formData: formData as unknown as FormDataType })

    //closeModalCallback(false)
    dispatch(setEditCardModalIsOpen(false))
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickedOutside])
  const defaultValueForSelect = startTypeOfCard === 'Photo' ? 2 : 0

  return (
    <form onSubmit={onSubmitEditCard}>
      <TemplateModal
        ref={menuRef}
        className={s.root}
        title="Edit Card"
        buttonName="Save Changes"
        closeModalCallback={closeModalCallbackHandler}
        mainActionCallback={() => {}}
      >
        <div className={s.content}>
          <div>
            <Typography className={s.selectName} variant="body2">
              Choose a question format
            </Typography>
            <Select
              defaultValue={defaultValueForSelect}
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
            /* label={'Question'}*/
            name={'question'}
            control={control}
            inputName="question"
            className={s.input}
          />
          {startTypeOfCard === 'Photo' && (
            <div className={s.photoBlock}>
              <img src={questionImgCard} className={s.imgSize} alt={'questionImgCard'} />
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
          {startTypeOfCard === 'Photo' && (
            <div className={s.photoBlock}>
              <img src={answerImgCard} className={s.imgSize} alt={'answerImgCard'} />
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
        </div>
      </TemplateModal>
    </form>
  )
}
