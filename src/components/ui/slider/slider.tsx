import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type PropsType = {
  minSliderValue: number
  maxSliderValue: number
  setMinSliderValue: (minSliderValue: number) => void
  setMaxSliderValue: (maxSliderValue: number) => void
}

export const Slider = (props: PropsType) => {
  const { minSliderValue, maxSliderValue, setMinSliderValue, setMaxSliderValue } = props

  const changeSliderValue = (values: number[]) => {
    values[0] === minSliderValue ? setMaxSliderValue(values[1]) : setMinSliderValue(values[0])
  }

  return (
    <div className={s.SliderContainer}>
      <span className={s.SliderValuesNumber}>{minSliderValue}</span>
      <SliderRadix.Root
        onValueChange={changeSliderValue}
        className={s.SliderRoot}
        defaultValue={[minSliderValue, maxSliderValue]}
        minStepsBetweenThumbs={1}
        max={100}
        step={1}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
      </SliderRadix.Root>
      <span className={s.SliderValuesNumber}>{maxSliderValue}</span>
    </div>
  )
}
