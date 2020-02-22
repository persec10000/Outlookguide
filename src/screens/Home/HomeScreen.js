import React, { PureComponent  } from 'react'
import { View, Text, StyleSheet,Image, ImageBackground,Dimension,TouchableOpacity, PermissionsAndroid, Alert, Platform, AlertIOS, ToastAndroid, BackHandler, Dimensions } from 'react-native';
import GradientSmallButton from '../../components/GradientSmallButton';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DrawerActions} from 'react-navigation-drawer'
import {Images} from '../../themes'
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
        this.focusListener = this.props.navigation.addListener("didFocus", async() => {
            await Orientation.lockToLandscape();
            this.setState({ismount: true});
        });
        this.didblurListener = this.props.navigation.addListener("didBlur", () => {
            this.setState({ismount: false});
        });
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    componentWillUnmount(){
        this.setState({ismount: false})
        this.backhandler.remove();
        this.focusListener.remove();
    }

    Guide = () => {
        this.setState({isGuide:true}, ()=>{
            self.vb.start();
        });
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
        this.setState({ recording: true });
        this.vb.start();
    }

    stopRecording = () => {
        this.setState({recording: false});
    }

    Library = () => {
        this.props.navigation.navigate('Library');
    }

    Stop = () => {
        this.vb.stop();
        this.setState({isGuide:false});
    }
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }   
   
    render() {
        console.log("state==",this.state.ismount)
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
               {(isGuide||recording)?
                <NodeCameraView 
                    style={{ height: "100%" }}
                    ref={(vb) => { this.vb = vb }}
                    // outputUrl = {"http://outlookguide.net/OG-listener.php"}
                    camera={{ cameraId: 1, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 24, bitrate: 400000, profile: 2, fps: 30, videoFrontMirror: true }}
                    autopreview={true}
                />
                :
                <Video
                // source={{uri: 'http://172.31.30.171/output/1-48-0.mp4'}} 
                    source={require('../../resources/images/OutlookGuide.mov')} 
                    ref={(ref) => {
                        this.player = ref
                    }}                                     
                    onBuffer={this.onBuffer}               
                    onError={this.videoError}          
                    style={styles.backgroundVideo}
                    repeat={true}
                    fullscreen={true}
                    resizeMode={'cover'} />
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
                <Image source={Images.applogo} style={{position: 'absolute', top: -10, left: 0}}/>
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
                {(isGuide||recording) &&
                <View style={styles.switchButton}>
                    <TouchableOpacity onPress={this.switch} style={styles.button}>
                        <FontAwesome
                            name='microphone'
                            color='white'
                            size={27}
                            style={{marginLeft: 18}}>

                        </FontAwesome>
                        {/* <Text>
                            Switch
                        </Text> */}
                    </TouchableOpacity>
                </View>
                }
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
                                label="Library"
                                _onPress={this.Library}
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
    backgroundVideo: {
        // position: 'absolute',
        width: "100%",
        height: "100%"
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent:'center',
        alignContent:'center',
        width: 55, 
        height: 55, 
        marginHorizontal: 40,
        borderRadius: 27,
        transform: [
            {scaleX: 1.8}
        ],
        backgroundColor:'red',
        opacity: 0.5
    },
    switchButton: {
        flexDirection: 'row',
        position:'absolute',
        bottom:15, 
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

