import {useEffect, useState} from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import {
    changeSliderCurrentValues,
    setMaxCurrentSliderValue,
    setMaxSliderValue,
    setMinCurrentSliderValue,
} from '@/components/ui/slider/slider.slice'
import {useAppDispatch, useAppSelector} from '@/hooks'
import {DecksResponse} from '@/services/decks/types'
import {values} from "remeda";
import {updateCurrentPage} from "@/services/decks/decks.slice";

type PropsType = {
    decks: DecksResponse
    minCurrent: number
    maxCurrent: number
}

export const Slider = (props: PropsType) => {
    const {decks, minCurrent, maxCurrent} = props
    const sliderValues = useAppSelector(state => state.slider)
    const dispatch = useAppDispatch()
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [slider, setS] = useState([minCurrent, sliderValues.maxSliderValue])
    const changeSliderValue = (values: number[]) => {
        dispatch(changeSliderCurrentValues({values: values}))
        clearTimeout(timerId)
        setS(values)
        dispatch(updateCurrentPage(1))
        setTimerId(
            +setTimeout(() => {
                values[0] === sliderValues.minCurrentSliderValue
                    ? dispatch(setMaxCurrentSliderValue({max: values[1]}))
                    : dispatch(setMinCurrentSliderValue({min: values[0]}))
            }, 1500)
        )
    }
    console.log(sliderValues.sliderCurrentValues)
    console.log(sliderValues)
    console.log(slider)
    console.log(decks)
    useEffect(() => {
        setS([0, decks.maxCardsCount])
        dispatch(setMaxCurrentSliderValue({max: slider[1]}))
        dispatch(changeSliderCurrentValues({values: [0, decks.maxCardsCount]}))
      dispatch(setMaxSliderValue({max: decks.maxCardsCount}))
    }, [])
if (decks && decks.maxCardsCount){

    dispatch(setMaxSliderValue({max: decks.maxCardsCount}))

}


    return (
        <div className={s.SliderContainer}>
            <span className={s.SliderValuesNumber}>{slider[0]}</span>
            <SliderRadix.Root
                onValueChange={changeSliderValue}
                className={s.SliderRoot}
                defaultValue={[0, slider[1] ? slider[1] : sliderValues.maxCurrentSliderValue ]}
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
            <span className={s.SliderValuesNumber}>{slider[1]}</span>
        </div>
    )
}
