import styles from "./styles.module.css"

// Этот компонент объединит в себе BattleFieldTable, Ship, Shot.
const BattleField = props => {
	const { children, style = {} } = props

	return <div className={styles.battlefield} style={style}>{children}</div>
}

export default BattleField