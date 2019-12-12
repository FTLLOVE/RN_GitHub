/**
 * CommonActivityIndicator.js by ftl
 */
import React, {PureComponent} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

export default class CommonActivityIndicator extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator
					color={'#2b98f4'}
					size={'large'}
					animating={this.props.showIndicator}
				/>
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

