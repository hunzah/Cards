import { useState } from 'react'

import s from './add-new-card.module.scss'

import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useCreateCardMutation } from '@/services/decks/decks.service.ts'
import { setAnswer, setQuestion } from '@/services/decks/decks.slice.ts'

type Props = {
  id: string
  closeModalCallback: (isAddNewPackOpen: boolean) => void
}
export const AddNewCard = ({ closeModalCallback, id }: Props) => {
  const [createCard, { isLoading }] = useCreateCardMutation()
  const { question, answer } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [questionType, setQuestionType] = useState<string>('Text')

  const inputAnswer = (e: string) => dispatch(setAnswer(e))
  const inputQuestion = (e: string) => dispatch(setQuestion(e))
  const QuestionType = (e: string) => setQuestionType(e)

  console.log(questionType)
  const mainActionCallback = async () => {
    await createCard({
      id: id,
      question: question,
      answer: answer,
    })
    closeModalCallback(false)
  }

  return (
    <TemplateModal
      className={s.root}
      title="Add New Card"
      buttonName="Add New Card"
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
        {questionType === 'Text' && (
          <div>
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
        )}
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
