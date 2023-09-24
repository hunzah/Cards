import { useEffect, useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import s from './drop-down-menu-card.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import dropDownToggle from '@/assets/icons/drop-dow-menu.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import playPackIcon from '@/assets/icons/play-pack.svg'
import { DeletePack } from '@/components/ui/modals/delete-pack/delete-pack.tsx'
import { EditPack } from '@/components/ui/modals/edit-pack/edit-pack.tsx'
import { Typography } from '@/components/ui/typography'
import { PlayDeck } from '@/pages/play-deck-page/play-deck.tsx'
import { Card } from '@/services/decks/types.ts'

type Props = {
  isOpen: boolean
  callback: (value: any) => void
  cards: Card[]
}
export const DropDownMenuCard = (props: Props) => {
  const { isOpen, callback } = props
  const navigate = useNavigate()
  const currentUrl = useLocation().pathname
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isPlayModalOpen] = useState<boolean>(false)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const openPlayCardModal = () => {
    navigate(`${currentUrl}/learn`)
  }

  const toggleMenu = () => callback(!isOpen)
  const openEditCardModal = () => setIsEditModalOpen(true)
  const closeEditCardModal = () => setIsEditModalOpen(false)
  const closeDeleteCardModal = () => setIsDeleteModalOpen(false)
  const openDeleteCardModal = () => setIsDeleteModalOpen(true)

  //logic to close the modal when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      callback(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, clickedOutside])

  return (
    <div className={s.root} ref={menuRef}>
      <img src={dropDownToggle} onClick={toggleMenu} className={s.img} alt={'drop-dow-menu-icon'} />
      {isOpen && (
        <div>
          <ul className={s.menuContainer}>
            <li>
              <button onClick={openPlayCardModal} className={s.iconBtn}>
                <img src={playPackIcon} alt="delete-pack-icon" />
                <Typography variant={'caption'}>Play</Typography>
              </button>
            </li>
            <li className={s.rectangle}>
              <button onClick={openEditCardModal} className={s.iconBtn}>
                <img src={editPackIcon} alt="edit-pack-icon" />
                <Typography variant={'caption'}>Edit</Typography>
              </button>
            </li>
            <li>
              <button onClick={openDeleteCardModal} className={s.iconBtn}>
                <img src={deletePackIcon} alt="delete-pack-icon" />{' '}
                <Typography variant={'caption'}>Delete</Typography>
              </button>
            </li>
          </ul>
          <div>
            {isPlayModalOpen && (
              <div className={s.modal}>
                <PlayDeck mainPageUrl={currentUrl} />
              </div>
            )}
            {isEditModalOpen && (
              <div className={s.modal}>
                <div className={s.backdrop}>
                  <EditPack closeModalCallback={closeEditCardModal} />
                </div>
              </div>
            )}
            {isDeleteModalOpen && (
              <div className={s.modal}>
                <div className={s.backdrop}>
                  <DeletePack closeModalCallback={closeDeleteCardModal} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
