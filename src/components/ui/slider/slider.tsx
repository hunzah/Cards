import { useEffect, useState } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import {
  changeSliderCurrentValues,
  setMaxCurrentSliderValue,
  setMaxSliderValue,
  setMinCurrentSliderValue,
} from '@/components/ui/slider/slider.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { DecksResponse } from '@/services/decks/types'

type PropsType = {
  decks: DecksResponse
}

export const Slider = (props: PropsType) => {
  const { decks } = props
  const sliderValues = useAppSelector(state => state.slider)
  const dispatch = useAppDispatch()
  //todo I Commented next line that the error doesn't appear
  /* const sliderValues1 = useAppSelector(state => state.slider.maxCurrentSliderValue)*/
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  const changeSliderValue = (values: number[]) => {
    dispatch(changeSliderCurrentValues({ values: values }))
    clearTimeout(timerId)

    setTimerId(
      +setTimeout(() => {
        values[0] === sliderValues.minCurrentSliderValue
          ? dispatch(setMaxCurrentSliderValue({ max: values[1] }))
          : dispatch(setMinCurrentSliderValue({ min: values[0] }))
      }, 500)
    )
  }

  useEffect(() => {
    dispatch(
      setMaxCurrentSliderValue({
        max: sliderValues.maxCurrentSliderValue
          ? sliderValues.maxCurrentSliderValue
          : decks.maxCardsCount,
      })
    )
    dispatch(setMaxSliderValue({ max: decks.maxCardsCount }))
  }, [])



  return (
    <div className={s.SliderContainer}>
      <span className={s.SliderValuesNumber}>
        {sliderValues.sliderCurrentValues[0] || sliderValues.minCurrentSliderValue}
      </span>
      <SliderRadix.Root
        onValueChange={changeSliderValue}
        className={s.SliderRoot}
        defaultValue={[sliderValues.minCurrentSliderValue, sliderValues.maxCurrentSliderValue]}
        minStepsBetweenThumbs={1}
        max={sliderValues.maxSliderValue}
        step={1}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
      </SliderRadix.Root>
      <span className={s.SliderValuesNumber}>
        {sliderValues.sliderCurrentValues[1] || decks.maxCardsCount}
      </span>
    </div>
  )
}
