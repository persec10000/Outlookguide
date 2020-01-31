import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import GradientButton from '../../components/GradientButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from './CustomTextInput'
import ValidationComponent from 'react-native-form-validator';
import PasswordInputText from 'react-native-hide-show-password-input';
import _ from 'lodash'
import { TextInput } from 'react-native-gesture-handler';

class LoginScreen extends ValidationComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerShown: false
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            emailAddress: "",
            password: '',
            passwordValid: null,
            isLoggingIn: false
        }
    }
    
    componentDidMount() {
        this.mounted = true
    }
    
    componentWillUnmount() {
        this.mounted = false
    }

  
    _login = () => {
        this.props.navigation.navigate('Home')
    }

    _forgot = () => {
        this.props.navigation.navigate('Forgotpass')
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
                    source={require('../../resources/images/appLogo2.png')} 
                    style={styles.appLogo}/>
                <View style={styles.appimage}>
                    <Image 
                        source={require('../../resources/images/appLogo1.png')}
                        style={{width: 300, height: 200}}/>
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
                <Text style={styles.textor}>
                    or
                </Text>
                <View
                    style={{
                        borderBottomColor: '#d1d1d1',
                        borderBottomWidth: 1,
                        marginHorizontal: 15
                    }}
                />
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
                    {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text style={{color:'red', textAlign: 'center'}}>{errorMessage}</Text>) }                
                    <View style={styles.textInputWrapper}>
                        <TextInput 
                            style={styles.textInput}
                            lineWidth={0}
                            containerStyle={{paddingTop: 0}}
                            getRef={input => this.input = input} 
                            value={password}
                            label=''
                            placeholder="Password"
                            placeholderTextColor="#707070"
                            secureTextEntry={true}
                            onChangeText={this._onChangePassword}
                        />
                         <MaterialIcons 
                        style={styles.icon}
                        name={'visibility-off'}
                        size={30}
                        // color={componentColors.password_icon_color}
                        // onPress={this.changePwdType}
                    />   
                    </View>
                   
                   
                    
                    {passwordValid == false &&
                        <Text style={{color:'red', textAlign: 'center'}}>
                            Password must be contain at least one uppercase, number, lowercase and character
                        </Text>
                    }
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
		left: 15,
		top: 15,
		// width: 50,
		// height: 50,
    },
    appimage: {
        marginTop: 40,
        alignItems: 'center'
    },
    textor: {
        marginVertical: 8, 
        textAlign: 'center', 
        color:"#A1A1A1", 
        fontSize: 26,
        fontWeight: 'bold'
    },
    mainLoginContainer: {
        flex: 1,
        marginTop: 20
    },
    forgotPasswordContainer: {
        paddingHorizontal: 110,
        alignItems: 'center'
    },
    forgotPasswordText: {
        fontSize: 16,
        letterSpacing: 0,
        color: '#707070',
        textDecorationLine: 'underline'
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
    loginText: {
        fontSize: 20,
        color: '#fff',
        letterSpacing: 0
    },
    createAccountBtn: {
        marginTop: 10,
        width: 265,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888888',
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
    signInOptionContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInOption: {
        marginHorizontal: 2.5
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

export default LoginScreen