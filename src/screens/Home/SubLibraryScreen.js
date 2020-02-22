import React, { Component } from "react"
import {
    Image,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    BackHandler,
    Alert,
} from "react-native";
import {Text,Footer} from "native-base";
// var SQLite = require('react-native-sqlite-storage');
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import {Images} from '../../themes';
import {FiletypeIcon, ActionSheet, Header} from '../../components';
import Toast, {DURATION} from 'react-native-easy-toast';    
import GradientButton from '../../components/GradientButton';

// const db = SQLite.openDatabase("virtualdata.db", "1.0", "virtualdata Database", 200000);
let DownloadRole, UploadRole, ViewRole, MoveCopyRole;
const CANCEL_INDEX1 = 0
const DESTRUCTIVE_INDEX1 = 4
const CANCEL_INDEX2 = 0
const DESTRUCTIVE_INDEX2 = 4

const title1 = <Text style={{ color: 'crimson', fontSize: moderateScale(18, 0.3) }}>Select action</Text>
const title2 = <Text style={{ color: '#000', fontSize: moderateScale(18, 0.3), textAlign: 'center' }}>Sort By</Text>
let self = null;
let options1
const DATA = [
  {
      supplierName: 'Jane Dou'
  },
  {
      supplierName: 'Jone Dou'
  },
  {
      supplierName: 'Johe Dou'
  },
  {
      supplierName: 'Jae Dou'
  },
  {
      supplierName: 'Jeoh Dou'
  },
  {
      supplierName: 'Jane Dou'
  },
  {
      supplierName: 'Jane Dou'
  },
  {
      supplierName: 'Jane Dou'
  },
  {
      supplierName: 'Jane Dou'
  },
]
const OfferItem = props => {
  return(
    <View style={styles.uperCard}>
      <View style={styles.uperCardChild}>
              <FiletypeIcon
                  // extention={item.DocumentType}
                  style={styles.listIcon}
              />
              <View>
                  <Text style={styles.itemText}>PDF</Text>
              </View>      
              <TouchableOpacity onPress={() => props.onCheckBoxPress()}
                  style={styles.itemActions}>
                  <Image
                      source={Images.blackmenu}
                      style={styles.listIcon} />
              </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: '#000', marginLeft: 5, marginRight: 5 }} />
    </View>
  )
}
export default class SubLibraryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkbox: false,
            isLoading: true,
            message: {},
            noData: false,
            searchtrue: false,
            ascSize: false,
            descSize: false,
            ascModified: false,
            descModified: false,
            ascType: false,
            descType: false,
            value: 1,
            LoadingDialog: true,
            focus: false,
            itemUrl: null
        };
        this.focus = false
        this.timer = null;
        self = this;
    }
    
    componentWillUnmount() {
        this.focusListener.remove()
        this.blurListener.remove()
    }

    async componentDidMount() {
    }

    SortBy(prop, inascSizeOrder) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return inascSizeOrder === 1 ? 1 : -1; //  in case to show  large to small order in case of integer
                //return 1;
            } else if (a[prop] < b[prop]) {
                return inascSizeOrder === 1 ? -1 : 1;
                //return -1;
            }
            return 0;
        }
    }

    latestUse() {
       
    }
    FileType() {
      
    }
    LastModified() {
     
    }
    actionSheetfunction(index) {
        const role = options1[index].role
        switch (role) {
          case 'view': this.viewFile(); break
          case 'delete': this.moveItem(); break
          case 'rename': this.copyItem(); break
          case 'remove': this.add(); break
        }
    }
    actionSheetfunction2(index) {
        if (index == 1) {
            this.latestUse()
            this.setState({ isLoading: true, LoadingDialog: true})
        }
        if (index == 2) {
            this.FileType();
            this.setState({ isLoading: true, LoadingDialog: true})
        }
        if (index == 3) {
            this.LastModified();
            this.setState({ isLoading: true,  LoadingDialog: true})
        }
        if (index == 4) {
            this.setState({ isLoading: true, LoadingDialog: true})
        }
    }

    async Upload() {
    }

    async UploadFile(res) {
    }

    //actionSheet start//
    showActionSheet1 = () => this.actionSheet1.show()
    getActionSheetRef1 = ref => (this.actionSheet1 = ref)
    handlePress1 = index => this.actionSheetfunction(index)
    //actionSheet end//

    //actionSheet start//
    showActionSheet2 = () => this.actionSheet2.show()
    getActionSheetRef2 = ref => (this.actionSheet2 = ref)
    handlePress2 = index => this.actionSheetfunction2(index)
    //actionSheet end//



    onCheckBoxPress = () => {
        // tempData = item;       
        this.actionSheet1.show()
    }

    viewFile = async() => {
        const item = this.state;
        this.props.navigation.navigate('ViewFile');       
    }
    async add() {
    }
    async copyItem() {
    }
    async moveItem() {
    }
    askDelete() {
      Alert.alert(
        global.__APP_NAME__,
        'Are you sure you want to exit?',
        [
            { text: 'Cancel', onPress: ()=>{
              this.setState({ isLoading: false, LoadingDialog: false})
            }},
            { text: 'OK', onPress: ()=>{
              this.deleteItem();
            }},
        ],
        { cancelable: false }
      )
      return true;
    }

    deleteItem() {
        this.setState({ isLoading: true, LoadingDialog: true })       
    }

    search(text) {
        this.setState({ searchtrue: true , text:text})
    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.goBack(null)
        return true;
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.focus = true
        });
        this.blurListener = this.props.navigation.addListener("didBlur", () => {
            this.focus = false
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);      
    }
   
    _renderItem = ({ item }) =>  {
      return <OfferItem item={item} onCheckBoxPress={this.onCheckBoxPress} navigation={this.props.navigation}/>
    }

    _keyExtractor = (item, index) => {return index.toString()}
    back = () => {
        this.props.navigation.goBack();
    }
    render() {
      options1 = [
          'Cancel',
          {
            component: 
            <View style={styles.options1Row}>
                <Image
                    source={Images.view}
                    style={{ width: 25, height: 25, tintColor: '#000', marginRight: 10 }} />
                <Text style={styles.options1Text}>view</Text>
            </View >,
            role: 'view',
            height: 40,
          },
          {
            component: 
            <View style={styles.options1Row}>
                <Image
                    source={Images.blackdelete}
                    style={{ width: 25, height: 25,tintColor: '#000', marginRight: 10 }} />
                <Text style={styles.options1Text}>delete</Text>
            </View>,
            role: 'delete',
            height: 40,
          },
          {
            component:
            <View style={styles.options1Row}>
                <Image
                    source={Images.rename}
                    style={{ width: 25, height: 25,tintColor: '#000', marginRight: 10 }} />
                <Text style={styles.options1Text}>rename</Text>
            </View >,
            role: 'rename',
            height: 40,
          },
          {
            component:
            <View style={styles.options1Row}>
                <Image
                    source={Images.remove}
                    style={{ width: 25, height: 25,tintColor: '#000', marginRight: 10 }} />
                <Text style={styles.options1Text}>remove</Text>
            </View >,
            role: 'remove',
            height: 40,
          },
        ]
    console.log("value==",options1[2])
        const options2 = [
            'Cancel',
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>File Size</Text>
                </View >,
                height: 40,
            },
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>File Type</Text>
                </View >,
                height: 40,
            },
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>Last Modified</Text>
                </View >,
                height: 40,
            }, {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>Reset</Text>
                </View >,
                height: 40,
            },
        ]
        return (          
            <View style={styles.container}>
                <Header type="back" title='Folder' navigation={this.props.navigation}/>
                <View style={styles.searchView}>
                    <Image style={styles.searchIcon}
                            source={Images.search} />
                    <TextInput
                        placeholder={"Search File"}
                        placeholderTextColor="lightgray"
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.search(text)}
                        returnKeyType={'go'}
                        value={this.state.text}
                        onFocus={() => this.setState({ focus:this.state.focus })}
                        style={styles.searchInput}
                        textColor="#fff" />
                    {/* { this.state.searchtrue &&
                    <TouchableOpacity style={{ position: "absolute", right: 5,marginTop:10, alignItems: 'center', marginRight: 10, width: 25, height: 25}}
                        onPress={() => this.setState({searchtrue :false, text:"", focus:false}) }>
                        <Image style={{ width: 15, height: 15, tintColor:"white" }} 
                            source={Images.cancel} 
                        />
                    </TouchableOpacity>
                    } */}
                </View>
                {/* {this.state.noData == true &&
                    <View style={{ justifyContent: "center", alignItems: "center", alignContent: 'center' }} >
                        <Text style={{ marginLeft: 20, fontWeight: 'bold', color: "#fff", fontSize: 15, textAlign: 'center' }}>
                            This Folder is empty
                    </Text>
                    </View>
                } */}
                  <FlatList 
                      data={DATA}
                      renderItem={this._renderItem}
                      keyExtractor={this._keyExtractor}
                      showsVerticalScrollIndicator={false}
                      // scrollEnabled={true}
                      style={{marginBottom: 80}}
                  />
                  <ActionSheet
                      ref={this.getActionSheetRef1}
                      title={title1}
                      options={options1}
                      cancelButtonIndex={CANCEL_INDEX1}
                      destructiveButtonIndex={DESTRUCTIVE_INDEX1}
                      onPress={this.handlePress1}
                  />
                  <ActionSheet
                      ref={this.getActionSheetRef2}
                      title={title2}
                      options={options2}
                      cancelButtonIndex={CANCEL_INDEX2}
                      destructiveButtonIndex={DESTRUCTIVE_INDEX2}
                      onPress={this.handlePress2}
                  /> 
                <Footer style={styles.footer}>
                    <View
                        style={{ width: '100%', backgroundColor: "#CDD0D3", flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.showActionSheet2}
                            style={{ alignItems: 'center', position: "absolute", left: 10, flexDirection: 'row' }}>
                            <Image source={Images.sort} style={{ width: 30, height: 30, tintColor: '#000' }} />
                            <Text style={styles.footerSort}>Sort</Text>
                        </TouchableOpacity>
                        <View style={{position:'absolute',left:0,right:0,bottom:5, alignItems:'center',}}>
                            <GradientButton
                                label="back"
                                _onPress={this.back}
                                buttonsize={{width:150,height:40}}
                            />
                         </View>
                        <TouchableOpacity onPress={() => this.Upload()} style={{ alignItems: 'center', position: "absolute", right: 10, flexDirection: 'row' }}>
                            <Text style={styles.footerUpload}>Upload</Text>
                            <Image source={Images.upload} style={{ width: 30, height: 30, }} />
                        </TouchableOpacity>
                    </View>
                </Footer>
                <Toast ref="toast"/>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFF'
    }, 
    itemIcon: {
        width: '25@ms',
        height: '25@ms',
    },
    listIcon: {
        width: '25@ms',
        height: '25@ms',
    },
    uperCardChild: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        // marginVertical:5,
        paddingVertical:15,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    uperCard: {
        marginTop: 2,
        backgroundColor: 'transparent',
        borderRadius: 5,
        marginBottom: 2
    },
    searchView: {
        backgroundColor: '#333333',
        width: '100%',
        height: 60, 
        marginTop: 3, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        height: 50,
        bottom: 0,
        backgroundColor: "#000"
    },
    itemText: {
        marginLeft: '20@ms',
        color: '#000',
        fontSize: '14@ms',
    },
    itemActions: {
        position: "absolute",
        right: 2,
        alignItems: 'center',
        width: '25@ms',
        height: '25@ms'
    },
    searchIcon: {
        resizeMode: "contain",
        width: '25@ms',
        height: '25@ms',
        marginLeft: '15@ms',
    },
    searchInput: {
        marginLeft: '18@ms',
        marginRight: 40,
        fontSize: '14@ms',
        color: '#FFF',
        width: '100%',
    },
    footerSort: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: "#000",
        fontSize: '15@ms',
    },
    footerUpload: {
        marginRight: 5,
        fontWeight: 'bold',
        color: "#000",
        fontSize: '15@ms',
    },
    options1Text: {
        color: 'blueviolet',
        fontSize: '18@ms0.3',
    },
    options1Row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: '38%',
    },
    options2Text: {
        marginLeft: 2,
        color: 'grey',
        fontSize: '18@ms0.3',
    },
    options2Row: {
        position: 'absolute',
        alignItems: 'center',
        left: 20,
        flexDirection: "row"
    },
});

