/**
 * redux(store) by ftl
 */
import {applyMiddleware, createStore} from 'redux'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigators'
import thunk from "redux-thunk"

const middlewares = [
	middleware,
	thunk
]

/**
 * 创建Store
 */
export default createStore(reducers, applyMiddleware(...middlewares))

