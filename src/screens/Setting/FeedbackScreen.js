import React, { Component } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,TouchableOpacity, Alert, Platform, AlertIOS, ToastAndroid, BackHandler } from 'react-native'
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Octicons';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';

class FeedbackScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            switchOn2: false
        }
    }


    componentDidMount(){
      this.focusListener = this.props.navigation.addListener("didFocus", () => {
        Orientation.lockToPortrait();
      });
    }

   
    render() {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image source={require('../../resources/images/applogo.png')} style={{position: 'absolute', top: 5, left: 10}}/>
            <Text style={{textAlign: 'center'}}>
                FeedbackScreen
            </Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent:'center',
        width: 54, 
        height: 54, 
        marginHorizontal: 30,
        borderRadius: 27,
        transform: [
            {scaleX: 2}
        ],
        backgroundColor:'white',
        opacity: 0.7
    },
    feedback: {
        width: 240, 
        height: 50, 
        borderRadius: 20, 
        backgroundColor:'white',
        opacity: 0.7, 
        position:'absolute', 
        bottom: 20, 
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FeedbackScreen;
