import React, {Component} from 'react';
import {View, Text, Avatar} from 'react-native';

export default class CustomDrawerContentComponent extends Component {
  render() {
    const { theme, user } = this.props;
    const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

    return (
      <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <DrawerItems {...this.props} />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}