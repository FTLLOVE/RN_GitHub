/**
 * redux(reducer) by ftl
 */
import {combineReducers} from 'redux'
import theme from './theme'
import {rootCom, RootNavigator} from "../navigator/AppNavigators"

/**
 * 1.指定默认的state
 */
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))

/**
 * 2.创建自己的navigation reducer
 * @param state
 * @param action
 * @returns {*}
 */
const navReducer = (state = navState, action) => {
	const nextState = RootNavigator.router.getStateForAction(action, state)
	return nextState || state
}

/**
 * 3.合并reducer
 * @type {Reducer<>}
 */
const index = combineReducers({
	nav: navReducer,
	theme
})

export default index
