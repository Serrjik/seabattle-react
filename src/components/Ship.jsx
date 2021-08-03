import { useSeaBattle } from "../hooks"
import PropTypes from 'prop-types'
import styles from "./styles.module.css"
import { useMemo } from "react"
import classNames from "classnames"

const Ship = props => {
	const { x, y, length, direction, killed } = props
	// Размер ячейки игрового поля.
	const { cellSize } = useSeaBattle()

	const style = useMemo(() => {
		const style = {}

		// Длина корабля.
		const along = length * cellSize + length - 1
		// Ширина корабля.
		const across = cellSize

		if (direction === 'row') {
			style.width = `${along}px`
			style.height = `${across}px`
		}

		else {
			style.width = `${across}px`
			style.height = `${along}px`
		}

		const offsetX = x * (cellSize + 1)
		const offsetY = y * (cellSize + 1)

		style.left = `${offsetX}px`
		style.top = `${offsetY}px`

		return style
	}, [cellSize, direction, length, x, y])

	return (
		<div
			className={classNames(styles.ship, {
				[styles['ship-killed']]: killed,
			})}
			style={style}
		/>
	)
}

export default Ship

Ship.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
	direction: PropTypes.oneOf(["row", "column"]).isRequired,
	killed: PropTypes.bool.isRequired,
}

Ship.defaultProps = {
	killed: false,
}