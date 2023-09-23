import { useState } from 'react'

import s from './add-new-card.module.scss'

import addPhotoCover from '@/assets/icons/cover-add-photo.svg'
import imageNotFound from '@/assets/images/image-not-found.jpg'
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
  const [questionImage, setQuestionImage] = useState<File | null>(null)
  const [answerImage, setAnswerImage] = useState<File | null>(null)

  const inputQuestion = (e: string) => dispatch(setQuestion(e))
  const inputAnswer = (e: string) => dispatch(setAnswer(e))
  const QuestionType = (e: string) => setQuestionType(e)

  const mainActionCallback = async () => {
    await createCard({
      id: id,
      question: question,
      answer: answer,
    })
    closeModalCallback(false)
  }
  // add Images Logic
  const handleQuestionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = event => {
        const fileContentAsString = event.target?.result

        file && setQuestionImage(file)
        setQuestion(fileContentAsString as string)
      }

      reader.readAsText(file)
    }
  }

  const handleAnswerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = event => {
        const fileContentAsString = event.target?.result

        file && setAnswerImage(file)
        setAnswer(fileContentAsString as string)
      }

      reader.readAsText(file)
    }
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
          <>
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
          </>
        )}
        {questionType === 'Photo' && (
          <>
            <div>
              <img
                className={s.cover}
                src={questionImage ? URL.createObjectURL(questionImage) : imageNotFound}
                alt="Question"
              />
              <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
                <img src={addPhotoCover} alt={'cover-add-photo'} />
                <input
                  type="file"
                  accept="image/*"
                  className={s.addImgInput}
                  onChange={handleQuestionImageChange}
                />
              </label>
            </div>
            <div>
              <img
                className={s.cover}
                src={answerImage ? URL.createObjectURL(answerImage) : imageNotFound}
                alt="Answer"
              />
              <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
                <img src={addPhotoCover} alt={'cover-add-photo'} />
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  className={s.addImgInput}
                  onChange={handleAnswerImageChange}
                />
              </label>
            </div>
          </>
        )}
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
