import { useSeaBattle } from '../hooks'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { useMemo, forwardRef } from 'react'
import classNames from 'classnames'

// Здесь хранится разлиновка (матрица) игрового поля.
const BattleFieldTable = forwardRef((props, ref) => {
	const { columns, rows, signed, axisX, axisY, hovered, onClick } = props
	const { cellSize } = useSeaBattle()

	const matrix = useMemo(() => {
		const matrix = []

		for (let y = 0; y < rows; y++) {
			const row = []

			for (let x = 0; x < columns; x++) {
				const item = { x, y }
				row.push(item)
			}

			matrix.push(row)
		}

		return matrix
	}, [columns, rows])

	return (
		<table ref={ref} className={styles['battlefield-table']}>
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
									className={classNames({
										[styles['battlefield-item']]: true,
										[styles['battlefield-item__hovered']]:
											hovered,
									})}
									style={{
										width: `${cellSize}px`,
										height: `${cellSize}px`,
									}}
									onClick={() => {
										onClick(x, y)
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
})

export default BattleFieldTable

BattleFieldTable.propTypes = {
	columns: PropTypes.number,
	rows: PropTypes.number,
	signed: PropTypes.bool,
	axisX: PropTypes.func,
	axisY: PropTypes.func,
	// Мышь над полем или нет?
	hovered: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
}

BattleFieldTable.defaultProps = {
	columns: 10,
	rows: 10,
	signed: true,
	axisX: n => n + 1,
	axisY: n => 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'[n], // не более 29
	hovered: false,
	onClick: () => {},
}
