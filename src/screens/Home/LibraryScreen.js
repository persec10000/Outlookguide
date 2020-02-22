import React, { Component} from 'react'
import { View, Text, StyleSheet,Image,FlatList, ImageBackground,TouchableOpacity, TextInput, Platform, AlertIOS, ToastAndroid, BackHandler } from 'react-native'
import Orientation from 'react-native-orientation-locker';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import Icon from 'react-native-vector-icons/Octicons';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import {ScaledSheet} from 'react-native-size-matters';
import {Images} from '../../themes'
import { withNavigationFocus } from 'react-navigation';
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
    // const { supplierName, from, to, time, cost, currency } = props.item
    return(
        <View style={styles.uperCard}>
            <TouchableOpacity onPress={()=>props.nextPage()}>
                <View style={styles.uperCardChild}>
                    <Image
                        source={Images.folder}
                        style={styles.itemIcon} />
                    <View>
                        <Text style={styles.itemText}>Library</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#000', marginLeft: 7, marginRight: 7 }} />
        </View>
    )
}
class LibraryScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            isGuide: null,
            switchOn2: false.Icon,
            ismount: false,
            searchtrue: false,
            text: ''
        }
    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.setState({ismount:true});
            Orientation.lockToPortrait();
        });
        this.didblurListener = this.props.navigation.addListener("didBlur", () => {
            this.setState({ismount:false});
        });
    }
    back = () => {
        this.props.navigation.goBack();
    }
    search(text) {
        this.setState({ searchtrue: true , text:text })
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
    nextPage = () => {
        this.props.navigation.navigate('SubLibrary');
    }
    _renderItem = ({ item }) =>  {
        return <OfferItem item={item} nextPage={this.nextPage} navigation={this.props.navigation}/>
    }
    _keyExtractor = (item, index) => { return index.toString() }
    render() {
        const {ismount} = this.state;
        // Orientation.lockToPortrait();
        if (!ismount){
            return( 
                <>
                </>
            )
        }
        else {
            return (
            <View style={{flex: 1}}>
                <Header type="back" title="Outlookguide" navigation={this.props.navigation}/>
                <View style={styles.searchView}>
                    <Image style={styles.searchIcon} 
                         source={Images.search} />
                    <TextInput
                        placeholder={"Search Repository"}//placeholder={"Document Name"}
                        placeholderTextColor="lightgray"
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.search(text)}
                        returnKeyType={'go'}
                        value={this.state.text}
                        // onFocus={() => this.setState({ focus:this.state.focus })}
                        style={styles.searchInput}
                        textColor="#fff" />
                    { this.state.searchtrue &&
                    <TouchableOpacity style={{ position: "absolute", right: 5, top:15, alignItems: 'center', marginRight: 10, width: 25, height: 25}}
                        onPress={() => this.setState({searchtrue :false, text:"", focus:false}) }>
                        <Image style={{ width: 15, height: 15, tintColor:"white" }} 
                            source={Images.cancel} 
                        />
                    </TouchableOpacity>
                    }
                </View>
                <FlatList 
                    data={DATA}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1,marginBottom: 80}}
                />
                <View style={{position:'absolute', bottom: 10, left:0, right:0, alignItems: 'center'}}>
                    <GradientButton
                        label="back"
                        _onPress={this.back}
                    />
                </View>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent:'center',
        width: 54, 
        height: 54, 
        marginHorizontal: 30,
        borderRadius: 27,
        transform: [
            {scaleX: 2}
        ],
        backgroundColor:'white',
        opacity: 0.7
    },
    itemIcon: {
        width: 25,
        height: 25,
    },
    itemText: {
        marginLeft: 20,
        fontSize: 14,
    },
    feedback: {
        width: 240, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor:'white',
        opacity: 0.7, 
        position:'absolute', 
        bottom: 20, 
        alignItems: 'center',
        justifyContent: 'center'
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
    searchIcon: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        marginLeft: 15,
    },
    searchInput: {
        marginLeft: 18,
        marginRight: 40,
        fontSize: 14,
        color: '#FFF',
        width: '100%',
    },
})

export default withNavigationFocus(LibraryScreen);
