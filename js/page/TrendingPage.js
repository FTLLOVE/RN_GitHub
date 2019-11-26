/**
 * 趋势页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

export default class TrendingPage extends PureComponent {

	render() {
		const {navigation} = this.props
		return (
			<View style={styles.container}>
				<Text>TrendingPage</Text>
				<Button title={'改变主题色'} onPress={() => {
					navigation.setParams({
						theme: {
							tintColor: 'red',
							updateTime: new Date().getTime()
						}
					})
				}}/>
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