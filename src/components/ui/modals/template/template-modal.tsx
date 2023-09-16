import { clsx } from 'clsx'

import s from './template-modal.module.scss'

import closeIcon from '@/assets/icons/close.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type TemplateModalProps = {
  className: string
  title: string
  children: React.ReactNode
  buttonName: string
  closeModalHandle: (isAddNewPackOpen: boolean) => void
}

export const TemplateModal = (props: TemplateModalProps) => {
  const { className, title, children, buttonName, closeModalHandle } = props
  const classNames = {
    root: clsx(s.root, className),
  }
  const closeModalHandler = () => {
    closeModalHandle(false)
  }

  return (
    <div className={classNames.root}>
      <div className={s.titleContainer}>
        <Typography variant={'h2'}>{title}</Typography>
        <button className={s.closeBtn} onClick={closeModalHandler}>
          <img className={s.closeImg} alt="close-button" src={closeIcon} />
        </button>
      </div>
      <div>{children}</div>
      <div className={s.btnsContainer}>
        <Button variant="secondary" className={s.footBtn}>
          <Typography variant="subtitle2">Cancel</Typography>
        </Button>
        <Button className={s.footBtn}>
          <Typography variant="subtitle2">{buttonName}</Typography>
        </Button>
      </div>
    </div>
  )
}
