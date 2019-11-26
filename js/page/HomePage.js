/**
 * 首页 by ftl
 */
import React, {PureComponent} from 'react'
import NavigationUtil from "../navigator/NavigationUtil"
import DynamicTabNavigator from "../navigator/DynamicTabNavigator"

export default class HomePage extends PureComponent {


	render() {
		NavigationUtil.navigation = this.props.navigation
		return (
			<DynamicTabNavigator/>
		)
	}
}