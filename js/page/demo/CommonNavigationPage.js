/**
 * 我的页面 by ftl
 */
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action'
import CommonNavigationBar from "../common/CommonNavigationBar"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

class CommonNavigationPage extends PureComponent {

	renderLeftButton() {
		return (
			<TouchableOpacity onPress={() => {
				alert('leftButton')
			}}>
				<View style={{ paddingLeft: 10 }}>
					<Ionicons
						name={'ios-arrow-back'}
						size={24}
						style={{ color: '#fff' }}
					/>
				</View>
			</TouchableOpacity>
		)
	}

	renderRightButton() {
		return (
			<TouchableOpacity onPress={() => {
				alert('rightButton')
			}}>
				<View style={{ paddingRight: 10 }}>
					<Feather
						name={'search'}
						size={20}
						style={{ color: '#fff' }}
					/>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		let statusBar = {
			barStyle: 'light-content'
		}
		let navigationBar = <CommonNavigationBar
			title={'我的'}
			statusBar={statusBar}
			style={{ backgroundColor: '#2b98f4' }}
			leftButton={this.renderLeftButton()}
			rightButton={this.renderRightButton()}
		/>
		return (
			<View style={styles.container}>
				{navigationBar}
				<Text>hello world</Text>
			</View>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	onThemeChange(val) {
		dispatch(actions.onThemeChange(val))
	}
})

export default connect(null, mapDispatchToProps)(CommonNavigationPage)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30
	}
})