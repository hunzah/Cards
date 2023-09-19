import { useState } from 'react'

import s from './tab-switcher.module.scss'

import { Typography } from '@/components/ui/typography'

type PropsType = {
  switches: { id: number; switchTitle: string; disabled: boolean }[]
  onChange: () => void
}

export const TabSwitcher = (props: PropsType) => {
  const { switches, onChange } = props
  const [active, setActive] = useState(1)

  const activeSwitchChanger = (id: number) => {
    setActive(id)
    onChange()
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
            disabled={sw.disabled}
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
