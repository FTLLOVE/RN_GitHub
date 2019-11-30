import React, {PureComponent} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class PopularItem extends PureComponent {

	render() {
		const {full_name, owner, description, forks} = this.props
		return (
			<TouchableOpacity style={styles.container} onPress={() => {
			}}>
				<Text style={styles.title}>{full_name}</Text>
				<Text style={styles.description} numberOfLines={2}>{description}</Text>
				<View style={styles.bottomContainer}>
					<View style={styles.bottomContainer}>
						<Text>Author: </Text>
						<Image source={{uri: owner.avatar_url}} style={{width: 25, height: 25}}/>
					</View>

					<View style={styles.bottomContainer}
					>
						<Text>forks: </Text>
						<Text>{forks}</Text>
					</View>

					<TouchableOpacity onPress={() => {
					}}>
						<FontAwesome
							name={'star-o'}
							size={26}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 10,
		marginLeft: 5,
		marginRight: 5,
		borderColor: '#ddd',
		borderWidth: 0.5,
		borderRadius: 3,
		marginTop: 10,
		shadowColor: 'gray',
		shadowOffset: {width: 0.5, height: 0.5},
		shadowOpacity: 0.4,
		shadowRadius: 1,
		elevation: 2
	},

	bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},

	title: {
		fontSize: 16,
		marginBottom: 2,
		color: '#212121'
	},

	description: {
		fontSize: 14,
		marginBottom: 10,
		color: '#757575',
	}
})