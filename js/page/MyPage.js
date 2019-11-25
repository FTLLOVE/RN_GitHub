/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class MyPage extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Text>MyPage</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
})