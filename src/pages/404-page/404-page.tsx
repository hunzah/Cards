import { useNavigate } from 'react-router-dom'

import s from './404-page.module.scss'

import pageNotFoundImg from '@/assets/images/404.svg'
import { Button, Typography } from '@/components'

export const PageNotFound = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.root}>
      <img src={pageNotFoundImg} alt="page-not-found-image" />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button className={s.btn} onClick={onClickHandler}>
        Back to home page
      </Button>
    </div>
  )
}
