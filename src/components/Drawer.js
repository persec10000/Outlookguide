import React, {Component} from 'react';
import {BackHandler, StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerActions} from 'react-navigation-drawer';

const MenuItem = props => {
  const {label, onPressMenu} = props;
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPressMenu}>
      <Text style={{fontSize: 16, marginVertical: 10, color:'#E8222B'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }
  exit = () => {
  Alert.alert(
            global.__APP_NAME__,
            'Are you sure you want to exit?',
            [
                { text: 'Cancel', onPress: ()=>{
                  this.props.navigation.dispatch(DrawerActions.closeDrawer())
                }},
                { text: 'OK', onPress: ()=>{
                    BackHandler.exitApp()
                }},
            ],
            { cancelable: false }
        )
        return true;
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={()=>this.props.navigation.dispatch(DrawerActions.closeDrawer())} style={{marginVertical: 10}}>
              <Icon name={'remove'} size={24} color='#E8222B'/>
            </TouchableOpacity>
            <MenuItem
              label="setting"
              onPressMenu={() => this.props.navigation.navigate('Setting')}
            />
            <MenuItem
              label="cart"
              onPressMenu={() => this.props.navigation.navigate('Cart')}
            />
            <MenuItem
              label="about us"
              onPressMenu={() => this.props.navigation.navigate('AboutUs')}
            />
            <MenuItem
              label="exit"
              onPressMenu={() => this.exit()}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
