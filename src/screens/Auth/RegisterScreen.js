import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native'
import CustomTextInput from './CustomTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../components/GradientButton'
import ValidationComponent from 'react-native-form-validator';
import _ from 'lodash'


export default class RegisterScreen extends ValidationComponent {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
         headerShown: false
        };
      };
    
    constructor(props) {
        super(props)
    
        this.state = {
            isChecked: false,
            emailAddress: '',
            password: '',
            passwordConfirm: '',
            passwordValid: null,
            repasswordValid: null
        }
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
        this.setState({ passwordConfirm: text })
        this.handleReValidation()
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
            isChecked,
            name,
            phone,
            birthday,
            address,
            email,
            password,
            passwordConfirm
        } = this.state;

        if(!isChecked) {
            Alert.alert(__APP_NAME__, 'You must accept Terms & Conditions first');
            return
        }

        if(_.isEmpty(name) 
            || _.isEmpty(phone)
            || _.isEmpty(email)
            || _.isEmpty(password)
            || _.isEmpty(passwordConfirm)) {
                Alert.alert(__APP_NAME__, 'All fields must be not empty');
                return
            }
        
        if(password !== passwordConfirm) {
            Alert.alert(__APP_NAME__, 'Password confirm doesn\'t match');
            return
        }

        const path = '/api/v1/user'
        const data = {
            name,
            phone,
            email,
            password,
            address,
            username: email,
            birthday: birthday.format()
        }

        const { response, error } = await APIClient.getInstance().jsonPOST(path, data)
        console.log(response)
        if(response && response.status && response.code === 200 && !_.isEmpty(response.data)) {
            Alert.alert(__APP_NAME__, response.message);
            userManager.updateUser(response.data)
            this.props.navigation.navigate('App')
        }
        else {
            Alert.alert(__APP_NAME__, 'Create user failed');
        }
    }

    render() {
        const { 
            emailAddress,
            password,
            passwordConfirm,
            passwordValid,
            repasswordValid
        } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <TouchableOpacity style={styles.backbutton} onPress={this._back}>
                    <Image source={require('../../resources/images/caret-left.png')}/>
                </TouchableOpacity>
                <View style={styles.appLogoContainer}>
                    <Image
                        source={require('../../resources/images/appLogo2.png')}
                    />
                </View>
                <View style={styles.registerForm}>
                    <Text style={styles.registerLabel}>Sign  Up</Text>
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
                    <CustomTextInput 
                        placeholder="Password"
                        placeholderTextColor="#707070"
                        secureTextEntry={true}
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={password}
                        onChangeText={this._onChangePassword}
                    />
                    {passwordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    }
                    <CustomTextInput 
                        placeholder="Re-Enter Password"
                        placeholderTextColor="#707070"
                        secureTextEntry={true}
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        value={passwordConfirm}
                        onChangeText={this._onChangePasswordConfirm}
                    />
                    {repasswordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    } 
                    <GradientButton
                        label="Sign up"
                        // _onPress={this._startMakingOrder}
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
    appLogoContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    backbutton:{
        position: 'absolute',
        left: 25,
        top: 25
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
