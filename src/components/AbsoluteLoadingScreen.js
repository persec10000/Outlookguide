import React, { Component } from 'react'
import {
    StyleSheet
} from 'react-native'
import {SkypeIndicator} from 'react-native-indicators';

export default class AbsoluteLoadingScreen extends Component {
    render() {
        return (
            <SkypeIndicator style={styles.loadingScreen} color={'#2a56f9'} size={50}/>
        )
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000000,
        elevation: 100000
    }
})
