/**
 * 最热页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from "../navigator/NavigationUtil"

export default class PopularPage extends PureComponent {

	render() {
		const TabNavigator = createAppContainer(
			createMaterialTopTabNavigator({
				PopularTab1: {
					screen: PopularTab,
					navigationOptions: {
						title: 'tab1'
					}
				},
				PopularTab2: {
					screen: PopularTab,
					navigationOptions: {
						title: 'tab2'
					}
				},
				PopularTab3: {
					screen: PopularTab,
					navigationOptions: {
						title: 'tab3'
					}
				}
			})
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