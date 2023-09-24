import { useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './play-deck.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useGetCardsFromDeckQuery, useGetLearnQuery } from '@/services/decks/decks.service.ts'
import { Card, LearnResponse } from '@/services/decks/types.ts'

type PlayDeckProps = {
  closeModalCallback?: (value: boolean) => void
  PackName?: string
  mainPageUrl?: string
}
export const PlayDeck = ({ PackName }: PlayDeckProps) => {
  const navigate = useNavigate()
  const [isShowAnswerOpen] = useState<boolean>(false)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [cardId, setCardId] = useState<string>(cards ? cards[0].id : '')

  const [learnInfo, setLearnInfo] = useState<LearnResponse | null>(null)
  //const deckIdfromSlice = useAppSelector(state => state.decks.DeckId)
  const { deckId } = useParams()

  console.log('sssssssssss', deckId)
  // const dispatch = useAppDispatch()
  // const { data: cardsResponse } = useGetCardsFromDeckQuery({
  //   id: DeckId,
  // })
  const { data: cardsResponse } = useGetCardsFromDeckQuery({
    id: deckId,
  })

  console.log('cardsResponse', cardsResponse)

  /*
  
    if (!cardsResponse) {
      return <div>Loading....</div>
    }
  
    console.log('cardsResponse', cardsResponse)
    const idForLearn = cardsResponse.items[0].id
  */

  /*console.log('idForLearn', idForLearn)*/

  const { data: learnResponse } = useGetLearnQuery({ id: deckId })

  if (!learnResponse) {
    return <div>Loading....</div>
  }

  console.log(learnResponse)
  /* useEffect(() => {
           if (cardsResponse) {
             setCards(cardsResponse.items)
             setCardId(cardsResponse.items[0].id)
           }
         }, [cardsResponse])
       
         // Запрос данных для обучения
         const { data: learnResponse } = useGetLearnQuery({ id: cardId })
       
         useEffect(() => {
           if (learnResponse) {
             setLearnInfo(learnResponse)
           }
         }, [learnResponse, cardId])
       
         console.log(cards)
         console.log(cardId)
         console.log(learnInfo?.question)*/
  const closeLearnPage = () => {
    navigate(`/`)
  }

  const nextQuestionHandler = () => {
    if (cards && currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setCardId(cards[currentCardIndex + 1].id)
    }
  }
  const deckPath = `/decks/${deckId}`

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
