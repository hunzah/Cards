import { useState } from 'react'

import s from './drop-down-menu-card.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import dropDownToggle from '@/assets/icons/drop-dow-menu.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import playPackIcon from '@/assets/icons/play-pack.svg'
import { DeletePack } from '@/components/ui/modals/delete-pack/delete-pack.tsx'
import { EditPack } from '@/components/ui/modals/edit-pack/edit-pack.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  isOpen: boolean
  callback: (value: any) => void
}
export const DropDownMenuCard = (props: Props) => {
  const { isOpen, callback } = props

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isPlayModalOpen, setIsPlayModalOpen] = useState<boolean>(false)

  const closePlayCardModal = () => setIsPlayModalOpen(false)
  const openPlayCardModal = () => setIsPlayModalOpen(true)

  const toggleMenu = () => callback(!isOpen)
  const openEditCardModal = () => setIsEditModalOpen(true)
  const closeEditCardModal = () => setIsEditModalOpen(false)
  const closeDeleteCardModal = () => setIsDeleteModalOpen(false)
  const openDeleteCardModal = () => setIsDeleteModalOpen(true)

  return (
    <div className={s.root}>
      <img src={dropDownToggle} onClick={toggleMenu} className={s.img} alt={'drop-dow-menu-icon'} />
      {isOpen && (
        <>
          <ul className={s.menuContainer}>
            <li>
              <button onClick={openPlayCardModal} className={s.iconBtn}>
                <img src={playPackIcon} alt="delete-pack-icon" />{' '}
                <Typography variant={'caption'}>Play</Typography>
              </button>
            </li>
            <li>
              <button onClick={openEditCardModal} className={s.iconBtn}>
                <img src={editPackIcon} alt="edit-pack-icon" />{' '}
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
                {/*<PlayDeck closeModalCallback={closePlayCardModal} />*/}
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
        </>
      )}
    </div>
  )
}
