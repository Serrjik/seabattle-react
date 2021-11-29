import styles from './styles.module.css'
import { BattleField, BattleFieldTable, Ship, Shot } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import { exit, find, challenge as socketChallenge, shot } from '../socket'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

const PartyPage = props => {
	const { challenge } = props

	const dispatch = useDispatch()
	const history = useHistory()
	const { key } = useParams()

	const state = useSelector(state => state.party)
	// Стартовое состояние кораблей пользователя.
	const defaultShips = useSelector(state => state.main.ships)

	useEffect(() => {
		if (challenge) {
			if (key) {
				// Принять вызов.
				socketChallenge(defaultShips, key)
			} else {
				// Бросить вызов.
				socketChallenge(defaultShips, key)
			}
		} else {
			// Сообщить бэкэнду о том, что пользователь ищет соперника.
			find(defaultShips)
		}
	}, [challenge, defaultShips, dispatch, key, state.key])

	useEffect(() => {
		if (challenge) {
			history.push({ pathname: `/challenge/${state.key}` })
		}
	}, [challenge, history, state.key])

	// Ссылка на созданную партию.
	const href = window.location.href

	const status = useMemo(() => {
		if (state.waiting) {
			if (challenge) {
				return (
					<div style={{ textAlign: 'center', fontSize: '30px' }}>
						<span>Ищем соперника</span>
						<p
							style={{
								fontSize: '14px',
								marginTop: '15px',
								userSelect: 'text',
							}}
						>
							{href}
						</p>
					</div>
				)
			}

			return (
				<div style={{ textAlign: 'center', fontSize: '30px' }}>
					<span>Ищем соперника</span>
				</div>
			)
		}

		if (state.playing) {
			if (state.player1Turn) {
				return (
					<span style={{ textAlign: 'center', fontSize: '30px' }}>
						Ваш ход!
					</span>
				)
			}

			return (
				<span style={{ textAlign: 'center', fontSize: '30px' }}>
					Ход соперника
				</span>
			)
		}

		if (state.player1Win) {
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
	}, [
		challenge,
		href,
		state.player1Turn,
		state.player1Win,
		state.playing,
		state.waiting,
	])

	// Обработчик выхода из онлайн-партии.
	const onExit = useCallback(() => {
		exit()
		history.push('/')
	}, [history])

	// Если что-то пошло не так (ошибка):
	if (state.incorrect) {
		return (
			<div
				className={styles['main-actions']}
				style={{
					justifyContent: 'space-evenly',
					alignItems: 'center',
					minHeight: '200px',
				}}
			>
				<span style={{ textAlign: 'center', fontSize: '30px' }}>
					Что-то пошло не так!
				</span>
				<Link to='/'>
					<button className={styles.action}>Вернуться</button>
				</Link>
			</div>
		)
	}

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

					{state.ships1.map(ship => (
						<Ship key={ship.id} {...ship} />
					))}

					{/* Выстрелы по первому игроку. */}
					{state.shots1.map(shot => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>

				<div className={styles['main-actions']}>
					{status}

					<button className={styles.action} onClick={onExit}>
						{(() => {
							if (state.waiting) {
								return 'Выйти'
							}

							return state.playing ? 'Сдаться' : 'Выйти'
						})()}
					</button>
				</div>

				<BattleField>
					<BattleFieldTable
						hovered
						onClick={(x, y) => shot(x, y)}
						// columns={12}
						// rows={5}
						// signed={false}
						axisX={n => n + 1}
						// axisY ={n => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n]}
					/>

					{state.ships2.map(ship => (
						<Ship key={ship.id} {...ship} />
					))}

					{/* Выстрелы по второму игроку. */}
					{state.shots2.map(shot => (
						<Shot key={shot.id} {...shot} />
					))}
				</BattleField>
			</div>
			<pre>{JSON.stringify(state, null, 3)}</pre>
		</div>
	)
}

export default PartyPage
