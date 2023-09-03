import { useState } from 'react'

import Layer2 from '../src/assets/images/Layer 2.svg'

import s from './components/ui/button/button.module.scss'
import { Checkbox } from './components/ui/checkbox'

import { SignUp } from '@/components/auth/sign-up'
import ComponentWithSvg from '@/components/ComponentWithSVG'
import { ForgotPassword } from '@/components/ui/auth-forgot-password/forgot-password.tsx'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Typography } from '@/components/ui/typography'

export function App() {
  const [checked, setChecked] = useState(false)
  const switches = [
    { id: 1, switchTitle: 'first', disabled: false },
    { id: 2, switchTitle: 'second', disabled: false },
    { id: 3, switchTitle: 'third', disabled: true },
  ]
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Typography variant="body2" component={'h3'}>
        Subheading
      </Typography>
      <Checkbox checked={checked} onChange={setChecked} label={'check-box'} disabled={false} />
      Hello
      <div>
        <Button className={s.button}>
          {' '}
          <ComponentWithSvg svg={Layer2} />
          Hello
        </Button>
        <Button className={s.button} variant="tertiary">
          <ComponentWithSvg svg={Layer2} /> qweWeW
        </Button>
        <Button className={s.button} variant="tertiary">
          qweWeW
        </Button>
        <Button className={s.button} variant="tertiary" disabled>
          qweWeW
        </Button>

        <Button className={s.button} as={'a'} href={'/link'} variant="link">
          as link
        </Button>
        <TabSwitcher switches={switches} />
        <ForgotPassword />
      </div>
      <div style={{ display: 'flex', margin: '5px' }}>
        <SignUp onSubmit={handleFormSubmitted} />
        <SignIn onSubmit={handleFormSubmitted} />
      </div>
      {/*<Select*/}
      {/*  options={[*/}
      {/*    { id: 1, option: '1' },*/}
      {/*    { id: 2, option: '2' },*/}
      {/*    { id: 3, option: '3' },*/}
      {/*  ]}*/}
      {/*/>*/}
      <AuthForm />
    </div>
  )
}
