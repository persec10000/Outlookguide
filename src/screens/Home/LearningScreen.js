import React, { Component } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,TouchableOpacity, Platform, AlertIOS, ToastAndroid } from 'react-native'
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Octicons';

class LearningScreen extends Component { 
    constructor(props){
        super(props);
        this.state={
            isGuide: null
        }
    }


    componentDidMount(){
        Orientation.lockToLandscape();
    }
    Start = () => {
      Platform.select({
        ios: () => { AlertIOS.alert('Submit Error'); },
        android: () => { ToastAndroid.show('Submit Error', ToastAndroid.SHORT); }
      })();
    }

    Back = () => {
        this.props.navigation.goBack(null)
    }
    render() {
        const {isGuide} = this.state
        return (
            <ImageBackground source={require('../../resources/images/Outlook.png')} style={{width: '100%', height: '100%'}}>
                <View>
                    <Image source={require('../../resources/images/appLogo2.png')} style={{position: 'absolute', top: 5, left: 10}}/>
                </View>
                <View style={{position:'absolute', top: 10, right: 10}}>
                    <Icon
                        name="settings"
                        color="red"
                        size={32}
                        // onPress={this.loginWithGoogle}
                        {...iconStyles}
                    >
                    </Icon>
                </View>
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, left: 10}}>
                    <TouchableOpacity onPress={()=>this.Start()} style={styles.button}>
                        <Text style={{textAlign: 'center'}}>
                            Start
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={styles.feedback}>
                        <Text style={{textAlign: "center", fontSize: 16}}>
                            Here is feedback text
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, right: 10}}>
                    <TouchableOpacity onPress={()=>this.Back()} style={styles.button}>
                        <Text style={{textAlign: 'center'}}>
                           Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const iconStyles = {
    borderRadius: 1,
    iconStyle: { paddingVertical: 5 }
};

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

export default LearningScreen;
