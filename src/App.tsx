import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox'

import { Typography } from '@/components/ui/typography'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Typography.Large>Subheading</Typography.Large>
      Hello
    </div>
  )
}
