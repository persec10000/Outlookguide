import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert,
    BackHandler
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPassInput from '../../components/CustomPassInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../../components/GradientButton';
import ValidationComponent from 'react-native-form-validator';
import {usersService} from '../../services/UsersService';
import _ from 'lodash';


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
            password: '',
            showpassword: true,
            passwordValid: null,
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
            password,
            passwordValid
        } = this.state;

        if(
             _.isEmpty(emailAddress)
            || _.isEmpty(password)) {
                Alert.alert(__APP_NAME__, 'All fields must be not empty');
                return
            }        
        if (!passwordValid){
            Alert.alert(__APP_NAME__, 'Please correct input type');
            return
        }
    
        let params = {
            email: emailAddress,
            password: password,
            imei: 1234,
            lang: 'en'
        }

        usersService.forgot(params, async function(res) {
            // let result = res.split("|");
            // console.log("result==>",result);
            if(result == 'OK') {
              let user = res[1];
              global.initialcurUser = user;
              Platform.select({
                  ios: ()=>{AlertIOS.alert("Succeed")},
                  android: ()=>{ToastAndroid.show('Succeed', ToastAndroid.SHORT)}
              })();
              setTimeout(() => {
                self.setState({emailAddress: '', password: '', passwordConfirm: ''});
              }, 600 );
            }
            else if (result == 'NOK'){
                Alert.alert(__APP_NAME__, "Failed");
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

    changePwdType = () => {
        this.setState( state => ({showpassword: !state.showpassword}));
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
            password,
            passwordValid,
        } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Image
                    source={require('../../resources/images/applogo.png')}
                    style={styles.applogo}
                />
                <View style={styles.registerForm}>
                    <Text style={styles.registerLabel}>Forgot Password</Text>
                    <CustomTextInput 
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={emailAddress}
                        placeholder="Username"
                        placeholderTextColor="#707070"
                        onChangeText={this._onChangeEmail}
                    />   
                    {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text style={{color:'red', textAlign: 'center'}}>{errorMessage}</Text>) }
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
                    {passwordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    }
                    {/* <View style={{width: "100%", height: 150}}>
                        <Text style={{textAlign: 'center'}}>
                            Feedback textbox
                        </Text>
                    </View>  */}
                    <GradientButton
                        label="home"
                        _onPress={this._back}
                    />
                    <GradientButton
                        label="remind me"
                        _onPress={this._register}
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
