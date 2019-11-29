import React, {PureComponent} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import DataStore from "../../expand/dao/DataStore"

export default class DataStorePage extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			showText: ""
		}
		this.DataStore = new DataStore()
	}


	loadData() {
		let url = `https://api.github.com/search/repositories?q=${this.value}`;
		this.DataStore.fetchData(url)
			.then(data => {
				let showData = `初次加载的时间是: ${new Date(data.timestamp)} \n ${JSON.stringify(data.data)}`
				this.setState({
					showText: showData
				})
			})
			.catch(err => {
				err && console.error(err.toString())
			})
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<TextInput
					style={{height: 30, width: 300, borderColor: '#000', borderWidth: 1}}
					onChangeText={text => {
						this.value = text
					}}
				/>
				<Button title={'获取数据'} onPress={this.loadData.bind(this)}/>

				<Text>
					{this.state.showText}
				</Text>

			</View>
		)
	}
}