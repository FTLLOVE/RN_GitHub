/**
 * 全局导航跳转工具类 by ftl
 */
export default class NavigationUtil {

    /**
     * 返回到上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack()
    }

    /**
     * 跳转到首页
     * @param params
     */
    static resetToHomePage(params) {
        const {navigation} = params
        navigation.navigate("Main")
    }
}