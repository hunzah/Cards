type PropsType = {
  totalElements: number
  currentPage?: number
  onChange: (page: number) => void
  elementsPerPage: number
}

export const PagLogic = (props: PropsType) => {
  const { elementsPerPage, totalElements, onChange } = props

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number: number) => (
          <li key={number}>
            <a href="#" onClick={() => onChange(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
