// Хранилище для Redux.

import { configureStore } from '@reduxjs/toolkit'

import botReducer from './bot'
import editorReducer from './editor'
import mainReducer from './main'
import partyReducer from './party'

export const store = configureStore({
	reducer: {
		bot: botReducer,
		editor: editorReducer,
		main: mainReducer,
		party: partyReducer,
	},
})

export default store

const { dispatch } = store
export { dispatch }
