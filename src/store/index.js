// Хранилище для Redux.

import { configureStore } from '@reduxjs/toolkit'

import botReducer from './bot'
import editorReducer from './editor'
import mainReducer from './main'

export const store = configureStore({
	reducer: {
		bot: botReducer,
		editor: editorReducer,
		main: mainReducer,
	},
})

export default store
