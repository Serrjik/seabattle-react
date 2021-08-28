import { useCallback } from 'react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { BattleFieldEditor } from '../components'
import { place, dock, random, reset, rotate, setShips } from '../store/editor'
import { setShips as setDefaultShips } from '../store/main'
import styles from './styles.module.css'

// Страница с редактором игры.
const EditorPage = () => {
	/*
		Корабли из состояния главной страницы, которые расставились
		автоматически при загрузке страницы.
	*/
	const defaultShips = useSelector(state => state.main.ships)

	const ships = useSelector(state => state.editor.ships)
	const dispatch = useDispatch()
	const history = useHistory()

	// Расставлены ли все корабли?
	const placed = useMemo(() => ships.every(ship => ship.placed), [ships])

	useEffect(() => {
		dispatch(setShips(defaultShips))
	}, [defaultShips, dispatch])

	// Обработчик клика по кнопке "Сохранить".
	const clickHandler = useCallback(() => {
		dispatch(setDefaultShips(ships))
		history.push('/')
	}, [dispatch, ships])

	return (
		<div className={styles.container}>
			<div className={styles['battlefield-constructor']}>
				{/*
					Обработчик onPlace принимает id корабля и координаты,
					куда его нужно сбросить.
					Обработчик onDock принимает id корабля.
				*/}
				<BattleFieldEditor
					ships={ships}
					onPlace={(id, x, y) => dispatch(place({ id, x, y }))}
					onDock={id => dispatch(dock(id))}
					onRotate={id => dispatch(rotate(id))}
				/>
			</div>
			<div className={styles['editor-actions']}>
				<button
					className={styles.action}
					onClick={() => dispatch(reset())}
				>
					Сбросить
				</button>
				<button
					className={styles.action}
					onClick={() => dispatch(random())}
				>
					Случайно
				</button>
				<button
					className={styles.action}
					disabled={!placed}
					onClick={clickHandler}
				>
					Сохранить
				</button>
			</div>
		</div>
	)
}

export default EditorPage
