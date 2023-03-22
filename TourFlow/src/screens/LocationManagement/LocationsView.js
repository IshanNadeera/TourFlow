import React, { useState } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';


const Location = ({navigation}) => {

    const image = require("../../../img/back_location.jpeg");
    const searchIcon = require('../../../img/search.png');
    const closeIcon = require('../../../img/close.png');

    const [search, setSearch] = useState('');

    const data = [
        {
            'location_id' : '1',
            'location_name' : "Little Adam's Peak",
            'location_address' : 'Ella',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_9675-2-1024x684.jpg.webp'
        },
        {
            'location_id' : '2',
            'location_name' : 'Lipton Seat',
            'location_address' : 'Haputale',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_9285-Pano-1024x501.jpg.webp'
        },
        {
            'location_id' : '3',
            'location_name' : 'Pidurangala',
            'location_address' : 'Sigiriya',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_0299-1-1024x684.jpg.webp'
        },
        {
            'location_id' : '4',
            'location_name' : 'Sigiriya Rock Fortress',
            'location_address' : 'Sigiriya',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2020/04/Depositphotos_88178998_XL-1024x683.jpg.webp'
        },
        {
            'location_id' : '5',
            'location_name' : 'Fort Frederick',
            'location_address' : 'Trincomalee',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_0116.jpg.webp'
        },
        {
            'location_id' : '6',
            'location_name' : 'Secret Beach',
            'location_address' : 'Mirissa',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/04/DSC_8786-1024x684.jpg.webp'
        }
    ];

    const LocationItem = ({ id, name, city, url}) => (
        <TouchableNativeFeedback>
            <View style={styles.container1}>
                <Image style={styles.image} src={url} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Lottie style={{width: '10%', marginBottom: 10}} source={require('../../../img/location-loading.json')} autoPlay loop />
                    <Text style={styles.simpletext}>{city}</Text>
                </View>
                <Lottie style={{position: 'absolute', width: '35%', alignSelf:'flex-end', bottom:-10}} source={require('../../../img/heart-button.json')} autoPlay loop />
            </View>
        </TouchableNativeFeedback>
    );

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.topView}>
                <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
                    <View style={styles.imageContent}>
                        <Text style={{color:Colors.mainColor2, fontSize: 28, fontWeight:'bold'}}>Hi Ishan</Text>
                        <Text style={{color:Colors.fontColor2, fontSize: 40, fontWeight:'bold'}}>Where do you want to go?</Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.bottomView}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search locations from here..."
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity>
                        <Image source= {search == '' ? searchIcon : closeIcon}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                top: 10,
                                right: 10,
                                tintColor: Colors.mainColor1
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.locationContainer}>
                    <FlatList
                        contentContainerStyle={{padding:5}}
                        removeClippedSubviews={true}
                        data={data}
                        renderItem={({item}) =>
                            <LocationItem
                                id={item.location_id}
                                name={item.location_name}
                                city={item.location_address}
                                url={item.location_url}
                            />
                        }
                        keyExtractor={(item) => item.location_id}
                        initialNumToRender={5}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Location;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    topView:{
        flex : 1,
    },

    imageBg: {
        flex: 1,
        justifyContent: 'center',
    },

    imageContent: {
        backgroundColor: 'rgba(0,0,0,.5)', 
        flex:1,
        padding: 30,
        justifyContent: 'center'
    },

    bottomView: {
        flex: 3,
        backgroundColor: 'white',
    },

    searchContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        paddingLeft: 15,
        margin: 10,
        borderRadius: 15,
        borderColor: Colors.mainColor2,
    },

    locationContainer: {
        flex: 6,
        // backgroundColor: Colors.mainColor1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: '18%'
    },

    textInput:{
        flex:1
    },

    image : {
        width : '100%',
        height : '70%',
        borderRadius : 15,
        resizeMode: 'cover'
    },
    
    textContainer : {
        flex : 1,
        alignItems : 'center',
        flexDirection : 'row',
        left: 20
    },

    text : {
        fontWeight : 'bold',
        fontSize : 20,
        color : Colors.fontColor1
    },

    container1: {
        width : '100%',
        height : 220,
        marginVertical : 10,
        borderRadius : 15,
        backgroundColor : '#FFF',
        borderColor: '#000',
        borderWidth: 0,
        elevation:6,
        paddingBottom: 10
    },

    simpletext : {
        fontSize : 18,
        color: Colors.fontColor1
    },
});