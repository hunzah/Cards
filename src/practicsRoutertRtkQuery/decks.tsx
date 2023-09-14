import { useState } from 'react'

import { useCreateDeckMutation, useGetDecksQuery } from '@/practicsRoutertRtkQuery/deskPrac.ts'

export const DecksPrac = () => {
  const [itemsForPage, serItemsForPage] = useState(10)

  const decks = useGetDecksQuery({ itemsPerPage: itemsForPage })

  const [createDeck] = useCreateDeckMutation()

  return (
    <div>
      <button onClick={() => serItemsForPage(20)}>20 items</button>
      <button onClick={() => serItemsForPage(40)}>40 items</button>
      <div>
        <button
          onClick={() => {
            createDeck({ name: '14789' })
          }}
        >
          add deck
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Upadate</th>
            <th>Create by</th>
          </tr>
        </thead>
        <tbody>
          {decks.data?.items?.map(deck => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{deck.updated}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
