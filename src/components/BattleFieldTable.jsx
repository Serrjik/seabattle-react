import { useSeaBattle } from "../hooks"
import styles from "./styles.module.css"
import PropTypes from 'prop-types'

// Здесь хранится разлиновка (матрица) игрового поля.
const BattleFieldTable = props => {
	const { columns, rows, signed, axisX, axisY } = props
	const { cellSize } = useSeaBattle()

	const matrix = []

	for (let y = 0; y < rows; y++) {
		const row = []

		for (let x = 0; x < columns; x++) {
			const item = { x, y }
			row.push(item)
		}

		matrix.push(row)
	}

	return (
		<table className={styles['battlefield-table']}>
			<tbody>
				{matrix.map((row, y) => (
					<tr key={y}>
						{row.map((item, x) => {
							let markerX = null
							let markerY = null

							if (signed) {
								if (x === 0) {
									markerX = (
										<span
											className={styles.marker}
											style={{ left: `-${cellSize}px` }}
										>
											{axisX(y)}
										</span>
									)
								}

								if (y === 0) {
									markerY = (
										<span
											className={styles.marker}
											style={{ top: `-${cellSize}px` }}
										>
											{axisY(x)}
										</span>
									)
								}
							}

							return (
								<td
									key={x}
									className={styles['battlefield-item']}
									style={{
										width: `${cellSize}px`,
										height: `${cellSize}px`,
									}}
								>
									{markerX}
									{markerY}
								</td>
							)
						})}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default BattleFieldTable

BattleFieldTable.propTypes = {
	columns: PropTypes.number,
	rows: PropTypes.number,
	signed: PropTypes.bool,
	axisX: PropTypes.func,
	axisY: PropTypes.func,
}

BattleFieldTable.defaultProps = {
	columns: 10,
	rows: 10,
	signed: true,
	axisX: n => n + 1,
	axisY: n => 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'[n], // не более 29
}