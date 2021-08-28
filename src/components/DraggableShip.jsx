import { useSeaBattle } from '../hooks'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { useMemo } from 'react'
import classNames from 'classnames'
import { useDrag } from 'react-dnd'

// Корабль, который можно переносить.
const DraggableShip = props => {
	const { id, x, y, length, direction, killed, onClick } = props
	// Размер ячейки игрового поля.
	const { cellSize } = useSeaBattle()

	// drag - функция, которая позволит нам работать с DraggableShip'ом.
	const [collected, drag] = useDrag(() => ({
		// Тип того что перетаскиваем.
		type: 'SHIP',
		// Идентификатор того, что перетаскиваем.
		item: { id },
		/*
			Функция, которая принимает монитор и возвращает данные,
			которые помещаются в первый ответ от useDrag, которые позволят нам
			манипулировать состоянием.
			Монитор - функция, которая следит за тем, как происходит процесс
			перетаскивания, и возвращает объект collected, который мы
			запоминаем.
		*/
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	const style = useMemo(() => {
		const style = {}

		// Длина корабля.
		const along = length * cellSize + length - 1
		// Ширина корабля.
		const across = cellSize

		if (direction === 'row') {
			style.width = `${along}px`
			style.height = `${across}px`
		} else {
			style.width = `${across}px`
			style.height = `${along}px`
		}

		const offsetX = x * (cellSize + 1)
		const offsetY = y * (cellSize + 1)

		style.left = `${offsetX}px`
		style.top = `${offsetY}px`

		return style
	}, [cellSize, direction, length, x, y])

	// Если корабль перетаскивается:
	if (collected.isDragging) {
		// Не отрисовывать его.
		return null
	}

	return (
		<div
			ref={drag}
			className={classNames(styles.ship, {
				[styles['ship-killed']]: killed,
			})}
			style={style}
			onClick={onClick}
		/>
	)
}

export default DraggableShip

DraggableShip.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
	direction: PropTypes.oneOf(['row', 'column']).isRequired,
	killed: PropTypes.bool.isRequired,
	onclick: PropTypes.func.isRequired,
}

DraggableShip.defaultProps = {
	killed: false,
	onclick() {},
}
