import { useState } from 'react'

import s from './tab-switcher.module.scss'

import { Typography } from '@/components/ui/typography'
import {useAppSelector} from "@/hooks";

type PropsType = {
  switches: { id: number; switchTitle: string }[]
}

export const TabSwitcher = (props: PropsType) => {
  const { switches } = props
  const [active, setActive] = useState(1)
const userId = useAppSelector(state=> state.auth.userId)
  const activeSwitchChanger = (id: number) => {
    setActive(id)
    console.log(`switch number ${userId} selected`)
  }

  return (
    <div className={s.tabSwitchersContainer}>
      <Typography variant="body2" component={'h3'}>
        Title
      </Typography>
      <div className={s.tabSwitchers}>
        {switches.map(sw => (
          <button
            onClick={() => activeSwitchChanger(sw.id)}
            key={sw.id}
            className={sw.id === active ? s.activeTabSwitcher : s.tabSwitcher}

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
