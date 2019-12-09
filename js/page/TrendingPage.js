/**
 * 趋势页面 by ftl
 */
import React, {PureComponent} from 'react'
import {
	View,
	Text,
	StyleSheet,
	DeviceInfo,
	TouchableOpacity,
	FlatList,
	RefreshControl,
	ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
import CommonNavigationBar from '../common/CommonNavigationBar'
import ActionSheet from 'react-native-actionsheet'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import DataStore from "../expand/dao/DataStore"
import PopularItem from "../common/PopularItem"
import CommonActivityIndicator from "../common/CommonActivityIndicator"
import CommonDimensions from "../common/CommonDimensions"

const CANCEL_INDEX = 0
const PAGES = 34

class TrendingPage extends PureComponent {

	constructor(props) {
		super(props);
		this.DataStore = new DataStore()
		this.state = {
			selectedIndex: 1,
			options: ['取消', '今日', '本周', '本月'],
			tabs: ['React Native', 'Android', 'SpringBoot', 'Vue', 'React', 'Node', 'Golang'],
			contentList: [],
			currentPage: 1,
			selectedLabel: "",
			refreshing: false,
			showIndicator: false,
			loadStatus: 0, // 0:隐藏footer 1:加载完毕 2:加载中,
		}
	}

	/**
	 * 渲染内容
	 * @returns {*}
	 */
	renderContent() {
		return (
			<FlatList
				extraData={this.state}
				data={this.state.contentList}
				renderItem={item => this.renderItem(item)}
				keyExtractor={() => Math.random(2)}
				refreshControl={
					<RefreshControl
						colors={['#f26966', '#00ff00', '#0000ff']}
						refreshing={this.state.refreshing}
						progressBackgroundColor={'#fff'}
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

	/**
	 * 上拉加载
	 * @private
	 */
	_onEndReached() {
		if (this.state.currentPage === PAGES) {
			this.setState({
				loadStatus: 1
			})
			return
		}
		this.setState({
			loadStatus: 2
		})
		let keyword = ""
		let {selectedLabel, currentPage} = this.state
		if (selectedLabel === '' || selectedLabel === undefined || selectedLabel === null) {
			keyword = this.state.tabs[0]
		} else {
			keyword = selectedLabel
		}
		this.timer2 = setTimeout(() => {
			this.requestData(keyword, currentPage + 1)
		}, 1000)
		this.setState({
			currentPage: this.state.currentPage + 1
		})
	}

	/**
	 * 渲染底部加载
	 */
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

	/**
	 * 渲染每条Item
	 * @param data
	 * @returns {*}
	 */
	renderItem(data) {
		let {item} = data
		return (
			<PopularItem
				{...item}
			/>
		)
	}

	/**
	 * 发送请求获取数据
	 * @param val 关键字
	 * @param currentPage 页数
	 * @returns {Promise<void>}
	 */
	async requestData(val, currentPage) {
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
		await this.DataStore.fetchData(url)
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

	/**
	 * TODO 日期筛选(打乱顺序，无查询接口)
	 * @returns {[]|*}
	 */
	randomList() {
		let originList = this.state.contentList
		for (let i = 0; i < originList.length; i++) {
			let iRand = parseInt(originList.length * Math.random())
			let temp = originList[i]
			originList[i] = originList[iRand]
			originList[iRand] = temp
		}
		return originList
	}

	/**
	 * 下拉刷新
	 */
	onRefresh() {
		this.setState({
			refreshing: true
		})
		this.timer = setTimeout(() => {
			this.requestData(this.state.selectedLabel, 0)
		}, 1000)
	}

	/**
	 * 渲染加载器
	 */
	renderIndicator() {
		return (
			<CommonActivityIndicator
				showIndicator={this.state.showIndicator}
			/>
		)
	}

	componentDidMount() {
		this.setState({
			showIndicator: true
		})
		this.requestData(0, 1)
	}

	componentWillUnmount() {
		clearTimeout(this.timer)
		clearTimeout(this.timer2)
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
							let changedList = this.randomList()
							this.setState({
								contentList: changedList
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