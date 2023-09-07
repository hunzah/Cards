import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useCreateDecksMutation, useGetDecksQuery } from '@/services/decks/decks'

export const Decks = () => {
  const decks = useGetDecksQuery()
  const [createDeck] = useCreateDecksMutation()

  if (decks.isLoading) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <Button onClick={() => createDeck({ name: 'qwe' })}> crearte deck</Button>
      <TableContainer headCells={decks.data.items} />
      {/* <Table>
            <TableHead>
                <TableRow><TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Cards</TableHeadCell>
                    <TableHeadCell>Updated</TableHeadCell>
                    <TableHeadCell>created by</TableHeadCell></TableRow>
            </TableHead>
            <TableBody>{decks.data?.items.map(deck => {
                return (
                    <TableRow key={deck.id}>
                        <TableCell>{deck.name}</TableCell>
                        <TableCell>{deck.cardsCount}</TableCell>
                        <TableCell>{deck.updated}</TableCell>
                        <TableCell>{deck.author.name}</TableCell>
                    </TableRow>)
            })}</TableBody>
        </Table>*/}
    </div>
  )
}
