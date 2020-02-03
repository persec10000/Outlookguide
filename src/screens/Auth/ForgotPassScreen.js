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
import _ from 'lodash'


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
            phone: '',
            address: '',
            email: '',
            password: '',
            passwordConfirm: '',
            showpassword: true
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

    changePwdType = () => {
        this.setState( state => ({showpassword: !state.showpassword}));
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this.handleBackButton.bind(this));
    }
    handleBackButton(){
        // this.props.navigation.navigate('Forgot');
        return true;
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
