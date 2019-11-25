/**
 * 收藏页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class FavoritePage extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Text>FavoritePage</Text>
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