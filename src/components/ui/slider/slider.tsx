import { useEffect, useState } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import {
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
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  /*
    const [a, setA] = useState<number[]>([0, sliderValues.maxCurrentSliderValue])
    */
  const changeSliderValue = (values: number[]) => {
    /* setA(values)*/
    clearTimeout(timerId)
    setTimerId(
      +setTimeout(() => {
        values[0] === sliderValues.minCurrentSliderValue
          ? dispatch(setMaxCurrentSliderValue({ max: values[1] }))
          : dispatch(setMinCurrentSliderValue({ min: values[0] }))
      }, 1500)
    )
  }

  useEffect(() => {
    console.log('here')
    dispatch(setMaxSliderValue({ max: decks.maxCardsCount }))
    dispatch(setMaxCurrentSliderValue({ max: sliderValues.maxCurrentSliderValue }))
  }, [])

  console.log(sliderValues)
  return (
    <div className={s.SliderContainer}>
      <span className={s.SliderValuesNumber}>{sliderValues.minCurrentSliderValue}</span>
      <SliderRadix.Root
        onValueChange={changeSliderValue}
        className={s.SliderRoot}
        defaultValue={[sliderValues.minCurrentSliderValue, sliderValues.maxCurrentSliderValue]}
        minStepsBetweenThumbs={1}
        max={decks?.maxCardsCount}
        step={1}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
      </SliderRadix.Root>
      <span className={s.SliderValuesNumber}>{sliderValues.maxCurrentSliderValue}</span>
    </div>
  )
}
