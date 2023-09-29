import { useEffect, useRef, useState } from 'react'

import s from './add-new-card.module.scss'

import addPhotoCover from '@/assets/icons/cover-add-photo.svg'
import { TemplateModal } from '@/components/ui/modals/template/'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useCreateCardMutation } from '@/services/decks/decks.service.ts'
import { setAnswer, setQuestion } from '@/services/decks/decks.slice.ts'
import { FormDataType } from '@/services/decks/types.ts'

type Props = {
  id: string
  closeModalCallback: (isAddNewPackOpen: boolean) => void
  isOpen: boolean
}
export const AddNewCard = ({ closeModalCallback, id, isOpen }: Props) => {
  const [createCard, { isLoading }] = useCreateCardMutation()
  const { question, answer } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [questionType, setQuestionType] = useState<string>('Text')
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [questionFileURL, setQuestionFileURL] = useState<any>()
  const [answerFileURL, setAnswerFileURL] = useState<any>()
  const [formQuestionData, setFormQuestionData] = useState<any>()
  const [formAnswerData, setFormAnswerData] = useState<any>()

  const inputQuestion = (e: string) => dispatch(setQuestion(e))
  const inputAnswer = (e: string) => dispatch(setAnswer(e))
  const QuestionType = (e: string) => setQuestionType(e)

  const mainActionCallback = () => {
    const formData = new FormData()

    formData.append('question', question ? question : 'question on the image')
    formData.append('answer', answer ? answer : 'answer on the image')
    formData.append('questionImg', formQuestionData)
    formData.append('answerImg', formAnswerData)
    questionType === 'Text'
      ? createCard({
          id: id,
          formData: {
            question: question,
            answer: answer,
          },
        })
      : createCard({ id: id, formData: formData as unknown as FormDataType })

    dispatch(setAnswer(''))
    dispatch(setQuestion(''))
    closeModalCallback(false)
  }

  const handleQuestionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maybeFile = e.target.files?.[0]

    if (maybeFile) {
      if (maybeFile.type === 'image/jpeg' || maybeFile.type === 'image/jpg') {
        setQuestionFileURL(URL.createObjectURL(maybeFile))
        setFormQuestionData(maybeFile)

        return
      } else alert('not .jpg!')
    }
    setQuestionFileURL('')
    setFormQuestionData('')
  }

  const handleAnswerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maybeFile = e.target.files?.[0]

    if (maybeFile) {
      if (maybeFile.type === 'image/jpeg' || maybeFile.type === 'image/jpg') {
        setAnswerFileURL(URL.createObjectURL(maybeFile))
        setFormAnswerData(maybeFile)

        return
      } else alert('not .jpg!')
    }
    setFormAnswerData('')
    setAnswerFileURL('')
  }

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

  return (
    <TemplateModal
      ref={menuRef}
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
        <TextField
          placeholder={'write a question'}
          value={question}
          onChangeValue={inputQuestion}
          inputName="Question"
          inputIsSearch={false}
          inputType={'text'}
          className={s.input}
        />
        {questionType === 'Photo' && (
          <div>
            {questionFileURL && (
              <img
                className={s.cover}
                /* src={questionImage ? URL.createObjectURL(questionImage) : imageNotFound}*/
                src={questionFileURL}
                alt="Question"
              />
            )}
            <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
              <img src={addPhotoCover} alt={'cover-add-photo'} />
              <input type="file" className={s.addImgInput} onChange={handleQuestionImageChange} />
            </label>
          </div>
        )}
        <TextField
          placeholder={'write your answer '}
          value={answer}
          onChangeValue={inputAnswer}
          inputName="Answer"
          inputIsSearch={false}
          inputType={'text'}
          className={s.input}
        />
        {questionType === 'Photo' && (
          <div>
            {answerFileURL && (
              <img
                className={s.cover}
                /* src={answerImage ? URL.createObjectURL(answerImage) : imageNotFound}*/
                src={answerFileURL}
                alt="Answer"
              />
            )}
            <label htmlFor="fileInput" className={s.addPhotoInputCntr}>
              <img src={addPhotoCover} alt={'cover-add-photo'} />
              <input
                type="file"
                id="fileInput"
                className={s.addImgInput}
                onChange={handleAnswerImageChange}
              />
            </label>
          </div>
        )}
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
