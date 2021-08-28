import { Switch, Route } from "react-router-dom";
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
