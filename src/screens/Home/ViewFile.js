import React from "react"
import {
    Image,
    View,
    StyleSheet,
    Dimensions,
    Platform,
    AsyncStorage,
    ToastAndroid,
    AlertIOS,
    Text,
    TouchableHighlight,
    PermissionsAndroid,
    TextInput
} from 'react-native';
import GradientButton from '../../components/GradientButton'
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import {Images} from '../../themes';
import {Header} from '../../components';
let res;
export default class ViewFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            show :false,
            isfocus: false
        };
        this.pdf = null;
    }
    async componentDidMount () {
        UserID = await AsyncStorage.getItem('ID');
        UserEmailID = await AsyncStorage.getItem('EmailID');
        { this.setState({ paused: !this.state.paused }) }
        this.check_permission();
    }
    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({ page: prePage });
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.setState({ page: nextPage });
    };

    zoomOut = () => {
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({ scale: scale });
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({ scale: scale });
    };

    switchHorizontal = () => {
        this.setState({ horizontal: !this.state.horizontal, page: this.state.page });
    };
    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }
    
    check_permission = () => {
        let that = this
        async function Permission() {
            //Calling the permission function
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'AndoridPermission download Permission',
                message: 'AndoridPermission App needs access to your download',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              that.openFile();
            } else {
              alert('WRITE_EXTERNAL_STORAGE Permission Denied.');
            }
          }
          if (Platform.OS === 'android') {
            Permission();
          } else {
            this.openFile();
          }
    }
    back = () => {
        this.props.navigation.goBack();
    }
    openFile = async() => {
        // let dirs = RNFetchBlob.fs.dirs;
        // const mimetype = mime.lookup(params.DocumentGuid);
        // RNFetchBlob.config({
        //     fileCache : true,
        //     appendExt : 'pdf',
        //     path : dirs.DocumentDir +'/'+params.DocumentGuid
        // })
        // .fetch('GET', `${api.View_URL}`, {
        // })
        // .then((res) => {
        //     console.log('The file saved to ', res)
        //     setTimeout(() => {
        //         this.setState({ isLoading: false ,LoadingDialog:false, path: res.data, show :true})
        //     }, 3000);
        // })
    }
    validate = () => {
        this.setState({isfocus: false})
        if (this.state.pageStr !== 0){
            this.setState({page: this.state.pageStr})
        }
    }
    focus = () => {
        this.setState({isfocus: true})
    }
    onChangePage = (text) => {
        this.setState({pageStr: parseInt(text)})
    }
    render() {
        // console.log("dir===>",RNFS.ExternalStorageDirectoryPath,this.state.page);
        const source = require('../../resources/test.pdf');
        return (
            <View style={{flex: 1}}>
                {/* <Header type="back" title="View File" navigation={this.props.navigation}/> */}
                <View style={styles.centerlogo}>
                    <Image source={Images.applogo}/>
                </View>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight disabled={this.state.page === 1}
                            style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                            onPress={() => this.prePage()}>
                            <Text style={styles.btnText}>{'-'}</Text>
                        </TouchableHighlight>
                        <TextInput 
                            style={{paddingVertical: 0,textAlign:'center'}}
                            placeholder="1"
                            keyboardType="numeric"
                            onFocus={this.focus}
                            onBlur={e => this.validate()}
                            placeholderTextColor="#707070"
                            onChangeText={(text)=>this.onChangePage(text)}
                            value={!this.state.isfocus&&this.state.page.toString()}
                        />
                        <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                            style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                            onPress={() => this.nextPage()}>
                            <Text style={styles.btnText}>{'+'}</Text>
                        </TouchableHighlight>
                        <GradientButton
                          label="read"
                          _onPress={this.submit}
                          buttonsize={{width:80,height:30}}
                          margin = {{marginTop: 0, justifyContent:'center', marginLeft: 50}}
                        />
                    </View>
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                        // source={{uri:this.state.path}}
                        source = {source}
                        page={this.state.page}
                        scale={this.state.scale}
                        horizontal={this.state.horizontal}
                        onLoadComplete={(numberOfPages, filePath) => {
                            this.state.numberOfPages = numberOfPages; //do not use setState, it will cause re-render
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            this.state.page = page; //do not use setState, it will cause re-render
                        }}
                        onError={(error) => {
                            this.setState({ LoadingDialog: false }, () => {
                                Platform.select({
                                    ios: () => { AlertIOS.alert("File not in PDF format or corrupted."); },
                                    android: () => { ToastAndroid.show("File not in PDF format or corrupted.", ToastAndroid.SHORT); }
                                })();
                            });
                        }}
                        style={styles.pdf} />
                </View>
                <View style={{position:'absolute', bottom: 10, left:0, right:0, alignItems: 'center'}}>
                    <GradientButton
                        label="exit"
                        _onPress={this.back}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 85, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerlogo: {
        position: 'absolute',
		left: 0,
        top: -20,
        right: 0,
        bottom: 0,
        alignItems: 'center'
    },
    btn: {
        margin: 2,
        padding: 2,
        backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});