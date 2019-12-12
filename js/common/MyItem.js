import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonDimensions from '../common/CommonDimensions'

export default class MyItem extends PureComponent {

	render() {
		return (
			<TouchableOpacity style={[styles.container, this.props.containerStyle]}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					{this.props.Icon}
					<Text style={this.props.titleStyle}>{this.props.title}</Text>
				</View>

				<AntDesign
					name={'right'}
					size={14}
					style={{color: '#2b98f4'}}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 45,
		width: CommonDimensions.width,
		paddingLeft: 10,
		paddingRight: 5,
		paddingTop: 5,
		paddingBottom: 5,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc'
	}
})