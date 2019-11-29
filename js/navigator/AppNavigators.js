/**
 * 公共导航 by ftl
 */
import React from 'react'
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation'
import WelcomePage from "../page/WelcomePage"
import HomePage from "../page/HomePage"
import DetailPage from "../page/DetailPage"
import FetchPage from '../page/demo/FetchPage'
import {connect} from 'react-redux'
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers'

export const rootCom = "Init"

const InitNavigator = createStackNavigator({
	WelcomePage: {
		screen: WelcomePage,
		navigationOptions: {
			header: null
		}
	}
})

const MainNavigator = createStackNavigator({
	HomePage: {
		screen: HomePage,
		navigationOptions: {
			header: null
		}
	},
	DetailPage: {
		screen: DetailPage,
		navigationOptions: {}
	},
	FetchPage: {
		screen: FetchPage
	}
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
	Init: InitNavigator,
	Main: MainNavigator
}, {
	navigationOptions: {
		header: null
	}
}))

/**
 * 初始化react-navigation和redux的中间件
 * 该方法的一个很大的作用是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
	'root',
	state => state.nav
)

/**
 * 将根导航器组件传递给reduxifyNavigator函数，并返回一个
 * @type {React.ComponentType<{state:  dispatch: }>}
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

/**
 * state到props的映射关系
 * @param state
 * @returns {{state: *}}
 */
const mapStateToProps = state => ({
	state: state.nav
})

/**
 * 连接react组件和redux的store
 */
export default connect(mapStateToProps)(AppWithNavigationState)
