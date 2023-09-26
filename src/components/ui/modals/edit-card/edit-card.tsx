import { useEffect, useRef, useState } from 'react'

import s from './edit-card.module.scss'

import { TemplateModal } from '@/components/ui/modals/template'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useUpdateCardMutation } from '@/services/decks/decks.service.ts'
import { setAnswer, setQuestion } from '@/services/decks/decks.slice.ts'

type Props = {
  closeModalCallback: (value: boolean) => void
  name?: string
}
export const EditCard = ({ closeModalCallback }: Props) => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const { cardId, question, answer } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // @ts-ignore
  const [questionType, setQuestionType] = useState<string>('Text')
  const inputAnswer = (e: string) => dispatch(setAnswer(e))
  const inputQuestion = (e: string) => dispatch(setQuestion(e))
  const mainActionCallback = async () => {
    await updateCard({ id: cardId, answer: answer, question: question })
    closeModalCallback(false)
  }
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
  }, [clickedOutside])

  return (
    <TemplateModal
      ref={menuRef}
      className={s.root}
      title="Edit Card"
      buttonName="Save Changes"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <div className={s.content}>
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
        <TextField
          value={question}
          onChangeValue={inputQuestion}
          inputName="Question"
          inputIsSearch={false}
          inputType={'text'}
          className={s.input}
        />
        <TextField
          value={answer}
          onChangeValue={inputAnswer}
          inputName="Answer"
          inputIsSearch={false}
          inputType={'text'}
          className={s.input}
        />
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
