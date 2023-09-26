import { useState } from 'react'

import { clsx } from 'clsx'
import { useDispatch } from 'react-redux'

import s from './tab-switcher.module.scss'

import { Typography } from '@/components/ui/typography'
import { updateCurrentPage } from '@/services/decks/decks.slice'

type PropsType = {
  switches: { id: string; switchTitle: string }[]
  setSortId: (is: string) => void
  sortId?: string
  title: string
  className?: string
}
//todo sortId on 20 line I Commented it out so the error doesn't appear
export const TabSwitcher = (props: PropsType) => {
  const { switches, setSortId, /*sortId,*/ title, className } = props
  const dispatch = useDispatch()
  const [active, setActive] = useState('all')

  const activeSwitchChanger = (switchTitle: string, sortId: string) => {
    setActive(switchTitle)
    setSortId(sortId)
    dispatch(updateCurrentPage(1))
  }
  const classNames = {
    tabSwitchersContainer: clsx(s.tabSwitchersContainer, className),
  }

  return (
    <div className={classNames.tabSwitchersContainer}>
      <Typography variant="body2" component={'h3'}>
        {title}
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
