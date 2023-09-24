import { useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './play-deck.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import { Button } from '@/components/ui/button'
import { RadioGroupUI } from '@/components/ui/radio-group/radio-group-form.tsx'
import { Typography } from '@/components/ui/typography'
import {
  useGetCardsFromDeckQuery,
  useGetLearnQuery,
  usePostLearnMutation,
} from '@/services/decks/decks.service.ts'
import { Card, LearnResponse } from '@/services/decks/types.ts'

type PlayDeckProps = {
  closeModalCallback?: (value: boolean) => void
  PackName?: string
  mainPageUrl?: string
}
export const PlayDeck = ({ PackName }: PlayDeckProps) => {
  const navigate = useNavigate()
  const [isShowAnswerOpen, setIsShowAnswerOpen] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState<number>()
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [cardId, setCardId] = useState<string>(cards ? cards[0].id : '')

  const [learnInfo, setLearnInfo] = useState<LearnResponse | null>(null)
  //const deckIdfromSlice = useAppSelector(state => state.decks.DeckId)
  const { deckId } = useParams()
  const [postLearn] = usePostLearnMutation()

  console.log('sssssssssss', deckId)

  const { data: learnResponse } = useGetLearnQuery({ id: deckId })

  if (!learnResponse) {
    return <div>Loading....</div>
  }

  console.log(learnResponse)

  const closeLearnPage = () => {
    navigate(`/`)
  }

  const nextQuestionHandler = () => {
    /*if (cards && currentCardIndex < cards.length - 1) {
                                      setCurrentCardIndex(currentCardIndex + 1)
                                      setCardId(cards[currentCardIndex + 1].id)
                                    }*/
    postLearn({ id: deckId, cardId: learnResponse.id, grade: radioValue })
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
        <Typography variant={'h2'}>{`Learn "${PackName}"`}</Typography>
        <div className={s.questionContainer}>
          <Typography variant={'h3'}>Question</Typography>
          <Typography variant={'h3'}>{learnResponse?.question}</Typography>
        </div>
        <button
          onClick={() => {
            setIsShowAnswerOpen(true)
          }}
        >
          show answer
        </button>
        {isShowAnswerOpen && (
          <div className={s.answerContainer}>
            <Typography variant={'h3'}>Answer</Typography>
            <RadioGroupUI onChangeValue={onChangeValueHandler} />
          </div>
        )}
        <div className={s.btnsContainer}>
          <Button className={s.footBtn} onClick={nextQuestionHandler}>
            <Typography variant="subtitle2">{'NextQuestion'}</Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
