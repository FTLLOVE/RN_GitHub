/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import NavigationUtil from "../navigator/NavigationUtil";

class MyPage extends PureComponent {
	render() {
		return (
			<View style={{flex: 1}}>

			</View>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	onThemeChange(val) {
		dispatch(actions.onThemeChange(val))
	}
})

export default connect(null, mapDispatchToProps)(MyPage)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
})