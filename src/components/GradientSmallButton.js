import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class GradientButton extends Component {
  render() {
    const {label, _onPress} = this.props;
    return (
      <View style={styles.gradientBtnWrapper}>
        <TouchableOpacity onPress={_onPress} style={styles.gradientBtn}>
          <LinearGradient
            style={styles.gradientBtnBackground}
            colors={['#E8222B', '#141414']}>
            <Text style={styles.gradientBtnLabel}>{label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradientBtnWrapper: {
    alignItems: 'center',
  },
  gradientBtn: {
    shadowColor: '#1C191966',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 12,
  },
  gradientBtnBackground: {
    width: 120,
    height: 45,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.55
  },
  gradientBtnLabel: {
    fontSize: 18,
    letterSpacing: 0,
    color: '#fff',
  },
});
