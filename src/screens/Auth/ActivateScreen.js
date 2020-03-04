import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Image, Dimensions, BackHandler, findNodeHandle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog, {ScaleAnimation} from 'react-native-popup-dialog';
import AbsoluteLoadingScreen from '../../components/AbsoluteLoadingScreen'
import CustomDialog from '../../components/CustomDialog'
import {Images} from '../../themes'
import AsyncStorage from '@react-native-community/async-storage';
import { usersService } from '../../services/UsersService';
// components
import CustomButton from '../../components/Button'

let width = Dimensions.get('window').width;
let self = null;
export default class ActivateScreen extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
     headerShown: false
    };
  };

    constructor (props){
        super(props)
        this.state = {
            email: '',
            failure_visible: false,
            success_visible: false,
            resend_visible: false,
            disabled: true,
            loading: false,
        }
        self = this;
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {

    }

    _onNext = async() => {
        this.setState({loading: true})
        let activatecode = this.state.num1+''+this.state.num2+''+this.state.num3+''+this.state.num4;      
        let params = {
          email: global.emailAddress,
          password: global.password,
          device_id: global.deviceSerial,
          token: global.token
      }
      console.log(params)
      usersService.activate(params, async function(res) {
        console.log("result==>",res);
          let result = res.split("|");
          if(result[0] == 'OK') {
            self.setState({success_visible: true, loading: false})
          }
          else if (result[0] == 'NOK'){
            self.setState({failure_visible: true, loading: false})
          }
        }, function (error) {
          console.log(error);
          }
      );    }

    handleResendButton = async()=>{
        this.setState({loading: true});       
    }
    _hideResendDialog = () => {
        this.setState({resend_visible: false})
    }

    _hideDialog = () => {
        this.setState({ 
            failure_visible: false,
            num1: '',
            num2: '',
            num3: '',
            num4: '',
            disabled: true
        })
    }
    _hideSuccessDialog = () => {
        this.setState({success_visible: false});
        this.props.navigation.navigate('Login')
    }
    _hideSuccess = () => {
        this.setState({success_visible: false});    }
    _changeText1 = (text) => {
        if (text.length > 1)
            text = text.substring(0, 1);
        if (text) this.secondTextInput.focus();
        this.setState({num1: text.replace(/[^\w\s]/gi, "")})
        if (text&&this.state.num2&&this.state.num3&&this.state.num4)
            this.setState({disabled: false})
        else    
            this.setState({disabled: true})
    }
    _changeText2 = (text) => {
        if (text.length > 1)
            text = text.substring(0, 1);
        if (text) this.threeTextInput.focus();
        else this.firstTextInput.focus();
        this.setState({num2: text.replace(/[^\w\s]/gi, "")})
        if (this.state.num1&&text&&this.state.num3&&this.state.num4)
            this.setState({disabled: false})
        else    
            this.setState({disabled: true})
    }
    _changeText3 = (text) => {
        if (text.length > 1)
            text = text.substring(0, 1);
        if (text) this.fourTextInput.focus();
        else this.secondTextInput.focus();
        this.setState({num3: text.replace(/[^\w\s]/gi, "")})
        if (this.state.num1&&this.state.num2&&text&&this.state.num4)
            this.setState({disabled: false})
        else    
            this.setState({disabled: true})
    }
    _changeText4 = (text) => {
        if (!text) this.threeTextInput.focus();
        this.setState({num4: text.replace(/[^\w\s]/gi, "")})
        if (this.state.num1&&this.state.num2&&this.state.num3&&text)
            this.setState({disabled: false})
        else    
            this.setState({disabled: true})
    }

    keypress2 = (e) => {
        if (e.nativeEvent.key === 'Backspace') {
            this.firstTextInput.focus();
        }
    }
    keypress3 = (e) => {
        if (e.nativeEvent.key === 'Backspace') {
            this.secondTextInput.focus();
        }
    }
    keypress4 = (e) => {
        if (e.nativeEvent.key === 'Backspace') {
            this.threeTextInput.focus();
        }
    }
   
    render() {
        const {
            num1,num2,num3,num4,
            failure_visible,
            success_visible,
            resend_visible,
            disabled,
            loading,
        } = this.state;
        return (
            <View style={styles.container}> 
              <Image
                source={Images.applogo}
                style={styles.applogo}
              />            
              <KeyboardAwareScrollView style={styles.main}>
                <Text style={[styles.titleTextStyle, {marginBottom: 10, marginTop: 150}]}>Enter Verification Code</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                      ref={(input) => { this.firstTextInput = input; }}
                      style={styles.inputStyle}
                      value={num1}
                      onChangeText={this._changeText1}
                      keyboardType={'numeric'}
                      maxLength={2}
                  />
                  <View style={{width: 10}}></View>
                  <TextInput
                      ref={(input) => { this.secondTextInput = input; }}
                      style={styles.inputStyle}
                      value={num2}
                      onChangeText={this._changeText2}
                      keyboardType={'numeric'}
                      maxLength={2}
                      onKeyPress={this.keypress2}
                  />
                  <View style={{width: 10}}></View>
                  <TextInput
                      ref={(input) => { this.threeTextInput = input; }}
                      style={styles.inputStyle}
                      value={num3}
                      onChangeText={this._changeText3}
                      keyboardType={'numeric'}
                      maxLength={2}
                      onKeyPress={this.keypress3}
                  />
                  <View style={{width: 10}}></View>
                  <TextInput
                      ref={(input) => { this.fourTextInput = input; }}
                      style={styles.inputStyle}
                      value={num4}
                      onChangeText={this._changeText4}
                      keyboardType={'numeric'}
                      maxLength={1}
                      onKeyPress={this.keypress4}
                  />
                </View>
                <View style={{paddingHorizontal: 30, marginTop: 30}}>
                    <CustomButton title={'CONTINUE'} onPress={this._onNext} disabled={disabled} />
                    <View style={{marginTop: 15}}></View>
                    {/* <CustomButton title={'RESEND VERIFICATION'} onPress={this.handleResendButton} disabled={false} backgroundColor={'#CE0000'} /> */}
                </View>
              </KeyboardAwareScrollView>
              <Dialog
                  visible={failure_visible}
                  onTouchOutside={this._hideDialog}
                  overlayOpacity={0.1}
                  dialogAnimation={new ScaleAnimation({
                      initialValue: 0, // optional
                      useNativeDriver: true, // optional
                  })}
              >
                <CustomDialog 
                    dialogType={'Warning'}
                    dialogHeader={'Verification\nUnsuccessful'}
                    dialogContent={'You have entered an\nincorrect verification code.\nPlease enter the correct\nverification code.'}
                    dialogButton={'BACK'}
                    _hideDialog={this._hideDialog}
                />
              </Dialog> 
              <Dialog
                  visible={success_visible}
                  onTouchOutside={this._hideSuccess}
                  overlayOpacity={0.1}
                  dialogAnimation={new ScaleAnimation({
                      initialValue: 0, // optional
                      useNativeDriver: true, // optional
                  })}
              >
                <CustomDialog 
                    dialogType={'Success'}
                    dialogContent={'Your e-mail address has been\nsuccessfully verified.'}
                    dialogButton={'CONTINUE'}
                    _hideDialog={this._hideSuccessDialog}
                />
              </Dialog>
              <Dialog
                  visible={resend_visible}
                  onTouchOutside={this._hideResendDialog}
                  overlayOpacity={0.1}
                  dialogAnimation={new ScaleAnimation({
                      initialValue: 0, // optional
                      useNativeDriver: true, // optional
                  })}
              >
                <CustomDialog 
                    dialogType={'Success'}
                    dialogContent={'You have been re-sent a\nverification email.'}
                    dialogButton={'CONTINUE'}
                    _hideDialog={this._hideResendDialog}
                />
              </Dialog>  
              {loading && <AbsoluteLoadingScreen />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECEFF1'
    },
    applogo: {
      position: 'absolute',
      left: 10,
      top: 3,
    },
    blurContainer: {
        flex: 1,
        backgroundColor: '#ECEFF1'
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ECEFF1'
    },
    main: {
        flex: 1,
        paddingHorizontal: 30
    },
    titleTextStyle: {
        color: '#333333', 
        fontSize: 24*width/360, 
        fontWeight: '300', 
        textAlign: 'center'
    },
    textInputContainer: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginTop: 20,
    },
    inputIconStyle: {
        justifyContent: 'center'
    },
    inputStyle: {
        width: 55,
        height: 55,
        fontSize: 18*width/360,
        fontWeight:'400',
        backgroundColor: '#fff',
        paddingVertical: 0,
        textAlign: "center",
        borderRadius: 10
    }
})