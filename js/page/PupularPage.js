/**
 * 最热页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import DataStore from "../expand/dao/DataStore"
import PopularItem from "../common/PopularItem"
import CommonActivityIndicator from '../common/CommonActivityIndicator'

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
			currentPage: 1
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

	renderContent() {
		return (
			<FlatList
				data={this.state.contentList}
				renderItem={data => this.renderItem(data)}
				keyExtractor={item => "" + item.id}
				refreshControl={
					<RefreshControl
						colors={['#f26966', '#00ff00', '#0000ff']}
						progressBackgroundColor={'#fff'}
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh.bind(this)}
					/>
				}
			/>
		)
	}

	requestData(val) {
		let keyword = "";
		if (val === "") {
			keyword = this.state.tabs[0]
		} else if (typeof val === 'number' && !isNaN(val)) {
			keyword = this.state.tabs[val]
		} else {
			keyword = val
		}
		let url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&page=${this.state.currentPage}`
		this.DataStore.fetchData(url)
			.then(response => {
				this.setState({
					contentList: response.data.items,
					refreshing: false,
					showIndicator: false
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
		this.requestData(0);
	}

	onRefresh() {
		this.setState({
			refreshing: true
		})
		this.requestData(this.state.selectedLabel)
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<ScrollableTabView
					style={styles.container}
					tabBarBackgroundColor={'#fff'}
					tabBarActiveTextColor={'#f26966'}
					tabBarUnderlineStyle={{backgroundColor: '#f26966'}}
					tabBarInactiveTextColor={'#555'}
					tabBarTextStyle={{fontSize: 14, marginTop: 13}}
					scrollWithoutAnimation={true}
					renderTabBar={() => <ScrollableTabBar/>}
					onChangeTab={(val) => {
						this.setState({
							showIndicator: true
						})
						this.requestData(val.i)
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
							</View>))
					}
				</ScrollableTabView>
			</SafeAreaView>

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