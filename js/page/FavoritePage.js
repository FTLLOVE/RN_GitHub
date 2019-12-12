/**
 * 收藏页面 by ftl
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet, DeviceInfo, Text, Button } from 'react-native'
import CommonNavigationBar from "../common/CommonNavigationBar"
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import NavigationUtil from '../navigator/NavigationUtil'
export default class FavoritePage extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			tabs: ['最热', '趋势']
		}
	}

	render() {

		let navigationBar = <CommonNavigationBar
			title={'收藏'}
		/>

		return (
			<View style={styles.container}>
				{navigationBar}
				<View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
					<Text style={{ justifyContent: 'center', alignItems: 'center',fontSize: 20 }}>施工中</Text>
				</View>
				{/* <ScrollableTabView
					style={{ flex: 1 }}
					tabBarBackgroundColor={'#fff'}
					tabBarActiveTextColor={'#2b98f4'}
					tabBarUnderlineStyle={{ backgroundColor: '#2b98f4' }}
					tabBarInactiveTextColor={'#555'}
					tabBarTextStyle={{ fontSize: 14, width: '100%' }}
					scrollWithoutAnimation={true}
					renderTabBar={() => <ScrollableTabBar />}
				>
					{
						this.state.tabs.map((item, index) => (
							<View style={{ flex: 1, fontSize: 20 }} tabLabel={item} key={index}>
								<Text style={{ justifyContent: 'center', alignItems: 'center' }}>施工中</Text>
							</View>
						))
					}

				</ScrollableTabView> */}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0

	}
})