import { createSlice } from '@reduxjs/toolkit'
import { getDefaultShips, isNormalPosition, randomize } from '../additional'

const initialState = {
	ships: getDefaultShips(),
}

export const editorSlice = createSlice({
	name: 'editor',

	initialState,

	reducers: {
		// Функция принимает массив кораблей и выставляет на поле.
		setShips(state, action) {
			state.ships = action.payload
		},

		// Функция ставит корабль на поле для расстановки.
		place(state, action) {
			// id корабля, координаты ячейки, на которую хотим его разместить.
			const { id, x, y } = action.payload

			/*
				Корабли, которые уже расположены, кроме того,
				который сейчас хотим расположить.
			*/
			const placed = state.ships.filter(
				ship => ship.placed && ship.id !== id
			)

			// Располагаемый корабль.
			const ship = state.ships.find(ship => ship.id === id)

			// Будут ли корабли с учётом располагаемого корабля стоять допустимо?
			const normal = isNormalPosition([...placed, { ...ship, x, y }])
			if (normal) {
				Object.assign(ship, { x, y, placed: true })
			}
		},

		// Функция ставит корабль в док.
		dock(state, action) {
			const id = action.payload

			const defaultShip = getDefaultShips().find(ship => ship.id === id)
			const ship = state.ships.find(ship => ship.id === id)

			if (ship && defaultShip) {
				Object.assign(ship, defaultShip)
			}
		},

		// Функция расставляет корабли случайным образом.
		random(state) {
			state.ships = randomize()
			for (const ship of state.ships) {
				ship.placed = true
			}
		},

		// Функция возвращает корабли в док.
		reset(state) {
			state.ships = getDefaultShips()
		},

		// Функция поворачивает переданный корабль.
		rotate(state, action) {
			// id корабля, который хотим повернуть.
			const id = action.payload

			// Поворачиваемый корабль.
			const ship = state.ships.find(ship => ship.id === id)

			if (!ship) {
				return
			}

			if (!ship.placed) {
				ship.direction = ship.direction === 'row' ? 'column' : 'row'
			} else {
				/*
				Корабли, которые уже расположены, кроме того,
				который сейчас хотим повернуть.
			*/
				const placed = state.ships.filter(
					ship => ship.placed && ship.id !== id
				)

				/*
					Будут ли корабли с учётом поворачиваемого корабля
					стоять допустимо?
				*/
				const normal = isNormalPosition([
					...placed,
					{
						...ship,
						direction: ship.direction === 'row' ? 'column' : 'row',
					},
				])

				if (normal) {
					ship.direction = ship.direction === 'row' ? 'column' : 'row'
				}
			}
		},
	},
})

export const { place, dock, random, reset, rotate, setShips } =
	editorSlice.actions

export default editorSlice.reducer
