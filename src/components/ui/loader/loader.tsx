import s from '@/components/ui/loader/loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader}></div>
    </div>
  )
}
