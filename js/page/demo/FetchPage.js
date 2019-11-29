import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

export default class FetchPage extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
			result: ""
		}
	}


	handleChange(val) {
		this.setState({
			inputValue: val
		})
	}

	async handleSearch() {
		// url = "https://api.github.com/search/repositories?q=${this.searchKey}"
		let url = `https://api.github.com/search/repositories?q=${this.state.inputValue}`
		await fetch(url)
			.then(response => response.text())
			.then(responseText => {
				this.setState({
					result: responseText
				})
			})
	}

	async handleSearchOutLine() {
		let url = `https://api.github.com/search/repositories?q=${this.state.inputValue}`
		await fetch(url)
			.then(response => {
				if (response.ok) {
					return response.text()
				}
				throw new Error("network error")
			}).then(responseText => {
				this.setState({
					result: responseText
				})
			}).catch(e => {
				console.log('e: ', e)
				this.setState({
					result: e.toString()
				})
			})
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.textInput} onChangeText={this.handleChange.bind(this)}/>
				<Button title={'发送'} onPress={this.handleSearchOutLine.bind(this)}/>

				<Text>{this.state.result}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},

	textInput: {
		height: 30,
		width: 300,
		borderWidth: 1,
		borderColor: '#000'
	}
})