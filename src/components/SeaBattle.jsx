import { createContext, useMemo } from "react";
import PropTypes from 'prop-types'

export const SeaBattleContext = createContext()

const SeaBattle = props => {
	const { cellSize, children } = props
	// Размер ячейки игрового поля.
	const value = useMemo(() => ({ cellSize }), [cellSize])

	return (
		<SeaBattleContext.Provider value={value}>
			{children}
		</SeaBattleContext.Provider>
	)
}

export default SeaBattle

SeaBattle.propTypes = {
	cellSize: PropTypes.number.isRequired
}

SeaBattle.defaultProps = {
	cellSize: 32
}