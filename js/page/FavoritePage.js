/**
 * 收藏页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, StyleSheet, DeviceInfo} from 'react-native'
import CommonNavigationBar from "../common/CommonNavigationBar"

export default class FavoritePage extends PureComponent {

	render() {

		let statusBar = {
			barStyle: 'light-content'
		}

		let navigationBar = <CommonNavigationBar
			statusBar={statusBar}
			title={'收藏'}
		/>

		return (
			<View style={styles.container}>
				{navigationBar}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0

	}
})