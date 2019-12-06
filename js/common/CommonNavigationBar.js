/**
 * CommonNavigationBar.js by ftl
 */
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Platform, DeviceInfo, StatusBar, ViewPropTypes } from 'react-native'
import { PropTypes } from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

// 设置状态栏所接收的属性 
const StatusBarShape = {
	barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
	hidden: PropTypes.bool,
	backgroundColor: PropTypes.string
}

export default class CommonNavigationBar extends PureComponent {

	// 设置默认属性
	static defaultProps = {
		statusBar: {
			barStyle: 'dark-content',
			hidden: true
		}
	}

	// 接收属性的类型检查
	static propType = {
		style: PropTypes.style,
		title: PropTypes.string,
		titleView: PropTypes.element,
		titleLayoutStyle: ViewPropTypes.style,
		hide: PropTypes.bool,
		statusBar: PropTypes.shape(StatusBarShape),
		rightButton: PropTypes.element,
		leftButton: PropTypes.element,
		titleStyle: PropTypes.style
	}

	renderButton(data) {
		return (
			<View style={styles.navBarButton}>
				{data ? data : null}
			</View>
		)
	}

	render() {
		let statusBar = !this.props.statusBar.hidden ?
			<View style={styles.statusBar}>
				<StatusBar {...this.props.statusBar} hidden={false} />
			</View> : null

		let titleView = this.props.titleView ? this.props.titleView :
			<Text numberOfLines={1} ellipsizeMode={'head'} style={[styles.title, this.props.titleStyle]}>
				{this.props.title}
			</Text>

		let contentView = this.props.hide ? null :
			<View style={styles.navBar}>
				{this.renderButton(this.props.leftButton)}
				<View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
					{titleView}
				</View>
				{this.renderButton(this.props.rightButton)}
			</View>
		return (
			<View style={[styles.container, this.props.style]}>
				{statusBar}
				{contentView}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f26966'
	},
	statusBar: {
		height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
	},
	navBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
	},
	title: {
		fontSize: 18,
		color: '#fff'
	},
	navBarButton: {
		alignItems: 'center'
	},
	navBarTitleContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 40,
		right: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
})