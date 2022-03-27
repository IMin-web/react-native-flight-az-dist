import {configureStore} from '@reduxjs/toolkit'
import coordinateReducer from './coordinateSlice'
import dataReducer from './dataSlice'
import airReducer from './airSlice'

export default configureStore({
    reducer: {
        coordinate: coordinateReducer,
        data: dataReducer,
        air: airReducer,
    }
})