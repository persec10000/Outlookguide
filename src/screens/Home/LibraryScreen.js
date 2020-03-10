import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import {Images} from '../../themes';
import {Footer} from 'native-base';
import {withNavigationFocus} from 'react-navigation';
const DATA = [
  {
    foldername: 'Root',
  },
];

const OfferItem = props => {
  const {item} = props;
  return (
    <View style={styles.uperCard}>
      <TouchableOpacity onPress={() => props.nextPage(item.foldername)}>
        <View style={styles.uperCardChild}>
          <Image source={Images.folder} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>{item.foldername}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: '#000',
          marginLeft: 7,
          marginRight: 7,
        }}
      />
    </View>
  );
};
class LibraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuide: null,
      switchOn2: false.Icon,
      ismount: false,
      searchtrue: false,
      text: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({ismount: true});
      Orientation.lockToPortrait();
    });
    this.didblurListener = this.props.navigation.addListener('didBlur', () => {
      this.setState({ismount: false});
    });
  }
  back = () => {
    this.props.navigation.goBack();
  };
  search(text) {
    this.setState({searchtrue: true, text: text});
    // const { dataSource } = this.state;
    // var text1 = text;
    // var array = [], array1 = [];
    // var i = 0;
    // for (i; i < dataSource.length; i++) {
    //     if (dataSource[i].RepositoryName.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
    //         array1.push(dataSource[i]);
    //     }
    // }
    // this.setState({ newdataSource: array1 })
  }
  nextPage = foldername => {
    this.props.navigation.navigate('SubLibrary', {foldername: foldername});
  };
  _renderItem = ({item}) => {
    return (
      <OfferItem
        item={item}
        nextPage={this.nextPage}
        navigation={this.props.navigation}
      />
    );
  };
  _keyExtractor = (item, index) => {
    return index.toString();
  };
  render() {
    const {ismount} = this.state;
    if (!ismount) {
      return <></>;
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          {/* <Header type="back" title="Library/Folder1" navigation={this.props.navigation}/> */}
          <View style={styles.centerlogo}>
            <Image source={Images.applogo} />
          </View>
          <View style={styles.label}>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#FFF'}}>
              Library
            </Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            showsVerticalScrollIndicator={false}
            style={{flex: 1, marginBottom: 80}}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.showActionSheet2}
              style={{
                alignItems: 'center',
                position: 'absolute',
                left: 10,
                flexDirection: 'row',
              }}>
              <Image
                source={Images.sort}
                style={{width: 30, height: 30, tintColor: '#000'}}
              />
              <Text style={styles.footerSort}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.Upload()}
              style={{
                alignItems: 'center',
                position: 'absolute',
                right: 10,
                flexDirection: 'row',
              }}>
              <Text style={styles.footerUpload}>Upload</Text>
              <Image source={Images.upload} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>
          <View style={styles.home}>
            <GradientButton label="home" _onPress={this.back} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  centerlogo: {
    position: 'absolute',
    left: 0,
    top: -20,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  itemIcon: {
    width: 25,
    height: 25,
  },
  itemText: {
    marginLeft: 20,
    fontSize: 14,
  },
  uperCardChild: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    // marginVertical:5,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  uperCard: {
    marginTop: 2,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginBottom: 2,
  },
  label: {
    backgroundColor: '#E8222B',
    width: '100%',
    height: 50,
    marginTop: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: 50,
    bottom: 70,
  },
  footerSort: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  footerUpload: {
    marginRight: 5,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  home: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  }
});

export default withNavigationFocus(LibraryScreen);
