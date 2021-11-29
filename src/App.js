import { Switch, Route } from 'react-router-dom'
import { BotPage, EditorPage, MainPage, PartyPage } from './pages'

const App = () => {
	return (
		<Switch>
			<Route
				exact
				path='/challenge/:key'
				render={() => <PartyPage challenge />}
			/>
			<Route
				exact
				path='/challenge/'
				render={() => <PartyPage challenge />}
			/>
			<Route path='/party' component={PartyPage} />
			<Route path='/editor' component={EditorPage} />
			<Route path='/bot' component={BotPage} />
			<Route path='/' component={MainPage} />
		</Switch>
	)
}

export default App
