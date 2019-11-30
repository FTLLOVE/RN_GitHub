import {AsyncStorage} from 'react-native'

export default class DataStore {

	/**
	 * 读取数据，如果无本地数据或则本地数据过期，则从网络获取数据
	 * @param url
	 * @returns {Promise<R>}
	 */
	fetchData(url) {
		return new Promise((resolve, reject) => {
			this.fetchLocalData(url)
				.then((wrapData) => {
					if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
						console.log("本地数据")
						resolve(wrapData)
					} else {
						this.fetchNetData(url)
							.then((data) => {
								console.log("网络数据")
								resolve(this._warpData(data))
							})
							.catch(error => {
								reject(error)
							})
					}
				})
				.catch(error => {
					this.fetchNetData(url)
						.then(data => {
							resolve(this._warpData(data))
						})
						.catch(error => {
							reject(error)
						})
				})
		})
	}

	/**
	 * 读取网络数据并且存储到本地数据库
	 * @param url key
	 * @returns {Promise<R>}
	 */
	fetchNetData(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					throw new Error("network error")
				})
				.then(responseData => {
					this.saveData(url, responseData)
					resolve(responseData)
				})
				.catch(e => {
					reject(e)
				})
		})

	}

	/**
	 * 读取本地数据
	 * @param url key
	 * @returns {Promise<R>}
	 */
	fetchLocalData(url) {
		return new Promise(((resolve, reject) => {
			AsyncStorage.getItem(url, ((error, result) => {
				if (!error) {
					try {
						resolve(JSON.parse(result))
					} catch (e) {
						reject(e)
						console.error(e)
					}
				} else {
					reject(error)
					console.error(error)
				}
			}))
		}))
	}

	/**
	 * 保存数据到本地数据库
	 * @param url key
	 * @param data value 由于Storage无法直接保存对象，所以需要对数据进行序列化成JSON
	 * @param callback
	 */
	saveData(url, data, callback) {
		if (!data || !url) {
			return;
		}
		AsyncStorage.setItem(url, JSON.stringify(this._warpData(data), callback))
	}

	/**
	 * 对数据加一层时间戳
	 * @param data value
	 * @returns {{data: *, timestamp: *}}
	 * @private
	 */
	_warpData(data) {
		return {
			data: data,
			timestamp: new Date().getTime()
		}
	}

	/**
	 * 检查timestamp是否在有效期内
	 * @param timestamp 项目更新时间
	 * @returns {boolean}
	 */
	static checkTimestampValid(timestamp) {
		const currentDate = new Date()
		const targetDate = new Date()
		targetDate.setTime(timestamp)
		if (currentDate.getFullYear() !== targetDate.getFullYear()) return false
		if (currentDate.getMonth() !== targetDate.getMonth()) return false
		if (currentDate.getHours() - targetDate.getHours() > 4) return false
		return true

	}
}