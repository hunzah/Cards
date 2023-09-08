export type DecksResponse = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
}
export type DeckPostResponse = Omit<DecksResponse, "maxCardsCount">
export type DeckDeleteResponse = Omit<Deck, "author">

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type Deck = {
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
  cover:string
  name?:string
isPrivate:boolean
}



export type DeckDeleteParams = Pick<Deck, "id">


