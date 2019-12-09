/**
 * 最热页面 by ftl
 */
import React, {PureComponent} from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	RefreshControl,
	ActivityIndicator,
	DeviceInfo
} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import DataStore from "../expand/dao/DataStore"
import PopularItem from "../common/PopularItem"
import CommonActivityIndicator from '../common/CommonActivityIndicator'
import CommonDimensions from "../common/CommonDimensions"
import CommonNavigationBar from '../common/CommonNavigationBar'

const PAGES = 34;

class PopularPage extends PureComponent {

	constructor(props) {
		super(props);
		this.DataStore = new DataStore()
		this.state = {
			tabs: ['Java', 'IOS', 'React Native', 'Vue', 'React', 'Node', 'Golang', 'PHP', 'JavaScript'],
			contentList: [],
			refreshing: false,
			selectedLabel: "",
			showIndicator: false,
			currentPage: 1,
			loadStatus: 0, // 0:隐藏footer 1:加载完毕 2:加载中,
		}
	}

	renderItem(data) {
		let {item} = data
		return (
			<PopularItem
				{...item}
			/>
		)
	}

	renderIndicator() {
		return (
			<CommonActivityIndicator
				showIndicator={this.state.showIndicator}
			/>
		)
	}

	renderFooter() {
		const {loadStatus} = this.state
		if (loadStatus === 1) {
			return (
				<View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
					<Text style={{alignItems: 'center', fontSize: 14, color: '#ccc'}}>无更多内容</Text>
				</View>
			)
		} else if (loadStatus === 2) {
			return (
				<View style={{height: 30, width: CommonDimensions.width, marginTop: 10}}>
					<ActivityIndicator
						size={'small'}
						animating={this.state.loadStatus === 2}
					/>
				</View>
			)
		} else {
			return (
				<View style={{alignItems: 'center'}}></View>
			)
		}
	}

	renderContent() {
		return (
			<FlatList
				data={this.state.contentList}
				renderItem={data => this.renderItem(data)}
				keyExtractor={item => item.id}
				refreshControl={
					<RefreshControl
						colors={['#f26966', '#00ff00', '#0000ff']}
						progressBackgroundColor={'#fff'}
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh.bind(this)}
					/>
				}
				ListFooterComponent={this.renderFooter.bind(this)}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					if (this.canLoading) {
						this._onEndReached()
						this.canLoading = false
					}
				}}
				onMomentumScrollBegin={() => {
					this.canLoading = true
				}}
			/>
		)
	}

	_onEndReached() {
		if (this.state.currentPage === PAGES) {
			this.setState({
				loadStatus: 1
			})
			return
		}
		this.setState({
			loadStatus: 2,
		})
		let keyword = ""
		let {selectedLabel, currentPage} = this.state
		if (selectedLabel === '' || selectedLabel === undefined || selectedLabel === null) {
			keyword = this.state.tabs[0]
		} else {
			keyword = selectedLabel
		}
		this.timer = setTimeout(() => {
			this.requestData(keyword, currentPage + 1)
		}, 1000)
		this.setState({
			currentPage: this.state.currentPage + 1
		})
	}

	requestData(val, currentPage) {
		if (currentPage === 0) {
			currentPage = 1
		}
		let keyword = "";
		if (val === "") {
			keyword = this.state.tabs[0]
		} else if (typeof val === 'number' && !isNaN(val)) {
			keyword = this.state.tabs[val]
		} else {
			keyword = val
		}
		let url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&page=${currentPage}`
		this.DataStore.fetchData(url)
			.then(response => {
				this.setState({
					contentList: this.state.contentList.concat(response.data.items),
					refreshing: false,
					showIndicator: false,
					loadStatus: 0
				})
			})
			.catch(error => {
				error && this.setState({
					contentList: error.toString()
				})
			})
	}

	componentDidMount() {
		this.setState({
			showIndicator: true
		})
		this.requestData(0, 1);
	}

	componentWillUnmount() {
		clearTimeout(this.timer)
	}

	onRefresh() {
		this.setState({
			refreshing: true
		})
		this.requestData(this.state.selectedLabel, 0)
	}

	render() {
		let statusBar = {
			barStyle: 'light-content',
			hidden: false
		}
		let navigationBar = <CommonNavigationBar
			title={'最热'}
			statusBar={statusBar}
		/>
		return (
			<View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
				{navigationBar}
				<ScrollableTabView
					style={styles.container}
					tabBarBackgroundColor={'#fff'}
					tabBarActiveTextColor={'#f26966'}
					tabBarUnderlineStyle={{backgroundColor: '#f26966'}}
					tabBarInactiveTextColor={'#555'}
					tabBarTextStyle={{fontSize: 14, width: '100%'}}
					scrollWithoutAnimation={true}
					renderTabBar={() => <ScrollableTabBar/>}
					onChangeTab={(val) => {
						this.setState({
							showIndicator: true,
							contentList: [],
							currentPage: 1
						})
						this.requestData(val.i, 0)
						this.setState({
							selectedLabel: this.state.tabs[val.i]
						})
					}}
				>
					{
						this.state.tabs.map((item, index) => (
							<View style={styles.textStyle} tabLabel={item} key={index}>
								{
									this.state.showIndicator ? this.renderIndicator() :
										this.renderContent()
								}
							</View>
						))
					}
				</ScrollableTabView>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textStyle: {
		flex: 1,
		fontSize: 20,
	}
})

export default connect()(PopularPage)