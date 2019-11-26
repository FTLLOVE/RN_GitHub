/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

export default class MyPage extends PureComponent {
	render() {
		const {navigation} = this.props
		return (
			<View style={styles.container}>
				<Text>MyPage</Text>
				<Text onPress={() => {
					navigation.setParams({
						theme: {
							tintColor: 'green',
							updateTime: new Date().getTime()
						}
					})
				}}>改变主题色</Text>
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