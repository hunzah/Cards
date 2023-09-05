import { Pagination } from '@/components/ui/pagination/pagination.tsx'

const countryNames = [
  { name: 'Russia' },
  { name: 'Belarusia' },
  { name: 'Ukraine' },
  { name: 'USA' },
  { name: 'Uganda' },
  { name: 'Uruguay' },
  { name: 'Chili' },
  { name: 'Canada' },
  { name: 'France' },
  { name: 'Litva' },
  { name: 'Dagestan' },
  { name: 'Myau' },
  { name: 'Myau' },
  { name: 'Myau' },
  { name: 'Myau' },
  { name: 'France' },
  { name: 'Litva' },
  { name: 'Dagestan' },
  { name: 'Myau' },
  { name: 'Myau' },
  { name: 'Bali' },
  { name: 'Balya' },
  { name: 'Balya' },
  { name: 'USA' },
  { name: 'Uganda' },
  { name: 'Uruguay' },
  { name: 'Chili' },
  { name: 'USA' },
  { name: 'Uganda' },
  { name: 'Uruguay' },
  { name: 'Chili' },
]

export function App() {
  return (
    <div>
      <Pagination totalPages={33} elements={countryNames} />
    </div>
  )
}
