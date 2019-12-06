/**
 * 详情页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceInfo} from 'react-native'
import CommonNavigationBar from '../common/CommonNavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from '../navigator/NavigationUtil'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import WebView from 'react-native-webview'

export default class DetailPage extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			html_url: this.props.navigation.state.params.html_url,
			full_name: this.props.navigation.state.params.full_name,
			canGoBack: false
		}
	}

	handleBack() {
		if (this.state.canGoBack) {
			this.webView.goBack()
		} else {
			NavigationUtil.goBack(this.props.navigation)
		}
	}

	renderLeftButton() {
		return (
			<TouchableOpacity onPress={this.handleBack.bind(this)}>
				<View style={{paddingLeft: 10}}>
					<Ionicons
						name={'ios-arrow-back'}
						size={24}
						style={{color: '#fff'}}
					/>
				</View>
			</TouchableOpacity>
		)
	}

	renderRightButton() {
		return (
			<View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
				<TouchableOpacity style={{marginRight: 5}}>
					<View>
						<AntDesign
							name={'staro'}
							size={24}
							style={{color: '#fff'}}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View>
						<EvilIcons
							name={'share-google'}
							size={28}
							style={{color: '#fff'}}
						/>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	onNavigationStateChange(e) {
		this.setState({
			canGoBack: e.canGoBack
		})
	}

	render() {
		let statusBar = {
			barStyle: 'light-content'
		}

		let navigationBar = <CommonNavigationBar
			leftButton={this.renderLeftButton()}
			rightButton={this.renderRightButton()}
			statusBar={statusBar}
			title={this.state.full_name}
		/>
		return (
			<View style={styles.container}>
				{navigationBar}
				<WebView
					ref={webView => this.webView = webView}
					source={{uri: this.state.html_url}}
					startInLoadingState={true}
					onNavigationStateChange={e => this.onNavigationStateChange(e)}
				/>
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