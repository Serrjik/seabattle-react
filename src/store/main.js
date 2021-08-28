/*     Главное состояние.     */

import { createSlice } from '@reduxjs/toolkit'
import { randomize } from '../additional'

const initialState = {
	ships: randomize().map(ship => ({...ship, placed: true})),
}

export const mainSlice = createSlice({
	name: 'main',

	initialState,

	reducers: {
		// Функция принимает массив кораблей и выставляет на поле.
		setShips(state, action) {
			state.ships = action.payload
		},
	},
})

export const { setShips } = mainSlice.actions

export default mainSlice.reducer
