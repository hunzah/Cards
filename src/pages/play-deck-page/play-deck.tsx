import { useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './play-deck.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import { Button } from '@/components/ui/button'
import { RadioGroupUI } from '@/components/ui/radio-group/radio-group-form.tsx'
import { Typography } from '@/components/ui/typography'
import {
  useGetDeckQuery,
  useGetLearnQuery,
  usePostLearnMutation,
} from '@/services/decks/decks.service.ts'

export const PlayDeck = () => {
  const navigate = useNavigate()
  const [isShowAnswerOpen, setIsShowAnswerOpen] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState<number>()

  const { deckId } = useParams()

  const [postLearn] = usePostLearnMutation()

  if (!deckId) {
    return <div>Loading....</div>
  }
  const { data: deck } = useGetDeckQuery({ id: deckId })
  const { data: learnResponse } = useGetLearnQuery({ id: deckId })
  const closeLearnPage = () => {
    navigate(`/`)
  }

  if (!learnResponse) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '46px',
        }}
      >
        <Typography variant={'h2'}>This deck is probably empty</Typography>
        <Button onClick={closeLearnPage}>back to main page</Button>
      </div>
    )
  }

  const nextQuestionHandler = () => {
    deckId && postLearn({ id: deckId, cardId: learnResponse.id, grade: radioValue })
    setIsShowAnswerOpen(false)
  }
  const deckPath = `/decks/${deckId}`
  const onChangeValueHandler = (value: number) => {
    setRadioValue(value)
  }

  return (
    <div className={s.root}>
      <Button
        variant={'link'}
        type={'link'}
        as={Link}
        to={deckPath}
        className={s.backButton}
        onClick={closeLearnPage}
      >
        <img src={backIcon} alt={'back-icon'}></img>
        back to Pack list
      </Button>
      <div className={s.modalContainer}>
        <Typography variant={'h2'}>{`Learn "${deck ? deck.name : 'No Name'}"`}</Typography>
        <div className={s.questionContainer}>
          <Typography variant={'subtitle1'}>
            Question: <Typography variant={'body1'}>{learnResponse?.question}</Typography>
          </Typography>
          <Typography className={s.attemptsText} variant={'body2'}>
            Attempts to answer the: {learnResponse?.shots}
          </Typography>
        </div>
        {isShowAnswerOpen ? (
          <div className={s.answerContainer}>
            <Typography variant={'subtitle1'}>
              Answer: <Typography variant={'body1'}>{learnResponse?.answer}</Typography>
            </Typography>
            <Typography className={s.rateText} variant={'subtitle1'}>
              Rate yourself:
            </Typography>
            <RadioGroupUI onChangeValue={onChangeValueHandler} />
            <Button className={s.nextButton} onClick={nextQuestionHandler}>
              <Typography variant="subtitle2">NextQuestion</Typography>
            </Button>
          </div>
        ) : (
          <Button
            className={s.showAnswerButton}
            onClick={() => {
              setIsShowAnswerOpen(true)
            }}
          >
            <Typography variant="subtitle2">Show Answer</Typography>
          </Button>
        )}
      </div>
    </div>
  )
}
