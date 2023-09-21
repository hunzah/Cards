import {useEffect, useState} from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import {
    setMaxCurrentSliderValue,
    setMaxSliderValue,
    setMinCurrentSliderValue,
} from '@/components/ui/slider/slider.slice'
import {useAppDispatch, useAppSelector} from '@/hooks'
import {DecksResponse} from '@/services/decks/types'
import {values} from "remeda";

type PropsType = {
    decks: DecksResponse
    sliderCurrentValues: number[]
    setSliderCurrentValues: (sliderCurrentValues:number[])=>void
}

export const Slider = (props: PropsType) => {
    const {decks, sliderCurrentValues, setSliderCurrentValues} = props
    const sliderValues = useAppSelector(state => state.slider)
    const dispatch = useAppDispatch()
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const changeSliderValue = (values: number[]) => {
        setSliderCurrentValues(values)
        clearTimeout(timerId)
        setTimerId(
            +setTimeout(() => {
                values[0] === sliderValues.minCurrentSliderValue
                    ? dispatch(setMaxCurrentSliderValue({max: values[1]}))
                    : dispatch(setMinCurrentSliderValue({min: values[0]}))
            }, 1500)
        )
    }

    useEffect(() => {
        console.log("eff")
        dispatch(setMaxSliderValue({max: decks.maxCardsCount}))
        dispatch(setMaxCurrentSliderValue({max: sliderValues.maxCurrentSliderValue? sliderValues.maxCurrentSliderValue:sliderValues.maxSliderValue}))
        setSliderCurrentValues([sliderValues.minCurrentSliderValue, sliderValues.maxCurrentSliderValue? sliderValues.maxCurrentSliderValue:sliderValues.maxSliderValue])

    }, [])


    return (
        <div className={s.SliderContainer}>
            <span className={s.SliderValuesNumber}>{sliderCurrentValues[0]}</span>
            <SliderRadix.Root
                onValueChange={changeSliderValue}
                className={s.SliderRoot}
                defaultValue={[0, 22]}
                minStepsBetweenThumbs={1}
                max={sliderValues.maxSliderValue}
                step={1}
            >
                <SliderRadix.Track className={s.SliderTrack}>
                    <SliderRadix.Range className={s.SliderRange}/>
                </SliderRadix.Track>
                <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume"/>
                <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume"/>
            </SliderRadix.Root>
            <span className={s.SliderValuesNumber}>{sliderCurrentValues[1]? sliderCurrentValues[1] :sliderValues.maxSliderValue }</span>
        </div>
    )
}
