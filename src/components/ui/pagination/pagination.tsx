import { useState } from 'react'

import { PagLogic } from '@/components/ui/pagination/pagLogic.tsx'
import { Select } from '@/components/ui/select'

type PropsType = {
  elements: any[]
  perPage?: number
}

export const Pagination = (props: PropsType) => {
  const { elements } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)
  const lastElementIndex = currentPage * perPage
  const firstElementIndex = lastElementIndex - perPage
  const currentElement = elements.slice(firstElementIndex, lastElementIndex)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  // let optionsForSelect = [10, 20, 30, 50, 100]

  return (
    <div>
      <Countries countries={currentElement} />
      <PagLogic
        elements={elements}
        elementsPerPage={perPage}
        totalElements={elements.length}
        onChange={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Select options={[10, 20, 30, 50, 100]} defaultValue={10} />
    </div>
  )
}

const Countries = ({ countries }: any) => {
  return countries.map((country: { name: string }, i: any) => <div key={i}>{country.name}</div>)
}
