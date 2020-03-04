import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    BackHandler,
    BackAndroid,
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/GradientButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from '../../components/CustomTextInput';
import CustomPassInput from '../../components/CustomPassInput';
import ValidationComponent from 'react-native-form-validator';
import {Images} from '../../themes'
import Orientation from 'react-native-orientation-locker';
import _ from 'lodash';
import { usersService } from '../../services/UsersService';
let self = null;
export default class LoginScreen extends ValidationComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerShown: false
        }
    };

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            emailAddress: "",
            password: '',
            passwordValid: null,
            isLoggingIn: false,
            showpassword: true
        }
        this.backhandler = null;
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.setState({ismount: true});
            Orientation.lockToPortrait();
        });
        this.mounted = true;
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Login');
            return true
        });
    }
    
    componentWillUnmount() {
        this.backhandler.remove();
        this.focusListener.remove();
        this.mounted = false;
    }

    handleBackButton() {
        return true;
    }
   
    _forgot = () => {
        this.props.navigation.navigate('Forgotpass');
    }

    _register =() => {
        this.props.navigation.navigate('Register');
    }

    _onChangeEmail = (email) => {
        this.setState({ emailAddress: email }, ()=> {
            const isValid = this.validate({
                emailAddress: { email: true }
              });
            this.setState({ isValid });
        })
    }

    _onChangePassword = (text) => {
        this.setState({ password: text });
        // this.handleValidation(text);
    }

    // handleValidation = (value) => {
    //     let reg = /(?=^.{8,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/
    //     if (reg.test(value)){
    //         this.setState({passwordValid: true});
    //     }
    //     else {
    //         this.setState({passwordValid: false});
    //     }
    // }

    changePwdType = () => {
        this.setState( state => ({showpassword: !state.showpassword}));
    }

    _login = async () => {
        this.props.navigation.navigate('Home');
        return;
        const { 
            emailAddress,
            password,
            passwordValid
        } = this.state;

        if(
             _.isEmpty(emailAddress)
            || _.isEmpty(password)) {
                Alert.alert(__APP_NAME__, 'All fields must be not empty');
                return
            }        
        // if (!passwordValid){
        //     Alert.alert(__APP_NAME__, 'Please correct input type');
        //     return
        // }
        this.setState({isLoggingIn: true});
        let params = {
            email: emailAddress,
            password: encodeURIComponent(password),
            device_id: global.deviceSerial,
            lang: global.deviceLocale
        }

        usersService.signin(params, function(res) {
            let result = res.split("|");
            console.log("result==>",result);
            if(result[0] == 'OK') {
              global.sessionId = result[1];
              Platform.select({
                  ios: ()=>{AlertIOS.alert("Login Succeed")},
                  android: ()=>{ToastAndroid.show('Login Succeed', ToastAndroid.SHORT)}
              })();
              setTimeout(() => {
                self.setState({emailAddress: '', password: '', isLoggingIn: false});
                self.props.navigation.navigate('Home');
              }, 600 );
            }
            else if (result[0] == 'NOK'){
                self.setState({isLoggingIn: false});
                Alert.alert(__APP_NAME__, result[1]);

            }
          }, function (error) {
            console.log(error);
            }
        );
    }

    render() {
        const {
            emailAddress,
            password,
            isLoggingIn,
            passwordValid
        } = this.state;
        
        return (
            <KeyboardAwareScrollView 
                style={styles.container}>
                <Image 
                    source={Images.applogo}
                    style={styles.appLogo}/>
                <View style={styles.appimage}>                  
                    <Video
                    // source={{uri: 'http://172.31.30.171/output/1-48-0.mp4'}} 
                        source={require('../../resources/images/OutlookGuide.mov')} 
                        ref={(ref) => {
                            this.player = ref
                        }}                                     
                        onBuffer={this.onBuffer}               
                        onError={this.videoError}          
                        style={styles.backgroundVideo}
                        repeat={true} />
                </View>
                <View style={styles.buttons}>
                    <FontAwesome.Button
                        name="google-plus"
                        backgroundColor="#DE3521"
                        // onPress={this.loginWithGoogle}
                        {...iconStyles}
                    >
                        CONNECT WITH GOOGLE
                    </FontAwesome.Button>
                </View>
                <View style={styles.buttons}>
                    <FontAwesome.Button
                        name="facebook"
                        backgroundColor="#3b5998"
                        // onPress={this.loginWithFacebook}
                        {...iconStyles}
                    >
                        CONNECT WITH FACEBOOK
                    </FontAwesome.Button>
                </View>
                <View
                    style={{
                        borderBottomColor: '#d1d1d1',
                        borderBottomWidth: 1,
                        marginHorizontal: 15
                    }}
                />
                <Text style={styles.textor}>
                    or
                </Text>
                <View style={styles.mainLoginContainer}>
                    <CustomTextInput 
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={emailAddress}
                        placeholder="Username"
                        placeholderTextColor="#707070"
                        onChangeText={this._onChangeEmail}
                    />   
                    {/* {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text style={{color:'red', textAlign: 'center'}}>{errorMessage}</Text>) }                 */}
                    <CustomPassInput 
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#707070"
                        secureTextEntry={this.state.showpassword}
                        onChangeText={this._onChangePassword}
                        iconPress={this.changePwdType}
                    />
                    {/* {passwordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    } */}
                    <View style={styles.actionContainer}>
                        {isLoggingIn 
                            ?
                            <View style={styles.loginBtn}>
                                <LinearGradient colors={['#E8222B', '#141414']} style={styles.loginBtnBackground}>
                                    <ActivityIndicator color='#fff'/>
                                </LinearGradient>
                            </View>
                            :
                            <GradientButton
                                label="sign in"
                                _onPress={this._login}
                            />
                        }
                    </View>
                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this._forgot}>
                            <Text style={styles.signupText}>forgot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._register}>
                            <Text style={styles.signupText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const iconStyles = {
    borderRadius: 1,
    iconStyle: { paddingVertical: 5 },
    // margin: 5
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appLogo: {
        position: 'absolute',
		left: 0,
		top: -10,
    },
    backgroundVideo: {
        position: 'absolute',
        left: 40,
		top: 50,
        bottom: 0,
        right: 0,
    },
    appimage: {
        marginTop: 50,
        width: "100%",
        height: 230,
        alignItems: 'center'
    },
    textor: {
        textAlign: 'center', 
        color:"#A1A1A1", 
        fontSize: 18,
        fontWeight: 'bold'
    },
    mainLoginContainer: {
        flex: 1,
        marginTop: 3
    },
    actionContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    loginBtn: {
        width: 280,
        height: 55,
        marginTop: 10
    },
    loginBtnBackground: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 20
    },
    signupText: {
        color: '#707070',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    buttons: {
        marginHorizontal: 40,
        marginBottom: 5,
    },
    icon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    textInputWrapper: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        marginHorizontal: 50,
        overflow: 'hidden'
    },
    textInput: {
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 8,
        padding: Platform.select({
            android: 0
        }),
        color: '#000',
        fontWeight: '400',
        fontFamily: 'Raleway-Regular'
    },
})

// export default LoginScreen