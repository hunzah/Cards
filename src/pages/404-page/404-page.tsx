import { Navigate } from 'react-router-dom'

import s from './404-page.module.scss'

import pageNotFoundImg from '@/assets/images/404.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const PageNotFound = () => {
  const onClickHandler = () => <Navigate to="/" />

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
