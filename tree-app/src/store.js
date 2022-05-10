import { configureStore } from '@reduxjs/toolkit'
import nodesReducer from './features/nodes/nodesSlice'

export default configureStore({
  reducer: {
    nodes: nodesReducer
  }
})