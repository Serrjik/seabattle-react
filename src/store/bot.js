/*     Состояние игры с ботом.     */

import { createSlice } from '@reduxjs/toolkit'
import { getFreeCell, randomize, shoot as doShoot } from '../additional'

const initialState = {
	playerShips: [],
	playerShots: [],

	botShips: randomize().map(ship => ({ ...ship, placed: true })),
	botShots: [],

	playing: true,
	playerWin: true,
}

export const botSlice = createSlice({
	name: 'bot',

	initialState,

	reducers: {
		/*
			Функция принимает текущее состояние пользователя
			и обновляет все другие состояния.
		*/
		reset(state, action) {
			Object.assign(state, {
				...initialState,

				botShips: randomize().map(ship => ({ ...ship, placed: true })),

				playerShips: action.payload,
			})
		},

		// Функция добавляет выстрел на поле.
		shoot(state, action) {
			if (!state.playing) {
				return
			}

			const shot = doShoot(
				state.botShips,
				state.botShots,
				action.payload.x,
				action.payload.y
			)

			if (!shot) {
				return
			}

			// Если игрок попал в корабль:
			if (shot.status === 'hitted') {
				const playerWin = state.botShips.every(ship => ship.killed)

				if (playerWin) {
					state.playing = false
					state.playerWin = true
				}

				return
			}

			// Ход ли бота сейчас?
			let botTurn = true
			while (botTurn) {
				botTurn = false

				// Если игрок не попал в корабль, ход переходит к боту.
				const freeCell = getFreeCell(
					state.playerShips,
					state.playerShots
				)

				const shot = doShoot(
					state.playerShips,
					state.playerShots,
					freeCell.x,
					freeCell.y
				)

				if (!shot) {
					throw Error('Бот не может сюда стрелять.')
				}

				// Если бот попал в корабль:
				if (shot.status === 'hitted') {
					botTurn = true

					const botWin = state.playerShips.every(ship => ship.killed)

					if (botWin) {
						state.playing = false
						state.playerWin = false
						return
					}
				}
			}
		},
	},
})

export const { reset, shoot } = botSlice.actions

export default botSlice.reducer
