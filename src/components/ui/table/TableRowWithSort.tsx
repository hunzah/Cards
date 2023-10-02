import { TableHeadCell, TableRow } from '@/components/ui/table/table'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setOrderBy } from '@/services/decks/decks.slice'

const TableRowWithSort = () => {
  const dispatch = useAppDispatch()

  const orderBy = useAppSelector<string | null>(state => state.decks.orderBy)

  const onclickHandler = (key: string) => {
    if (!orderBy) {
      dispatch(setOrderBy(`${key}-asc`))
    }
    if (orderBy) {
      const orderArrow = orderBy.split('-')

      if (orderArrow[0] === key) {
        dispatch(setOrderBy(`${key}-desc`))
      }
      if (orderArrow[0] !== key) {
        dispatch(setOrderBy(`${key}-asc`))
      }
      if (orderArrow[1] === 'desc' && orderArrow[0] === key) {
        dispatch(setOrderBy(null))
      }
    }
  }

  const sortArrow = (order: string) => {
    if (!orderBy) {
      return <span>•</span>
    } else {
      const orderArrow = orderBy.split('-')

      if (!orderArrow || orderArrow[0] !== order) {
        return <span>•</span>
      }
      if (orderArrow[1] === 'asc' && orderArrow[0] === order) {
        return <span>↑</span>
      }
      if (orderArrow[1] === 'desc' && orderArrow[0] === order) {
        return <span>↓</span>
      }
    }
  }

  return (
    <TableRow>
      <TableHeadCell onClick={() => onclickHandler('name')}>{sortArrow('name')} Name</TableHeadCell>
      <TableHeadCell onClick={() => onclickHandler('cardsCount')}>
        {sortArrow('cardsCount')} Cards
      </TableHeadCell>
      <TableHeadCell onClick={() => onclickHandler('updated')}>
        {sortArrow('updated')} Updated
      </TableHeadCell>
      <TableHeadCell onClick={() => onclickHandler('created')}>
        {sortArrow('created')} created by
      </TableHeadCell>
      <TableHeadCell></TableHeadCell>
    </TableRow>
  )
}

export default TableRowWithSort
