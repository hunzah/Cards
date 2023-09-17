import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
    name:"slider",
    initialState: {
        minSliderValue: -1,
        maxSliderValue: 0,
        minCurrentSliderValue: 0,
        maxCurrentSliderValue: 0,
    },
    reducers: {
        setMinCurrentSliderValue: (state, action: PayloadAction<number>) => {

            state.minCurrentSliderValue = action.payload.min
        },
        setMaxCurrentSliderValue: (state, action: PayloadAction<number>) => {
            state.maxCurrentSliderValue = action.payload.max
        },
        setMaxSliderValue: (state, action: PayloadAction<number>) => {
            state.maxSliderValue = action.payload.max
        },
    },

})
export const { setMinCurrentSliderValue, setMaxCurrentSliderValue, setMaxSliderValue } = sliderSlice.actions