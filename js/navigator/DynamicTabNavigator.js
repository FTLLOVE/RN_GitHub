/**
 * 动态底部导航 by ftl
 */
import React, {PureComponent} from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import PopularPage from "../page/PupularPage"
import TrendingPage from "../page/TrendingPage"
import FavoritePage from "../page/FavoritePage"
import MyPage from "../page/MyPage"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {BottomTabBar} from 'react-navigation-tabs'

const TABS = {
	PopularPage: {
		screen: PopularPage,
		navigationOptions: {
			tabBarLabel: "最热",
			tabBarIcon: ({tintColor, focused}) => (
				<MaterialIcons
					name={'whatshot'}
					size={26}
					style={{color: tintColor}}
				/>
			)
		}
	},
	TrendingPage: {
		screen: TrendingPage,
		navigationOptions: {
			tabBarLabel: "趋势",
			tabBarIcon: ({tintColor, focused}) => (
				<MaterialIcons
					name={'trending-up'}
					size={26}
					style={{color: tintColor}}
				/>
			)
		}
	},
	FavoritePage: {
		screen: FavoritePage,
		navigationOptions: {
			tabBarLabel: "收藏",
			tabBarIcon: ({tintColor, focused}) => (
				<MaterialIcons
					name={'favorite'}
					size={26}
					style={{color: tintColor}}
				/>
			)
		}
	},
	MyPage: {
		screen: MyPage,
		navigationOptions: {
			tabBarLabel: "我的",
			tabBarIcon: ({tintColor, focused}) => (
				<FontAwesome5
					name={'user'}
					size={24}
					style={{color: tintColor}}
				/>
			)
		}
	}
}

export default class DynamicTabNavigator extends PureComponent {

	constructor(prop) {
		super(prop)
		console.disableYellowBox = true
	}

	_tabNavigator() {
		const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS
		const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage} //动态配置底部导航条
		// PopularPage.navigationOptions.tabBarLabel = "最新" // 动态修改底部导航栏的参数
		return createAppContainer(
			createBottomTabNavigator(tabs, {
				tabBarComponent: TabBarComponent
			})
		)
	}

	render() {
		const Tab = this._tabNavigator()
		return <Tab/>
	}

}


class TabBarComponent extends PureComponent {

	constructor(props) {
		super(props);
		this.theme = {
			tintColor: props.activeTintColor,
			updateTime: new Date().getTime()
		}
	}

	render() {
		const {routes, index} = this.props.navigation.state
		if (routes[index].params) {
			const {theme} = routes[index].params
			if (theme && theme.updateTime > this.theme.updateTime) {
				this.theme = theme
			}
		}

		return (
			<BottomTabBar
				{...this.props}
				activeTintColor={this.theme.tintColor || this.props.activeTintColor}
			/>
		)
	}
}