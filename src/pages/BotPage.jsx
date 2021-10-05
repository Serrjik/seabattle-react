import styles from './styles.module.css'
import { BattleField, BattleFieldTable, Ship, Shot } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { reset, shoot } from '../store/bot'
import { Link } from 'react-router-dom'

const BotPage = () => {
	const dispatch = useDispatch()

	const state = useSelector(state => state.bot)
	// Стартовое состояние кораблей пользователя.
	const defaultShips = useSelector(state => state.main.ships)

	const [showBot, setShowBot] = useState(false)

	useEffect(() => {
		dispatch(reset(defaultShips))
	}, [defaultShips, dispatch])

	const status = useMemo(() => {
		if (state.playing) {
			return (
				<span style={{ textAlign: 'center', fontSize: '30px' }}>
					Ваш ход!
				</span>
			)
		}

		if (state.playerWin) {
			return (
				<span style={{ textAlign: 'center', fontSize: '30px' }}>
					Поздравляю с победой!
				</span>
			)
		}

		return (
			<span style={{ textAlign: 'center', fontSize: '30px' }}>
				Увы, вы проиграли.
			</span>
		)
	}, [state.playerWin, state.playing])

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

					{state.playerShips.map(ship => (
						<Ship key={ship.id} {...ship} />
					))}

					{state.playerShots.map(shot => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>

				<div className={styles['main-actions']}>
					{status}
					<button
						className={styles.action}
						onClick={() => dispatch(reset(defaultShips))}
					>
						Переиграть
					</button>
					<button
						className={styles.action}
						onClick={() => setShowBot(x => !x)}
					>
						Показать бота
					</button>
					<Link to='/'>
						<button
							className={styles.action}
							onClick={() => dispatch(reset(defaultShips))}
						>
							Сдаться
						</button>
					</Link>
				</div>

				<BattleField>
					<BattleFieldTable
						hovered
						onClick={(x, y) => dispatch(shoot({ x, y }))}
					/>
					{/* 
						Видим убитые корабли либо все, если включен режим
						отображения кораблей 
					*/}
					{state.botShips
						.filter(ship => ship.killed || showBot)
						.map(ship => (
							<Ship key={ship.id} {...ship} />
						))}

					{state.botShots.map(shot => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>
			</div>
		</div>
	)
}

export default BotPage
