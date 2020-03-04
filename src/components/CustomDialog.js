import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../components/Button'

const _phone_width = Dimensions.get('window').width;

export default class CustomDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            starCount: 0
        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props._hideDialog();
        return true;
    }

    render() {
        return (
            <View style={styles.container} >
                {this.props.dialogType=='Success'&&
                    <View style={styles.dialog}>
                        <View style={{alignItems: 'flex-end', marginTop: -20, marginRight: -20}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.props._hideDialog}>
                                <MaterialIcons name='clear' size={35*_phone_width/360} color={'#343333'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 5}}>
                            <Image 
                                source={require('../resources/images/success.png')}
                            />
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 25}}>
                            <Text style={[styles.dialog_text, {marginVertical: 10}]}>{this.props.dialogType}</Text>
                            <Text style={[styles.dialog_text, {fontSize: 14*_phone_width/360, fontWeight: '300'}]}>{this.props.dialogContent}</Text>
                        </View>
                        <CustomButton title={this.props.dialogButton} onPress={this.props._hideDialog} disabled={false} />
                    </View>
                }
                {this.props.dialogType=='Warning'&&
                    <View style={styles.dialog}>
                        <View style={{alignItems: 'flex-end', marginTop: -20, marginRight: -20}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.props._hideDialog}>
                                <MaterialIcons name='clear' size={35*_phone_width/360} color={'#343333'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 5}}>
                            <Image 
                                source={require('../resources/images/warning_3x.png')}
                            />
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 25}}>
                            <Text style={[styles.dialog_text, {marginVertical: 10}]}>{this.props.dialogHeader}</Text>
                            <Text style={[styles.dialog_text, {fontSize: 14*_phone_width/360, fontWeight: '300'}]}>{this.props.dialogContent}</Text>
                        </View>
                        <CustomButton title={this.props.dialogButton} onPress={this.props._hideDialog} disabled={false} backgroundColor={'#CBCBCB'}/>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: _phone_width-60,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30
    },
    dialog: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    dialog_text: {
        color: '#333333',
        fontSize: 26*_phone_width/360,
        fontWeight: '400',
        textAlign: 'center'
    },
    gradient_button: {
        height: 50*_phone_width/360,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#fff',
        fontSize: 20*_phone_width/360,
        fontWeight: '400'
    },
})
