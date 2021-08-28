// Редактор для расстановки кораблей.

import BattleField from './BattleField'
import BattleFieldTable from './BattleFieldTable'
import Dock from './Dock'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { useMemo, useRef } from 'react'
import DraggableShip from './DraggableShip'
import { useDrop } from 'react-dnd'
import { useSeaBattle } from '../hooks'

const BattleFieldEditor = props => {
	const { ships, onPlace, onDock, onRotate } = props

	const dockedShips = useMemo(
		() => ships.filter(ship => !ship.placed),
		[ships]
	)

	const placedShips = useMemo(
		() => ships.filter(ship => ship.placed),
		[ships]
	)

	const { cellSize } = useSeaBattle()
	// Поле, на котором размещаем корабли.
	const placeRef = useRef()

	// Бросок корабля над полем доком.
	const [, dockDrop] = useDrop(() => ({
		accept: 'SHIP',
		drop(item) {
			onDock(item.id)
		},
	}))

	// Бросок корабля над полем для расстановки.
	const [, placeDrop] = useDrop(() => ({
		accept: 'SHIP',
		drop(item, monitor) {
			/*
				Метод getInitialClientOffset() возвращает координаты мыши
				относительно верхнего левого угла страницы в момент начала
				перетаскивания.
			*/
			const mouseStart = monitor.getInitialClientOffset()

			/*
				Метод getClientOffset() возвращает координаты мыши относительно
				верхнего левого угла страницы в последний момент перетаскивания.
			*/
			const mouseFinish = monitor.getClientOffset()

			/*
				Метод getInitialSourceClientOffset() возвращает координаты
				левого верхнего угла перетаскиваемого элемента относительно
				верхнего левого угла страницы в момент начала перетаскивания.
			*/
			const shipStart = monitor.getInitialSourceClientOffset()

			/*
				Координаты, где взяли корабль
				относительно верхнего левого угла этого корабля.
			*/
			const diff = {
				x: mouseStart.x - shipStart.x,
				y: mouseStart.y - shipStart.y,
			}

			// Координаты поля, на котором размещаем корабли.
			const rect = placeRef.current.getBoundingClientRect()

			/*
				Координаты ячейки поля, на котором размещаем корабли,
				при броске корабля.
				Ищем ячейку, на которую упал центр первой ячейки корабля.
			*/
			const x = Math.floor(
				(mouseFinish.x - rect.left - diff.x + cellSize / 2) / cellSize
			)

			const y = Math.floor(
				(mouseFinish.y - rect.top - diff.y + cellSize / 2) / cellSize
			)

			onPlace(item.id, x, y)

			/*
				Метод getSourceClientOffset() возвращает координаты левого
				верхнего угла перетаскиваемого элемента относительно верхнего
				левого угла страницы в последний момент перетаскивания.
			*/
		},
	}))

	placeDrop(placeRef)

	return (
		<div className={styles['battlefield-constructor']}>
			<Dock ref={dockDrop}>
				{dockedShips.map(ship => (
					<DraggableShip
						key={ship.id}
						{...ship}
						onClick={() => onRotate(ship.id)}
					/>
				))}
			</Dock>
			<BattleField>
				<BattleFieldTable ref={placeRef} />

				{placedShips.map(ship => (
					<DraggableShip
						key={ship.id}
						{...ship}
						onClick={() => onRotate(ship.id)}
					/>
				))}
			</BattleField>
		</div>
	)
}

export default BattleFieldEditor

BattleFieldEditor.propTypes = {
	ships: PropTypes.array.isRequired,
	onPlace: PropTypes.func.isRequired,
	onDock: PropTypes.func.isRequired,
	onRotate: PropTypes.func.isRequired,
}
