import { AsyncStorage } from 'react-native'
/**
 *  数据存储
 */

export default class AsyncStorageDao {

   /**
    * 数据存储
    * @param {}} data 
    */
   async doSave(data) {
      await AsyncStorage.setItem(data.id, data.tab)
         .catch(e => {
            e && console.error(e.toString())
         })
   }

   

}