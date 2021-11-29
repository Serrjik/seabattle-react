/*     Состояние игры онлайн.     */

import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => ({
	key: '',
	player1: null,
	ships1: [],
	shots1: [],
	player2: null,
	ships2: [],
	shots2: [],
	waiting: true,
	playing: false,
	player1Turn: true,
	player1Win: false,
	incorrect: false,
})

export const partySlice = createSlice({
	name: 'party',

	initialState: getInitialState(),

	reducers: {
		reset(state, action) {
			Object.assign(state, getInitialState(), {
				// key: state.key,
				ships1: action.payload,
			})
		},
		/*
			Функция обновляет состояние партии.
		*/
		update(state, action) {
			Object.assign(state, action.payload)
		},

		// Функция сообщает об ошибке.
		incorrect(state) {
			state.incorrect = true
		},
	},
})

export const { reset, update, incorrect } = partySlice.actions

export default partySlice.reducer
