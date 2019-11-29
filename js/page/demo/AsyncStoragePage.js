import React, {PureComponent} from 'react'
import {View, Text, TextInput, Button, StyleSheet, AsyncStorage, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')
const KEY = "AS_KEY"

export default class AsyncStoragePage extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			showText: ""
		}
	}

	async doSave() {
		await AsyncStorage.setItem(KEY, this.state.showText)
			.catch(e => {
				e && console.log(e.toString())
			})
	}

	async getData() {
		await AsyncStorage.getItem(KEY)
			.then(val => {
				console.log("val: ", val)
				this.setState({
					showText: val
				})
			})
			.catch(e => {
				e && console.log(e.toString())
			})
	}

	async doRemove() {
		await AsyncStorage.removeItem(KEY)
			.catch(e => {
				e && console.log(e.toString())
			})
	}

	render() {
		return (
			<View styly={styles.container}>
				<TextInput
					onChangeText={(e) => {
						this.setState({
							showText: e
						})
					}}
					style={{width: 300, height: 30, borderWidth: 1, borderColor: '#000'}}
				/>
				<View style={{width: width, height: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
					<Button title={'存储'} onPress={this.doSave.bind(this)}/>
					<Button title={'获取'} onPress={this.getData.bind(this)}/>
					<Button title={'删除'} onPress={this.doRemove.bind(this)}/>
				</View>

				<Text>
					{this.state.showText}
				</Text>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})