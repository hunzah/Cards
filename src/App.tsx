import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox'

import { Typography } from '@/components/ui/typography'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Typography variant="body2" component={'h3'}>
        Subheading
      </Typography>
      Hello
    </div>
  )
}
