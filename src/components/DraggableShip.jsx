import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import Ship from './Ship'

// Корабль, который можно переносить.
const DraggableShip = props => {
	const { id, x, y, length, direction, killed, onClick } = props

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

	// Если корабль перетаскивается:
	if (collected.isDragging) {
		// Не отрисовывать его.
		return null
	}

	return (
		<Ship
			ref={drag}
			onClick={onClick}
			killed={killed}
			x={x}
			y={y}
			length={length}
			direction={direction}
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
