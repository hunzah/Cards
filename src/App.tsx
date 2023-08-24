import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox'

import { Card } from '@/components/ui/card'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} text={'check-box'} disabled={false} />
      <Card />
      Hello
    </div>
  )
}
