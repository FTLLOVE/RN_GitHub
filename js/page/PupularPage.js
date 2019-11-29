/**
 * 最热页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from "../navigator/NavigationUtil"

export default class PopularPage extends PureComponent {

	constructor(props) {
		super(props);
		console.disableYellowBox = true
		this.tabs = ['优惠', '物流', '订阅1', '订阅2', '订阅3', '订阅4']
	}

	_genTabs() {
		const tabs = {}
		this.tabs.forEach((item, index) => {
			tabs[`tab${index}`] = {
				screen: (props) => <PopularTab {...props} tabLabel={item}/>,
				navigationOptions: {
					title: item
				}
			}
		})
		return tabs
	}

	render() {
		this._genTabs()
		const TabNavigator = createAppContainer(
			createMaterialTopTabNavigator(
				this._genTabs(), {
					tabBarOptions: {
						animationEnabled: false,
						tabStyle: styles.tabStyle,
						upperCaseLabel: false,
						scrollEnabled: true,
						style: {
							backgroundColor: '#678'
						},
						indicatorStyle: styles.indicatorStyle,

					}
				}
			)
		)

		return (
			<SafeAreaView style={{flex: 1}}>
				<TabNavigator/>
			</SafeAreaView>

		)
	}
}

class PopularTab extends PureComponent {

	render() {
		const {tabLabel} = this.props
		return (
			<View style={{flex: 1}}>
				<Text>{tabLabel}</Text>
				<Text onPress={() => {
					NavigationUtil.goPage({
						navigation: this.props.navigation
					}, 'DetailPage')
				}}>跳转到详情</Text>

				<Button title={'Fetch'} onPress={() => {
					NavigationUtil.goPage(null, 'FetchPage')
				}}/>

				<Button title={'AsyncStorage'} onPress={() => {
					NavigationUtil.goPage(null, 'AsyncStoragePage')
				}}/>

				<Button title={'离线缓存'} onPress={() => {
					NavigationUtil.goPage(null, 'DataStorePage')
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
	},

	tabStyle: {
		minWidth: 50
	},

	indicatorStyle: {
		height: 2,
		backgroundColor: '#fff'
	}
})