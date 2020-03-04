import React, { PureComponent, Fragment  } from 'react'
import { View, Text, StyleSheet,Image,ScrollView,ImageBackground,Dimension,TouchableOpacity, PermissionsAndroid, Alert, Platform, AlertIOS, ToastAndroid, BackHandler, Dimensions } from 'react-native';
import GradientSmallButton from '../../components/GradientSmallButton';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DrawerActions} from 'react-navigation-drawer'
import {Images} from '../../themes'
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import {RNCamera} from 'react-native-camera';
import {NodeCameraView, NodePlayerView} from 'react-native-nodemediaclient';
import { withNavigationFocus } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
let self = null;
class HomeScreen extends PureComponent  {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            isRead: false,
            isLearn: false,
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
        this.setState({isGuide:true, recording: true}, ()=>{
            self.vb.start();
        });
    }
    switch = () => {
        this.vb.switchCamera();
    }

    Learn = () => {
        this.setState({ isLearn: true, recording: true });
    } 

    Read = async() => {
        // Platform.select({
        //     ios: () => { AlertIOS.alert('Recording start'); },
        //     android: () => { ToastAndroid.show('Recording start', ToastAndroid.SHORT); }
        // })();
        this.setState({ isRead: true, recording: true });
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
        this.setState({recording:false, isLearn: false, isRead: false, isGuide: false});
    }
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }   
   
    render() {
        const {isGuide, switchOn2, ismount,recording, isRead, isLearn} = this.state;
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
                <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={0.5}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    onZoomAfter={this.logOutZoomState}
                >
                    <NodeCameraView 
                        style={{ height: "100%" }}
                        ref={(vb) => { this.vb = vb }}
                        // outputUrl = {"http://outlookguide.net/OG-listener.php"}
                        camera={{ cameraId: 1, cameraFrontMirror: true }}
                        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                        video={{ preset: 24, bitrate: 400000, profile: 2, fps: 30, videoFrontMirror: true }}
                        autopreview={true}
                    />
                    <ActionButton
                        buttonColor="#1abc9c"
                        offsetY={70}
                        offsetX={10}
                        size={32}
                        hideShadow={true}
                        verticalOrientation='down'
                        >
                        <ActionButton.Item buttonColor='#9b59b6' title="Reverse Camera" onPress={() => {
                            this.vb.switchCamera();
                            this.state.flashenable = false;
                        }}>
                            <Icon name="ios-reverse-camera" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Switch Flashlight" onPress={() => {
                            this.state.flashenable = !this.state.flashenable;
                            this.vb.flashEnable(this.state.flashenable);
                        }}>
                            <Icon name="ios-bulb" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* <ActionButton.Item buttonColor='#e6ce28' title="Publish" onPress={() => { this.vb.start() }}>
                            <Icon name="ios-paper-plane" style={styles.actionButtonIcon} />
                        </ActionButton.Item> */}
                        <ActionButton.Item buttonColor='#e74c3c' title="Close" onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name="ios-power" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                    <Image source={Images.applogo} style={{position: 'absolute', top: -10, left: 0}}/>
                    <TouchableOpacity onPress={()=>this.toggleDrawer()} style={{position:'absolute', top: 10, right: 10}}>
                        <Icon
                            name="ios-options"
                            color="#E8222B"
                            size={32}
                            {...iconStyles}
                        >
                        </Icon>
                    </TouchableOpacity>
                    {isGuide || isRead || isLearn?
                        <View style={{flexDirection: 'row', position:'absolute', bottom:30, left: 20}}>
                            {isGuide?
                                <Text style={styles.readingtextStyle}>
                                    guiding...
                                </Text>
                                :
                                <Fragment>
                                    {isRead?
                                        <Text style={styles.readingtextStyle}>
                                            reading...
                                        </Text>
                                        :
                                        <Text style={styles.readingtextStyle}>
                                            learning...
                                        </Text>
                                    }
                                </Fragment>
                            }
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
                    <View style={styles.switchButton}>
                        <TouchableOpacity onPress={this.switch} style={styles.button}>
                            <FontAwesome
                                name='microphone'
                                color='white'
                                size={27}
                                style={{marginLeft: 18}}>

                            </FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', position:'absolute', bottom:20, right: 10}}>
                        {recording?
                            <GradientSmallButton
                                label="Stop"
                                _onPress={this.Stop}
                            />
                        :
                        <Fragment>
                            {readbutton}
                            <GradientSmallButton
                                label="Library"
                                _onPress={this.Library}
                            />
                        </Fragment>
                        }
                    </View>
                </ReactNativeZoomableView>
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
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})

