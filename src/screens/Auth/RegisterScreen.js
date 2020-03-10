import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    BackHandler,
    Platform,
    AlertIOS,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPassInput from '../../components/CustomPassInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../../components/GradientButton';
import ValidationComponent from 'react-native-form-validator';
import LinearGradient from 'react-native-linear-gradient';
import { usersService } from '../../services/UsersService';
import {Images} from '../../themes'

import _ from 'lodash'
let self = null;

export default class RegisterScreen extends ValidationComponent {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
         headerShown: false
        };
    };
    
    constructor(props) {
        super(props)
        self = this;
        this.state = {
            isChecked: false,
            emailAddress: '',
            telno: '',
            password: '',
            passwordConfirm: '',
            telnoValid: null,
            passwordValid: null,
            repasswordValid: null,
            showpassword: true,
            showconfirmpassword: true,
            isSignUp: false
        };
        this.backhandler = null;
    }
    
    _onPressTerm = () => {
        this.setState(prevState => ({
            ...prevState,
            isChecked: !prevState.isChecked
        }))
    }

    _onChangeEmail = (email) => {
        this.setState({ emailAddress: email }, ()=> {
            const isValid = this.validate({
                emailAddress: { email: true }
              });
            this.setState({ isValid });
        })
    }

    _onChangePasswordConfirm = (text) => {
        this.setState({ passwordConfirm: text });
        // this.handleReValidation(text);
    } 

    _onChangePassword = (text) => {
        this.setState({ password: text });
        // this.handleValidation(text);
    }

    _onChangeTelno = (text) => {
        this.setState({telno: text});
        // this.handletelnoValidation(text);
    }

    handletelnoValidation = (value) => {
        let reg = /^[0-9\b]+$/
        if (reg.test(value)){
            this.setState({telnoValid: true})
        }
        else {
            this.setState({telnoValid: false})
        }
    }

    handleValidation = (value) => {
        let reg = /(?=^.{8,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/
        if (reg.test(value)){
            this.setState({passwordValid: true})
        }
        else {
            this.setState({passwordValid: false})
        }
    }

    handleReValidation = (value) => {
        let reg = /(?=^.{8,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/
        if (reg.test(value)){
            this.setState({repasswordValid: true})
        }
        else {
            this.setState({repasswordValid: false})
        }
    }
    _back = () => {
        this.props.navigation.goBack(null)
    }
    _register = async () => {
        const { 
            emailAddress,
            telno,
            password,
            passwordConfirm,
            passwordValid,
            repasswordValid
        } = this.state;
        if(_.isEmpty(emailAddress)|| _.isEmpty(password)|| _.isEmpty(passwordConfirm)) {
            Alert.alert(__APP_NAME__, 'All fields must be populated');
            return
        }
        if(password !== passwordConfirm) {
            Alert.alert(__APP_NAME__, 'Password confirm doesn\'t match');
            return
        }
      
        this.setState({isSignUp: true})
        let params = {
            email: emailAddress,
            password: encodeURIComponent(password),
            telno: telno,
            device_id: global.deviceSerial,
            lang: global.deviceLocale
        }

        usersService.signup(params, async function(res) {
            let result = res.split("|");
            console.log("result==>",result);
            if(result[0] == 'OK') {
            global.token = result[1];
            global.emailAddress = emailAddress;
            global.password = encodeURIComponent(password);
            Platform.select({
                    ios: ()=>{AlertIOS.alert("Register Succeed")},
                    android: ()=>{ToastAndroid.show('Register Succeed', ToastAndroid.SHORT)}
                })();
                setTimeout(() => {
                self.setState({emailAddress: '', password: '', passwordConfirm: '', telno: '', isSignUp: false}, ()=> {
                    self.props.navigation.navigate('Activate');
                });
            }, 800 );
        }
            else if (result[0] == 'NOK'){
                Alert.alert(__APP_NAME__, result[1]);
                self.setState({emailAddress: '', password: '', passwordConfirm: '', telno: '', isSignUp: false});
            }
          }, function (error) {
            console.log(error);
            }
        );
    }

    componentDidMount(){
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Register');
            return true
        });
    }

    componentWillUnmount(){
        this.backhandler.remove();
    }

    changePwdType = () => {
        this.setState( state => ({showpassword: !state.showpassword}));
    }

    changePwdConfirmType = () => {
        this.setState( state => ({showconfirmpassword: !state.showconfirmpassword}));
    }

    render() {
        const { 
            emailAddress,
            telno,
            password,
            passwordConfirm,
            passwordValid,
            repasswordValid,
            isSignUp,
            telnoValid
        } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Image
                    source={Images.applogo}
                    style={styles.applogo}
                />
                <View style={styles.registerForm}>
                    <Text style={styles.registerLabel}>SignUp</Text>
                    <CustomTextInput 
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={emailAddress}
                        placeholder="Email"
                        placeholderTextColor="#707070"
                        onChangeText={this._onChangeEmail}
                    />   
                    {/* {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text style={{color:'red', textAlign: 'center'}}>{errorMessage}</Text>) } */}
                    <CustomTextInput 
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={telno}
                        placeholder="Phone Number"
                        placeholderTextColor="#707070"
                        onChangeText={this._onChangeTelno}
                    />
                    {/* {telnoValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Phone Number must be contain only number
                        </Text>
                    }    */}
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
                    <CustomPassInput 
                        inputWrapperStyle={{
                            marginBottom: 20
                        }}
                        value={passwordConfirm}
                        placeholder="Re-enter password"
                        placeholderTextColor="#707070"
                        secureTextEntry={this.state.showconfirmpassword}
                        onChangeText={this._onChangePasswordConfirm}
                        iconPress={this.changePwdConfirmType}
                    />
                    {/* {repasswordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Confirm Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    } */}
                    {isSignUp 
                        ?
                        <View style={{alignItems:'center'}}>
                            <View style={styles.loginBtn}>
                                <LinearGradient colors={['#E8222B', '#141414']} style={styles.loginBtnBackground}>
                                    <ActivityIndicator color='#fff'/>
                                </LinearGradient>
                            </View>
                        </View>
                        :
                        <GradientButton
                            label="sign up"
                            _onPress={this._register}
                        />
                    } 
                    <GradientButton
                        label="home"
                        _onPress={this._back}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    applogo: {
        position: 'absolute',
		left: 10,
		top: 3,
    },
    backbutton:{
        position: 'absolute',
        left: 25,
        top: 25
    },
    registerForm: {
      marginTop: 150  
    },
    registerLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#707070',
        marginVertical: 15,
        alignSelf: 'center'
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedDot: {
        width: 19, 
        height: 19, 
        backgroundColor: '#E8222B', 
        borderRadius: 10
    },
    termText: {
        fontSize: 12,
        letterSpacing: 0,
        color: '#707070'
    },
    actionContainer: {
        marginVertical: 32,
        alignItems: 'center'
    },
    loginBtn: {
        // alignItems: 'center',
        marginTop: 10,
        width: 280,
        height: 55,
    },
    loginBtnBackground: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 20,
        color: '#fff',
        letterSpacing: 0
    },
})
