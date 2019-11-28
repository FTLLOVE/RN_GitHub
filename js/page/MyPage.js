/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'

class MyPage extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Text>MyPage</Text>
				<Text onPress={() => {
					this.props.onThemeChange('#639')
				}}>改变主题色</Text>
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