/**
 * 趋势页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, DeviceInfo, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import CommonNavigationBar from '../common/CommonNavigationBar'
import ActionSheet from 'react-native-actionsheet'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

const CANCEL_INDEX = 0

class TrendingPage extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 1,
			options: ['取消', '今日', '本周', '本月'],
			tabs: ['Java', 'IOS', 'React Native', 'Vue', 'React', 'Node', 'Golang', 'PHP', 'JavaScript'],
		}
	}

	handleChange() {
	}

	render() {
		let statusBar = {
			barStyle: "light-content"
		}

		let titleView = <View style={styles.titleView}>
			<Text style={{color: '#fff', fontSize: 18, marginRight: 4}}>趋势</Text>
			<TouchableOpacity
				style={{flexDirection: 'row', alignItems: 'center'}}
				onPress={() => {
					this.ActionSheet.show()
				}}>
				<Text style={{fontSize: 16, color: '#fff'}}>{this.state.options[this.state.selectedIndex]}</Text>
				<AntDesign
					name={'caretdown'}
					size={10}
					style={{color: '#fff'}}
				/>
			</TouchableOpacity>
		</View>

		let navigationBar = <CommonNavigationBar
			title={'趋势'}
			statusBar={statusBar}
			titleView={titleView}
		/>

		return (
			<View style={styles.container}>
				{navigationBar}
				<ScrollableTabView
					style={{flex: 1}}
					tabBarBackgroundColor={'#fff'}
					tabBarActiveTextColor={'#f26966'}
					tabBarUnderlineStyle={{backgroundColor: '#f26966'}}
					tabBarInactiveTextColor={'#555'}
					tabBarTextStyle={{fontSize: 14, width: '100%'}}
					scrollWithoutAnimation={true}
					renderTabBar={() => <ScrollableTabBar/>}
					onChangeTab={(val) => {
					}}
				>
					{
						this.state.tabs.map((item, index) => (
							<View style={styles.textStyle} tabLabel={item} key={index}>
								<Text>{item}</Text>
							</View>
						))
					}
				</ScrollableTabView>

				<ActionSheet
					ref={o => this.ActionSheet = o}
					options={this.state.options}
					cancelButtonIndex={CANCEL_INDEX}
					onPress={(index) => {
						if (index === 0) {
							return
						} else {
							this.setState({
								selectedIndex: index
							})
						}
					}}
				/>
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
		marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
	},

	titleView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	textStyle: {
		flex: 1,
		fontSize: 20
	}
})