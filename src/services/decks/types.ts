export type DecksResponse = {
  items: DeckType[]
  pagination: Pagination
  maxCardsCount: number
}
export type DeckPostResponse = Omit<DecksResponse, 'maxCardsCount'>
export type DeckDeleteResponse = Omit<DeckType, 'author'>

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type DeckType = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
}

export type Author = {
  id: string
  name: string
}
export type DecksParams = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
} | void

export type DecksPostParams = {
  cover?: string
  name: string
  isPrivate: boolean
}
export type DecksPatchParams = {
  id: string
  params: {
    cover?: string
    name: string
    isPrivate: boolean
  }
}

export type CardsFromDeckRequest = {
  id: string | undefined
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type FormDataType = {
  question?: string | undefined
  answer?: string | undefined
  questionImg?: string | undefined
  answerImg?: string | undefined
  questionVideo?: string | undefined
  answerVideo?: string | undefined
}
export type createCardRequest = {
  id: string
  formData: FormDataType
}

export type createCardWithFormDataRequest = {
  id: string
  formData: Omit<createCardRequest, 'id'>
}

export type UpdateCardWithFormDataRequest = {
  id: string
  formData: FormDataType
}

export type updateCardRequest = {
  id: string
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type PaginationCars = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type CardsFromDeckResponse = {
  pagination: PaginationCars
  items: Card[]
}

export type LearnRequest = {
  id: string
  previousCardId?: string
}

export type GetCardById = {
  id: string
}

export type LearnResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}
export type PostLearn = {
  id: string
  cardId: string
  grade: number | undefined
}
export type DeckRequestParams = {
  id: string | undefined
}
export type DeckDeleteParams = Pick<DeckType, 'id'>
export type CardTypeType = 'Text' | 'Image' | 'Video'
