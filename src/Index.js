import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './screens/Home/HomeScreen';
import LearningScreen from './screens/Home/LearningScreen';
import SettingScreen from './screens/Setting/SettingScreen';
import CartScreen from './screens/Setting/CartScreen';
import FeedbackScreen from './screens/Setting/FeedbackScreen';
import AboutUsScreen from './screens/Setting/AboutUsScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ForgotPassScreen from './screens/Auth/ForgotPassScreen';
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
      navigationOptions: {
        headerShown: false,
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AboutUs: {
      screen: AboutUsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: {
        headerShown: false,
      },
    }
};

const DrawerNavigatorConfigs = {
  // initialRouteName: 'DrawerStack',
  // contentComponent: DrawerView,
  drawerWidth: 299,
  navigationOptions: {
    drawerLabel: "setting",
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require("../assets/icons/home.png")}
    //     resizeMode="contain"
    //     style={{ width: 20, height: 20, tintColor: tintColor }}
    //   />
    // )
  }
  // drawerType: 'slide',
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
 
  render() {
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
});
