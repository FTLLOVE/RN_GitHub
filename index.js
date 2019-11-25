/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigators from "./js/navigator/AppNavigators"

AppRegistry.registerComponent(appName, () => AppNavigators);
