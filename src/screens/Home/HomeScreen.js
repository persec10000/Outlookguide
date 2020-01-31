import React, { Component } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,TouchableOpacity, Alert, Platform, AlertIOS, ToastAndroid, BackHandler } from 'react-native'
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Octicons';
import {DrawerActions} from 'react-navigation-drawer'
import SwitchToggle from '@dooboo-ui/native-switch-toggle';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            switchOn2: false,
            ismount: false
        }
    }


    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.setState({ismount: true});
            Orientation.lockToLandscape();
        });
        
    }

    Guide = () => {
        this.setState({isGuide:true})
    }

    Learn = () => {
        this.props.navigation.navigate('Learning')
    } 

    Read = () => {
        Platform.select({
            ios: () => { AlertIOS.alert('Recording start'); },
            android: () => { ToastAndroid.show('Recording start', ToastAndroid.SHORT); }
        })();
    }

    Exit = () => {
        Alert.alert(
            'Outlook Guide',
            'Are you sure you want to exit from App?',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: ()=>{
                    BackHandler.exitApp()
                }},
            ],
            { cancelable: false }
        )
        return true;
    }

    Stop = () => {
        this.setState({isGuide:false})
    }
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }   
    render() {
        const {isGuide, switchOn2, ismount} = this.state
        if (!ismount){
        return( 
            <>
            </>
        )
        }
        else {
        return (
            <ImageBackground source={require('../../resources/images/images.jpg')} style={{width: '100%', height: '100%'}}>
                <View>
                    <Image source={require('../../resources/images/applogo.png')} style={{position: 'absolute', top: 5, left: 10}}/>
                </View>
                <TouchableOpacity onPress={()=>this.toggleDrawer()} style={{position:'absolute', top: 10, right: 10}}>
                    <Icon
                        name="settings"
                        color="red"
                        size={32}
                        // onPress={this.loginWithGoogle}
                        {...iconStyles}
                    >
                    </Icon>
                </TouchableOpacity>
                {isGuide?
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, left: 30}}>
                    <Text> OFF </Text>
                    <SwitchToggle
                        containerStyle={{
                        marginTop: 16,
                        width: 108,
                        height: 48,
                        borderRadius: 25,
                        backgroundColor: '#ccc',
                        padding: 5,
                        marginHorizontal: 10
                        }}
                        circleStyle={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        backgroundColor: 'white', // rgb(102,134,205)
                        }}
                        switchOn={switchOn2}
                        onPress={() => this.setState({switchOn2: !switchOn2})}
                        circleColorOff="white"
                        circleColorOn="red"
                        duration={500}
                    />
                    <Text style={{justifyContent:'center'}}> ON </Text>
                </View>
                :
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, left: 10}}>
                    <TouchableOpacity onPress={()=>this.Guide()} style={styles.button}>
                        <Text style={styles.textStyle}>
                            Guide
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.Learn()} style={styles.button}>
                        <Text style={styles.textStyle}>
                            Learn
                        </Text>
                    </TouchableOpacity>
                </View>
                }
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={styles.feedback}>
                        <Text style={{textAlign: "center", fontSize: 16}}>
                            Here is feedback text
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, right: 10}}>
                    <TouchableOpacity onPress={()=>this.Read()} style={styles.button}>
                        <Text style={styles.textStyle}>
                            Read
                        </Text>
                    </TouchableOpacity>
                    {isGuide?
                    <TouchableOpacity onPress={()=>this.Stop()} style={styles.button}>
                        <Text style={styles.textStyle}>
                            Stop
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>this.Exit()} style={styles.button}>
                        <Text style={styles.textStyle}>
                            Exit
                        </Text>
                    </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        )
        }
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
        width: 55, 
        height: 54, 
        marginHorizontal: 15,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'bold'
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

export default HomeScreen;
