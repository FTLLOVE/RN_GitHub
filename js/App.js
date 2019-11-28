import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import AppNavigator from "./navigator/AppNavigators"
import store from './store'

export default class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<AppNavigator/>
			</Provider>
		)
	}
}
