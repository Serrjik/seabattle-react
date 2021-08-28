// Хранилище для Redux.

import { configureStore } from '@reduxjs/toolkit'

import editorReducer from './editor'
import mainReducer from './main'

export const store = configureStore({
	reducer: {
		editor: editorReducer,
		main: mainReducer,
	},
})

export default store
