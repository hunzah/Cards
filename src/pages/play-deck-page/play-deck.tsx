import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './play-deck.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useGetLearnMutation } from '@/services/decks/decks.service.ts'
import { learnRequest, learnResponse } from '@/services/decks/types.ts'

type PlayDeckProps = {
  closeModalCallback?: (value: boolean) => void
  PackName?: string
  mainPageUrl: string
}
export const PlayDeck = ({ PackName }: PlayDeckProps) => {
  const navigate = useNavigate()
  const [isShowAnswerOpen] = useState<boolean>(false)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const cards = useAppSelector(state => state.decks.DeckCards)
  const closeLearnPage = () => {
    navigate(`/`)
  }

  const nextQuestionHandler = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      const nextCardId = cards[currentCardIndex + 1].id
      const request: learnRequest = {
        id: nextCardId,
      }

      // useGetLearnMutation(request) as learnResponse
    }
  }

  return (
    <div className={s.root}>
      <Button variant={'link'} className={s.backBtn} onClick={closeLearnPage}>
        <img src={backIcon} alt={'back-icon'}></img>
        back to Pack list
      </Button>
      <div className={s.modalContainer}>
        <Typography variant={'h2'}>{`Learn "${PackName}"`}</Typography>
        <div className={s.questionContainer}>
          <Typography variant={'h3'}>Question</Typography>
        </div>
        {isShowAnswerOpen && (
          <div className={s.answerContainer}>
            <Typography variant={'h3'}>Answer</Typography>
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
