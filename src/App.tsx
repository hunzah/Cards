import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      Hello
    </div>
  )
}
