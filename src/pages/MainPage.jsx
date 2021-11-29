import styles from './styles.module.css'
import { BattleField, BattleFieldTable, Ship } from '../components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { reset } from '../store/party'

const MainPage = () => {
	// Стартовое состояние кораблей пользователя.
	const ships = useSelector(state => state.main.ships)
	const dispatch = useDispatch()

	useEffect(() => {
		// Расстановка кораблей случайным образом.
		dispatch(reset(ships))
	}, [dispatch, ships])

	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>
				<BattleField>
					<BattleFieldTable
						// columns={12}
						// rows={5}
						// signed={false}
						axisX={n => n + 1}
						// axisY ={n => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n]}
					/>

					{ships.map(ship => (
						<Ship key={ship.id} {...ship} />
					))}
				</BattleField>

				<div className={styles['main-actions']}>
					<Link to='/editor'>
						<button className={styles.action}>Редактировать</button>
					</Link>
					<Link to='/bot'>
						<button className={styles.action}>
							Играть с ботом
						</button>
					</Link>
					<Link to='/party'>
						<button className={styles.action}>Играть онлайн</button>
					</Link>
					<Link to='/challenge'>
						<button className={styles.action}>Бросить вызов</button>
					</Link>
				</div>

				<BattleField>
					<BattleFieldTable />
				</BattleField>
			</div>
		</div>
	)
}

export default MainPage
