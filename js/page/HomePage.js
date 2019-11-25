/**
 * 首页 by ftl
 */
import React, {PureComponent} from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import PopularPage from "./PupularPage"
import TrendingPage from "./TrendingPage"
import FavoritePage from "./FavoritePage"
import MyPage from "./MyPage"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default class HomePage extends PureComponent {

	_tabNavigator() {
		return (
			createAppContainer(
				createBottomTabNavigator({
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
				})
			)
		)
	}

	render() {
		const Tab = this._tabNavigator()
		return (
			<Tab/>
		)
	}
}