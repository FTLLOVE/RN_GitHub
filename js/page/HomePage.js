/**
 * 首页 by ftl
 */
import React, { PureComponent } from 'react'
import NavigationUtil from "../navigator/NavigationUtil"
import DynamicTabNavigator from "../navigator/DynamicTabNavigator"
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class HomePage extends PureComponent {

	constructor(props) {
		console.disableYellowBox = true
		super(props);
	}


	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
	}

	/**
	 * 处理安卓物理返回键
	 */
	onBackPress = () => {
		const { dispatch, nav } = this.props
		if (nav.routes[1].index === 0) {
			return false
		}
		dispatch(NavigationActions.back())
		return true
	}

	render() {
		NavigationUtil.navigation = this.props.navigation
		return (
			<DynamicTabNavigator />
		)
	}
}

const mapStateToProps = state => ({
	nav: state.nav
})

export default connect(mapStateToProps)(HomePage)