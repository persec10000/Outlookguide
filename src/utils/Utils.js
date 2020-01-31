import {
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
let STATUS_BAR_HEIGHT = 0;

if(Platform.OS == "android") {
  STATUS_BAR_HEIGHT = StatusBar.currentHeight;
}
else if(Platform.OS == "ios") {
  const dimen = Dimensions.get('window');
  if(!Platform.isPad && !Platform.isTVOS && ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))) {
    STATUS_BAR_HEIGHT = 44;
  }
  else {
    STATUS_BAR_HEIGHT = 20;
  }
}

export const Dimension = {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  statusBarHeight: STATUS_BAR_HEIGHT
}