import React, { PureComponent  } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,TouchableOpacity, Alert, Platform, AlertIOS, ToastAndroid, BackHandler } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Octicons';
import {DrawerActions} from 'react-navigation-drawer'
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import {RNCamera} from 'react-native-camera';


class HomeScreen extends PureComponent  {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            switchOn2: false,
            ismount: false,
            recording: ''
        }
    }


    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.setState({ismount: true});
            Orientation.lockToLandscape();
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton() {
		// this.props.navigation.navigate('Home')
        return true;
	}
    // componentWillUnmount(){
    //     this.props.navigation.removeListener();
    // }

    Guide = () => {
        this.setState({isGuide:true})
    }

    Learn = () => {
        this.props.navigation.navigate('Learning')
    } 

    Read = async() => {
        Platform.select({
            ios: () => { AlertIOS.alert('Recording start'); },
            android: () => { ToastAndroid.show('Recording start', ToastAndroid.SHORT); }
        })();
        this.setState({ recording: true });
        const { uri, codec = "mp4" } = await this.camera.recordAsync();        
        // this.setState({ recording: false, processing: true });
    }

    stopRecording = () => {
        this.camera.stopRecording();
        this.setState({recording: false});
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
        const {isGuide, switchOn2, ismount,recording} = this.state
        let readbutton = (
            <TouchableOpacity onPress={this.Read.bind(this)} style={styles.button}>
                <Text style={styles.textStyle}>
                    Read
                </Text>
            </TouchableOpacity>
          );
      
          if (recording) {
            readbutton = (
            <TouchableOpacity onPress={this.stopRecording.bind(this)} style={styles.button}>
                <Text style={styles.textStyle}>
                    Stop
                </Text>
            </TouchableOpacity>
            );
          }
        if (!ismount){
        return( 
            <>
            </>
        )
        }
        else {
        return (
           <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                    this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                    }}
                />
                
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            </View>
                <Image source={require('../../resources/images/applogo.png')} style={{position: 'absolute', top: -10, left: 0}}/>
                <TouchableOpacity onPress={()=>this.toggleDrawer()} style={{position:'absolute', top: 10, right: 10}}>
                    <Icon
                        name="settings"
                        color="#E8222B"
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
                {/* <View style={{flex:1, alignItems:'center'}}>
                    <View style={styles.feedback}>
                        <Text style={{textAlign: "center", fontSize: 16}}>
                            Here is feedback text
                        </Text>
                    </View>
                </View> */}
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, right: 10}}>
                    {readbutton}
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
                </View>
        )
        }
    }
}
const iconStyles = {
    borderRadius: 1,
    iconStyle: { paddingVertical: 5 }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent:'center',
        width: 54, 
        height: 54, 
        marginHorizontal: 40,
        borderRadius: 27,
        transform: [
            {scaleX: 2}
        ],
        backgroundColor:'white',
        opacity: 0.7
    },
    // button: {
    //     justifyContent:'center',
    //     width: 60, 
    //     height: 54, 
    //     marginHorizontal: 15,
    // },
    textStyle: {
        textAlign: 'center',
        fontSize: 13,
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
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})

export default HomeScreen;
