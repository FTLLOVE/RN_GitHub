/**
 * 我的页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, StyleSheet, DeviceInfo, Text} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import CommonNavigationBar from "../common/CommonNavigationBar"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MyItem from '../common/MyItem'
import CommonDimensions from "../common/CommonDimensions";

class MyPage extends PureComponent {

	render() {
		let navigationBar = <CommonNavigationBar
			title={'我的'}
		/>

		let renderTopIcon = <AntDesign
			name={'github'}
			size={40}
			style={{color: '#2b98f4'}}
		/>

		let projectIcon = <Octicons
			name={'project'}
			size={15}
			style={{color: '#2b98f4'}}
		/>

		let trendingWIcon = <EvilIcons
			name={'pencil'}
			size={21}
			style={{color: '#2b98f4'}}
		/>

		let trendingSIcon = <MaterialIcons
			name={'sort'}
			size={20}
			style={{color: '#2b98f4'}}
		/>

		let logoutIcon = <Feather
			name={'log-out'}
			size={20}
			style={{color: '#2b98f4'}}
		/>

		let themeIcon = <Ionicons
			name={'ios-color-palette'}
			size={21}
			style={{color: '#2b98f4'}}
		/>

		let aboutIcon = <Ionicons
			name={'ios-person'}
			size={20}
			style={{color: '#2b98f4'}}
		/>

		let upIcon = <Ionicons
			name={'md-cloud-upload'}
			size={20}
			style={{color: '#2b98f4'}}
		/>

		let messageIcon = <Feather
			name={'message-square'}
			size={20}
			style={{color: '#2b98f4'}}
		/>

		return (
			<View style={styles.container}>
				{navigationBar}
				<View>
					<MyItem Icon={renderTopIcon} title={'Github'} containerStyle={{height: 70}}
					        titleStyle={{marginLeft: 10, fontSize: 18, color: '#767676'}}/>
					<MyItem Icon={projectIcon} title={'项目'} titleStyle={styles.itemTitleStyle}/>

					<View
						style={styles.labelContainer}>
						<Text style={styles.labelTitleStyle}>趋势管理</Text>
					</View>
					<MyItem Icon={trendingWIcon} title={'自定义语言'} titleStyle={styles.itemTitleStyle}/>
					<MyItem Icon={trendingSIcon} title={'语言排序'} titleStyle={styles.itemTitleStyle}/>
					<View
						style={styles.labelContainer}>
						<Text style={styles.labelTitleStyle}>最热管理</Text>
					</View>
					<MyItem Icon={trendingWIcon} title={'自定义标签'} titleStyle={styles.itemTitleStyle}/>
					<MyItem Icon={trendingSIcon} title={'标签排序'} titleStyle={styles.itemTitleStyle}/>
					<MyItem Icon={logoutIcon} title={'标签移除'} titleStyle={styles.itemTitleStyle}/>
					<View
						style={styles.labelContainer}>
						<Text style={styles.labelTitleStyle}>设置</Text>
					</View>
					<MyItem Icon={themeIcon} title={'自定义主题'} titleStyle={[styles.itemTitleStyle, styles.themeTitle]}/>
					<MyItem Icon={upIcon} title={'版本升级'} titleStyle={[styles.itemTitleStyle, styles.upTitle]}/>
					<MyItem Icon={messageIcon} title={'反馈'} titleStyle={[styles.itemTitleStyle]}/>
					<MyItem Icon={aboutIcon} title={'关于我'} titleStyle={[styles.itemTitleStyle, styles.aboutTitle]}/>

				</View>
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
		marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
	},
	labelContainer: {
		height: 28,
		width: CommonDimensions.width,
		backgroundColor: '#f3f3f3',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 5
	},
	labelTitleStyle: {
		color: '#878787',
		fontSize: 12
	},
	itemTitleStyle: {
		marginLeft: 10,
		fontSize: 15,
		color: '#767676'
	},
	themeTitle: {
		marginLeft: 15
	},
	aboutTitle: {
		marginLeft: 16
	},
	upTitle: {
		marginLeft: 13
	}
})