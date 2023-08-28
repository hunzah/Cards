import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

export const SliderDemo = () => {
  const [minSliderValue, setMinSliderValue] = useState(25)
  const [maxSliderValue, setMaxSliderValue] = useState(75)

  const changeSliderValue = (values: number[]) => {
    values[0] === minSliderValue ? setMaxSliderValue(values[1]) : setMinSliderValue(values[0])
  }

  return (
    <div className={s.SliderContainer}>
      <span className={s.SliderValuesNumber}>{minSliderValue}</span>
      <Slider.Root
        onValueChange={changeSliderValue}
        className={s.SliderRoot}
        defaultValue={[minSliderValue, maxSliderValue]}
        minStepsBetweenThumbs={1}
        max={100}
        step={1}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderThumb} aria-label="Volume" />
        <Slider.Thumb className={s.SliderThumb} aria-label="Volume" />
      </Slider.Root>
      <span className={s.SliderValuesNumber}>{maxSliderValue}</span>
    </div>
  )
}
