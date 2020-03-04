import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator,Text, PermissionsAndroid} from 'react-native';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import {getUniqueId} from 'react-native-device-info';
import IMEI  from 'react-native-imei';
import LoginScreen from './screens/Auth/LoginScreen';
import ActivateScreen from './screens/Auth/ActivateScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import CustomDrawerContentComponent from '../components/Drawer'; 
import HomeScreen from './screens/Home/HomeScreen';
import LearningScreen from './screens/Home/LearningScreen';
import SettingScreen from './screens/Setting/SettingScreen';
import CartScreen from './screens/Setting/CartScreen';
import FeedbackScreen from './screens/Home/LibraryScreen';
import AboutUsScreen from './screens/Setting/AboutUsScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ForgotPassScreen from './screens/Auth/ForgotPassScreen';
import LibraryScreen from './screens/Home/LibraryScreen';
import ViewFile from './screens/Home/ViewFile'
import Drawer from './components/Drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SubLibraryScreen from './screens/Home/SubLibraryScreen';
console.disableYellowBox = true;

const MainAppRouteConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Learning: {
    screen: LearningScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Library: {
    screen: LibraryScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  SubLibrary: {
    screen: SubLibraryScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ViewFile: {
    screen: ViewFile,
    navigationOptions: {
      headerShown: false
    }
  }
};

const MainAppNavigatorConfigs = {
  initialRouteName: 'Home',
};

const MainAppNavigator = createStackNavigator(
  MainAppRouteConfigs,
  MainAppNavigatorConfigs,
);
const MainAppContainer = createAppContainer(MainAppNavigator);

const AuthRouteConfigs = {
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Forgotpass: {
    screen: ForgotPassScreen
  },
  Activate: {
    screen: ActivateScreen
  },
  MainScreen: {
    screen: MainAppContainer,
    navigationOptions: {
      header: null,
    },
  },
};

const AuthStackNavigatorConfig = {
  initialRouteName: 'Login',
};

const AuthNavigator = createStackNavigator(
  AuthRouteConfigs,
  AuthStackNavigatorConfig,
);
const AuthContainer = createAppContainer(AuthNavigator);
const DrawerRouteConfigs = {
    Home: {
      screen: HomeScreen,     
    },
    Setting: {
      screen: SettingScreen,
    },
    Cart: {
      screen: CartScreen,
    },
    AboutUs: {
      screen: AboutUsScreen,
    }
};

const DrawerNavigatorConfigs = {
  drawerWidth: 150,
  contentComponent: Drawer,
};

const DrawerNavigator = createDrawerNavigator(
  DrawerRouteConfigs,
  DrawerNavigatorConfigs,
);
const DrawerContainer = createAppContainer(DrawerNavigator);
class AuthLoadingScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(!_.isEmpty(user) ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const AppSwitchRouteConfigs = {
  AuthLoading: AuthLoadingScreen,
  Auth: AuthContainer,
  App: MainAppContainer,
  Drawer: DrawerContainer
};

const AppSwitchNavigatorConfigs = {
  initialRouteName: 'AuthLoading',
};

const AppSwitchNavigator = createSwitchNavigator(
  AppSwitchRouteConfigs,
  AppSwitchNavigatorConfigs,
);
const AppSwitchContainer = createAppContainer(AppSwitchNavigator);

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
 
  async componentDidMount(){
    global.deviceLocale = I18n.currentLocale();
  }
 
  render() {
    global.deviceLocale = I18n.currentLocale();
    global.deviceSerial = getUniqueId();
    console.log("currentlanguage==>",global.deviceLocale);
    console.log("deviceSerial==>",global.deviceSerial);
    return (
      <View style={styles.container}>
        <AppSwitchContainer ref={ref => (this._navigator = ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draweritemText: {
    marginLeft: 20,
    fontSize: 20
  }
});
