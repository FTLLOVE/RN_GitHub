/**
 * 趋势页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'

class TrendingPage extends PureComponent {

	render() {
		return (
			<View style={styles.container}>
				<Text>TrendingPage</Text>
				<Button title={'改变主题色'} onPress={() => {
					this.props.onThemeChange('#096')
				}}/>
			</View>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
})