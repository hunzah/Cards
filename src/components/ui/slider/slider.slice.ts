import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    minSliderValue: 0,
    maxSliderValue: 0,
    minCurrentSliderValue: 0,
    maxCurrentSliderValue:110,
  sliderCurrentValues:[0,100]
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
    changeSliderCurrentValues: (state, action:PayloadAction<{values:number[]}>)=>{
      state.sliderCurrentValues = action.payload.values
    },
    initial: (state, action:PayloadAction<any>)=>{
      return state = {...state,
        minCurrentSliderValue: 0,
        maxCurrentSliderValue:state.maxSliderValue,
            sliderCurrentValues:[0,0]
      }
    }
  },
})
export const { setMinCurrentSliderValue, setMaxCurrentSliderValue, setMaxSliderValue,changeSliderCurrentValues,initial } =
  sliderSlice.actions
