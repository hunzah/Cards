import { useState } from 'react'

import asd from '../src/assets/images/Layer 2.svg'

import s from './components/ui/button/button.module.scss'
import { Checkbox } from './components/ui/checkbox'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Typography variant="body2" component={'h3'}>
        Subheading
      </Typography>
      <>asd</>
      <Checkbox checked={checked} onChange={setChecked} text={'check-box'} disabled={false} />
      Hello
      <div>
        <Button className={s.button}>
          {' '}
          <img src={asd} />
          Hello
        </Button>
        <Button className={s.button} variant="tertiary">
          <img src={asd} /> qweWeW
        </Button>
        <Button className={s.button} variant="tertiary">
          qweWeW
        </Button>

        <Button className={s.button} as={'a'} href={'/link'} variant="link">
          as link
        </Button>
        <Select options={['a', 'b', 'c']} />
      </div>
    </div>
  )
}
