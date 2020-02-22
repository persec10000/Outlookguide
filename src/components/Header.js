import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {Header as NBHeader, Right} from "native-base";
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../themes';

const Header = (props) => {
	const {type , title} = props;
	const buttons = {
		menu: (
	        <TouchableOpacity
	            onPress={() => props.navigation.toggleDrawer()}>
	            <Image
	                source={Images.menu}
	                style={styles.image}
	            />
	        </TouchableOpacity>
		),
		back: (
	        <TouchableOpacity>
	            {/* onPress={() => props.navigation.goBack(null)}> */}
	            <Image
	                source={Images.applogo}
	                style={styles.image}
	            />
	        </TouchableOpacity>
		)
	};
	const button = buttons[type];
	return (
		<NBHeader
			hasTabs
			style={{ backgroundColor: "#FFF", justifyContent: 'center', padding: 0, margin: 0 }}
			androidStatusBarColor="#053A59"
			iosBarStyle="light-content"
		>
			<LinearGradient
				style={styles.container}
				// start={{x: 0.0, y: 0.6}} end={{x: 1.0, y: 1.0}}
				colors={['#159AF9', '#0C5487']}
			>
				{button}
				<Text numberOfLines={1} style={styles.title}>{title}</Text>
			</LinearGradient>
		</NBHeader>
	);
};

const styles = ScaledSheet.create({
	container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
				alignItems: 'center',
        // justifyContent: 'center',
        // margin: 0,
        // padding: 0
	},
	image: {
		width: '110@ms0.3',
		height: '80@ms0.3',
	},
	title: {
		fontWeight: 'bold',
		color: "#FFF",
		fontSize: '20@ms0.1',
		marginLeft: 20,
		width:'230@ms0.3',

	}
});

export default Header;
