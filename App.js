/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Index from './src/Index';
import { StatusBar, Platform, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { omit } from 'lodash';
import getFontFamily from './src/utils/getFontFamily';

// redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './src/redux/reducers/index';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

StatusBar.setBarStyle('dark-content')
const setCustomText = customProps => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    let oldProps = props;
    const style = StyleSheet.flatten([customProps.style, props.style]);
    props = {
      ...props,
      style: (style.fontFamily === 'Raleway' || !style.fontFamily) ? [
        omit(style, 'fontWeight', 'fontStyle'),
        {
          fontFamily: getFontFamily('Raleway', style),
        },
      ] : style,
    };
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
}
 
setCustomText({});


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))

let persistor = persistStore(store)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Index />
      </PersistGate>
    </Provider>
  );
};

export default App;
