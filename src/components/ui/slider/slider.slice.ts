import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    minSliderValue: 0,
    maxSliderValue: 0,
    minCurrentSliderValue: 0,
    maxCurrentSliderValue: 0,
  },
  reducers: {
    setMinCurrentSliderValue: (state, action: PayloadAction<{ min: number }>) => {
      state.minCurrentSliderValue = action.payload.min
    },
    setMaxCurrentSliderValue: (state, action: PayloadAction<{ max: number }>) => {
      state.maxCurrentSliderValue = action.payload.max
    },
    setMaxSliderValue: (state, action: PayloadAction<{ max: number }>) => {
      state.maxSliderValue = action.payload.max
    },
  },
})
export const { setMinCurrentSliderValue, setMaxCurrentSliderValue, setMaxSliderValue } =
  sliderSlice.actions
