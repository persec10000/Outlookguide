import React, { PureComponent  } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,TouchableOpacity, PermissionsAndroid, Alert, Platform, AlertIOS, ToastAndroid, BackHandler, Dimensions } from 'react-native';
import GradientSmallButton from '../../components/GradientSmallButton';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Octicons';
import {DrawerActions} from 'react-navigation-drawer'
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import {RNCamera} from 'react-native-camera';
import {NodeCameraView, NodePlayerView} from 'react-native-nodemediaclient';
import { withNavigationFocus } from 'react-navigation';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
let self = null;
class HomeScreen extends PureComponent  {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            switchOn2: false,
            ismount: false,
            recording: false,
            processing: false,
            publishBtnTitle: "",
            isPublish: true
        }
        this.backhandler = null;
        self = this;
    }

    

    requestCameraPermission = async() => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            self.setState({ismount: true});
            console.log("hello workd")
            Orientation.lockToLandscape();
        });
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    componentWillUnmount(){
        this.backhandler.remove();
        this.focusListener.remove();
    }

    Guide = () => {
        this.vb.start();
        this.setState({isGuide:true});
    }
    switch = () => {
        this.vb.switchCamera();
    }

    Learn = () => {
        this.props.navigation.navigate('Learning');
    } 

    Read = async() => {
        // Platform.select({
        //     ios: () => { AlertIOS.alert('Recording start'); },
        //     android: () => { ToastAndroid.show('Recording start', ToastAndroid.SHORT); }
        // })();
        this.vb.start();
        this.setState({ recording: true });
    }

    stopRecording = () => {
        this.setState({recording: false});
    }

    Exit = () => {
        Alert.alert(
            'Outlook Guide',
            'Are you sure you want to exit?',
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
        this.vb.stop();
        this.setState({isGuide:false});
    }
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }   
   
    render() {
        console.log("width======>", Width);
        console.log("height======>", Height);
        const {isGuide, switchOn2, ismount,recording} = this.state;
        this.requestCameraPermission();
        let readbutton = (
            <GradientSmallButton
                label="Read"
                _onPress={this.Read}
            />
          );
          if (recording) {
            readbutton = (
                <GradientSmallButton
                    label="Stop"
                    _onPress={this.stopRecording}
                />
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
               {this.props.isFocused&&
                <NodeCameraView 
                    style={{ height: "100%" }}
                    ref={(vb) => { this.vb = vb }}
                    // outputUrl = {"http://outlookguide.net/OG-listener.php"}
                    camera={{ cameraId: 1, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 24, bitrate: 400000, profile: 2, fps: 30, videoFrontMirror: true }}
                    autopreview={true}
                />
               }
               {/* <TouchableOpacity
                    onPress={() => {
                    if (this.state.isPublish) {
                        this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
                        this.vb.stop();
                    } else {
                        this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
                        this.vb.start();
                    }
                    }}
                >
                </TouchableOpacity> */}

                {/* {this.props.isFocused&&
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
                } */}
                <Image source={require('../../resources/images/applogo.png')} style={{position: 'absolute', top: -10, left: 0}}/>
                <TouchableOpacity onPress={()=>this.toggleDrawer()} style={{position:'absolute', top: 10, right: 10}}>
                    <Icon
                        name="settings"
                        color="#E8222B"
                        size={32}
                        {...iconStyles}
                    >
                    </Icon>
                </TouchableOpacity>
                {!recording ?
                <>
                    {isGuide?
                    <View style={{flexDirection: 'row', position:'absolute', bottom:30, left: 20}}>
                        <Text style={styles.readingtextStyle}>
                            guiding...
                        </Text>
                    </View>
                    :
                    <View style={{flexDirection: 'row', position:'absolute', bottom:20, left: 10}}>
                        <GradientSmallButton
                            label="Guide"
                            _onPress={this.Guide}
                        />
                        <GradientSmallButton
                            label="Learn"
                            _onPress={this.Learn}
                        />
                    </View>
                    }
                </>
                :
                <View style={{flexDirection: 'row', position:'absolute', bottom:30, left: 20}}>                
                    <Text style={styles.readingtextStyle}>
                        reading...
                    </Text>
                </View>
                }
                <View style={styles.switchButton}>
                    <GradientSmallButton
                        label="Switch"
                        _onPress={this.switch}
                    />
                </View>
                <View style={{flexDirection: 'row', position:'absolute', bottom:20, right: 10}}>
                    {!isGuide&&
                    <>
                        {readbutton}
                    </>
                    }
                    {!recording &&
                        <>
                            {isGuide?
                            <GradientSmallButton
                                label="Stop"
                                _onPress={this.Stop}
                            />
                            :
                            <GradientSmallButton
                                label="Exit"
                                _onPress={this.Exit}
                            />
                            }
                        </>
                    }
                </View>
            </View>
        )
        }
    }
}
export default withNavigationFocus(HomeScreen);
const iconStyles = {
    borderRadius: 1,
    iconStyle: { paddingVertical: 5 }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'black',
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
        opacity: 0.5
    },
    switchButton: {
        flexDirection: 'row',
        position:'absolute',
        bottom:20, 
        right: 0, 
        left: 0, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'bold'
    }, 
    readingtextStyle: {
        textAlign: 'center',
        fontSize: 20,
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

