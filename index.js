/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
global.__APP_NAME__ = 'Outlookguide';
AppRegistry.registerComponent(appName, () => App);
