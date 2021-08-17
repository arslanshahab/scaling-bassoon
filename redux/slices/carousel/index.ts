import { createSlice } from '@reduxjs/toolkit'

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    slides: [],
  },
  reducers: {
    setCarousel: (state, action) => {
      return { ...state, slides: action.payload }
    },
    clearCarousel: state => {
      return { ...state, slides: [] }
    },
  },
})

export const { setCarousel, clearCarousel } = carouselSlice.actions

export default carouselSlice.reducer
