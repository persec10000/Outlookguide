import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    BackHandler,
    Platform,
    ToastAndroid,
    AlertIOS,
    ActivityIndicator
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPassInput from '../../components/CustomPassInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../../components/GradientButton';
import ValidationComponent from 'react-native-form-validator';
import {usersService} from '../../services/UsersService';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../themes'
import _ from 'lodash';

let self = null;
export default class ForgotpassScreen extends ValidationComponent {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
         headerShown: false
        };
      };
    
    constructor(props) {
        super(props)
    
        this.state = {
            isChecked: false,
            name: '',
            emailAddress: '',
            isForgot: false
        };
        self = this;
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

    _onChangePassword = (text) => {
        this.setState({ password: text })
        this.handleValidation(text);
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

    _back = () => {
        this.props.navigation.goBack(null)
    }
    _register = async () => {
        const { 
            emailAddress,
        } = this.state;

        if(_.isEmpty(emailAddress))
            {
                Alert.alert(__APP_NAME__, 'All fields must be not empty');
                return
            }        
       
        let params = {
            email: emailAddress,
            device_id: global.device_id,
        }
        this.setState({isForgot: true})
        usersService.forgot(params, async function(res) {
            let result = res.split("|");
            console.log("result==>",result);
            if(result[0] == 'OK') {
              Platform.select({
                  ios: ()=>{AlertIOS.alert("Validated User")},
                  android: ()=>{ToastAndroid.show('Validated User', ToastAndroid.SHORT)}
              })();
              setTimeout(() => {
                  self.setState({emailAddress: '', isForgot: false})
                  self.props.navigation.navigate('Login');
              }, 800);             
            }
            else if (result[0] == 'NOK'){
                self.setState({emailAddress: '', isForgot: false})
                Alert.alert(__APP_NAME__, result[1]);
                // Platform.select({
                //     ios: ()=>{AlertIOS.alert(result[1])},
                //     android: ()=>{ToastAndroid.show(result[1], ToastAndroid.SHORT)}
                // })();
            }
          }, function (error) {
            console.log(error);
            }
        );
    }

  
    componentDidMount(){
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', ()=> {
            this.props.navigation.navigate('Forgot');
            return true;
        })

    }
    componentWillUnmount(){
        this.backhandler.remove();
    }
    render() {
        const { 
            emailAddress,
            isForgot
        } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Image
                    source={Images.applogo}
                    style={styles.applogo}
                />
                <View style={styles.registerForm}>
                    <Text style={styles.registerLabel}>Forgot Password</Text>
                    <CustomTextInput 
                        inputWrapperStyle={{
                            marginBottom: 30
                        }}
                        value={emailAddress}
                        placeholder="Username"
                        placeholderTextColor="#707070"
                        onChangeText={this._onChangeEmail}
                    />   
                    {/* {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text style={{color:'red', textAlign: 'center'}}>{errorMessage}</Text>) } */}
                    {/* <CustomPassInput 
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
                    {passwordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    } */}
                    <GradientButton
                        label="home"
                        _onPress={this._back}
                    />
                    {isForgot 
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
                            label="remind me"
                            _onPress={this._register}
                        />
                    }
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
    registerForm:{
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
