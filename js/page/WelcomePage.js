/**
 * 欢迎页面 by ftl
 */
import React, {PureComponent} from 'react'
import {View, Text} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil"

export default class WelcomePage extends PureComponent {

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 1000)
    }


    componentWillUnmount(): void {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text>WelcomePage</Text>
            </View>
        )
    }

}