import { BattleField, BattleFieldTable, Ship, Shot } from "./components";

import { Switch, Route, Link } from "react-router-dom";

import { BotPage, EditorPage, MainPage } from "./pages"

const App = () => {
	return (
		<Switch>
			<Route path='/editor' component={EditorPage} />
			<Route path='/bot' component={BotPage} />
			<Route path='/' component={MainPage} />
		</Switch>
	)
}

export default App;
