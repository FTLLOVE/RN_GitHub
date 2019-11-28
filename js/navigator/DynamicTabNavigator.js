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
import {connect} from 'react-redux'
import TabBarBottom from "react-navigation-tabs/dist/views/BottomTabBar";

const TABS = {
	PopularPage: {
		screen: PopularPage,
		navigationOptions: {
			tabBarLabel: "最热",
			tabBarIcon: ({tintColor}) => (
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
			tabBarIcon: ({tintColor}) => (
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
			tabBarIcon: ({tintColor}) => (
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
			tabBarIcon: ({tintColor}) => (
				<FontAwesome5
					name={'user'}
					size={24}
					style={{color: tintColor}}
				/>
			)
		}
	}
}

class DynamicTabNavigator extends PureComponent {

	constructor(prop) {
		super(prop)
	}

	_tabNavigator() {
		if (this.tabs) {
			return this.tabs
		}
		const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS
		const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage} //动态配置底部导航条
		// PopularPage.navigationOptions.tabBarLabel = "最新" // 动态修改底部导航栏的参数
		return this.tabs = createAppContainer(
			createBottomTabNavigator(tabs, {
				tabBarComponent: (props) => {
					return (
						<BottomTabBar
							{...props}
							activeTintColor={this.props.theme}
						/>
					)
				}
			})
		)
	}

	render() {
		const Tab = this._tabNavigator()
		return <Tab/>
	}

}


const mapStateToProps = state => ({
	theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)