import s from './drop-down-menu-card.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import dropDownToggle from '@/assets/icons/drop-dow-menu.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import playPackIcon from '@/assets/icons/play-pack.svg'

type Props = {
  isOpen: boolean
  callback: (value: any) => void
}
export const DropDownMenuCard = (props: Props) => {
  const { isOpen, callback } = props
  const toggleMenu = () => callback(!isOpen)

  return (
    <div>
      <img src={dropDownToggle} onClick={toggleMenu} className={s.img} alt={'drop-dow-menu-icon'} />
      {isOpen && (
        <ul className={s.menuContainer}>
          <li>
            <button onClick={() => openDeletePackHandler(deck.id)} className={s.iconBtns}>
              <img src={playPackIcon} alt="delete-pack-icon" />
            </button>
          </li>
          <li>
            <button
              onClick={() => openEditPackHandler(deck.id, deck.isPrivate, deck.name)}
              className={s.iconBtns}
            >
              <img src={editPackIcon} alt="edit-pack-icon" />
            </button>
          </li>
          <li>
            <button onClick={() => openDeletePackHandler(deck.id)} className={s.iconBtns}>
              <img src={deletePackIcon} alt="delete-pack-icon" />
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
