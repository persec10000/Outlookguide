import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    TextInput,
    Image,
    Platform,
    Alert
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CustomPassInput extends Component {
    render() {
        const { inputWrapperStyle, inputStyle} = this.props;
        return (
            <View style={[styles.textInputWrapper, inputWrapperStyle ]}>
                <TextInput 
                    style={[styles.textInput, inputStyle]}
                    {...this.props}
                />
                <MaterialIcons 
                    style={styles.icon}
                    name={'visibility-off'}
                    size={30}
                    onPress={this.props.iconPress}
                />   
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    icon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
})
