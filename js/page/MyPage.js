/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceInfo} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import CommonNavigationBar from "../common/CommonNavigationBar"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

class MyPage extends PureComponent {

	render() {
		let statusBar = {
			barStyle: 'light-content',
		}
		let navigationBar = <CommonNavigationBar
			title={'我的'}
			statusBar={statusBar}
			style={{backgroundColor: '#f26966'}}
		/>
		return (
			<View style={styles.container}>
				{navigationBar}
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
		marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
	}
})