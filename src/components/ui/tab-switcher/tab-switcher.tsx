import { useState } from 'react'

import s from './tab-switcher.module.scss'

import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setMeUserId } from '@/services/auth/auth.slice'

type PropsType = {
  switches: { id: string; switchTitle: string }[]
  setSortId: (is: string) => void
}

export const TabSwitcher = (props: PropsType) => {
  const { switches, setSortId } = props
  const dispatch = useAppDispatch()
  const [active, setActive] = useState('all')
  const userId = useAppSelector(state => state.auth.userId)

  const activeSwitchChanger = (switchTitle: string, id: string) => {
    setActive(switchTitle)
    setSortId(id)
    console.log(active)
    console.log(userId, switchTitle)
  }

  return (
    <div className={s.tabSwitchersContainer}>
      <Typography variant="body2" component={'h3'}>
        Title
      </Typography>
      <div className={s.tabSwitchers}>
        {switches.map(sw => (
          <button
            onClick={() => activeSwitchChanger(sw.switchTitle, sw.id)}
            key={sw.switchTitle}
            className={sw.switchTitle === active ? s.activeTabSwitcher : s.tabSwitcher}
          >
            <Typography variant="body2" component={'span'}>
              {sw.switchTitle}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  )
}
