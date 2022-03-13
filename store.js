import {configureStore} from '@reduxjs/toolkit'
import coordinateReducer from './coordinateSlice'
import dataReducer from './dataSlice'

export default configureStore({
    reducer: {
        coordinate: coordinateReducer,
        data: dataReducer,
    }
})