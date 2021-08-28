// Док для кораблей.

import { forwardRef } from 'react'
import { useSeaBattle } from '../hooks'
import styles from './styles.module.css'

const Dock = forwardRef((props, ref) => {
	const { cellSize } = useSeaBattle()
	return (
		<div
			ref={ref}
			className={styles.dock}
			style={{
				width: `${cellSize * 10}px`,
				height: `${cellSize * 10}px`,
			}}
		>
			{props.children}
		</div>
	)
})

export default Dock
