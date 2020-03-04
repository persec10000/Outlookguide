import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

let width = Dimensions.get('window').width


const styles = StyleSheet.create({
    buttonStyle: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#5A73FF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400'
    }
});

const CustomButton = (props => (
    <TouchableOpacity 
        style={[styles.buttonStyle, {backgroundColor: props.disabled?'#CFCFCF':props.backgroundColor?props.backgroundColor:'#5A73FF'}]} 
        disabled={props.disabled} 
        activeOpacity={0.8} 
        onPress={props.onPress}>
        <Text style={styles.buttonTextStyle}>{props.title}</Text>
    </TouchableOpacity>
));

export default CustomButton;
