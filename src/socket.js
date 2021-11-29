// Работа с сокетами. Прослушка событий сокетов. Работа с методами сокетов.

// Client Initialization
import { io } from 'socket.io-client'
import { dispatch } from './store'
import { incorrect, update } from './store/party'
const socket = io()

/* Клиент слушает socket события */

// Обновление состояния партии
socket.on('party.update', party => dispatch(update(party)))

// Ошибка. Чаще всего вызывается из-за неверного ship массива.
socket.on('party.incorrect', () => dispatch(incorrect()))

/* Сервер слушает socket события */

// Поиск случайной партии. Принимает массив кораблей.
export const find = ships => socket.emit('party.find', ships)

/*
    Бросить/принять вызов. Первый аргумент массив кораблей.
    Второй аргумент не обязательный ключ принимаемого вызова.
*/
export const challenge = (ships, key) =>
	socket.emit('party.challenge', ships, key)

// Сдаться
export const surrender = () => socket.emit('party.surrender')

// Выйти из партии (сдаться если соперник все еще в партии)
export const exit = () => socket.emit('party.exit')

// Выстрел. Принимает координаты выстрела.
export const shot = (x, y) => socket.emit('party.shot', x, y)
