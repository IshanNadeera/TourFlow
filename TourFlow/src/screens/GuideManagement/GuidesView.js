import React, { useState } from "react";
import {TouchableNativeFeedback, FlatList, ImageBackground, View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image,  } from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';


const Guide = ({navigation}) => {
    const searchIcon = require('../../../img/search.png');
    const [search, setSearch] = useState('');

    const data = [
        {
            'guide_id' : '1',
            'location_name' : "Ella",
            'city' : "Ella",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_9675-2-1024x684.jpg.webp'
        },
        {
            'guide_id' : '2',
            'location_name' : 'Lipton Seat',
            'city' : "Ella",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_9285-Pano-1024x501.jpg.webp'
        },
        {
            'guide_id' : '3',
            'location_name' : 'Pidurangala',
            'city' : "Ella",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_0299-1-1024x684.jpg.webp'
        },
        {
            'guide_id' : '4',
            'location_name' : 'Sigiriya Rock Fortress',
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2020/04/Depositphotos_88178998_XL-1024x683.jpg.webp'
        },
        {
            'guide_id' : '5',
            'location_name' : 'Fort Frederick',
            'city' : "Ella",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_0116.jpg.webp'
        },
        {
            'guide_id' : '6',
            'location_name' : 'Secret Beach',
            'city' : "Ella",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2019/04/DSC_8786-1024x684.jpg.webp'
        }
    ];

    const onPressGuide = (id, name, city, url,location,phone,language) => {
        navigation.navigate('GuideSingle', {id: id, name: name, city: city, location:location, phone:phone, url:url, language:language});
    }

    const LocationItem = ({ id, name, city, location, phone, url}) => (
        <TouchableNativeFeedback onPress={ () => { onPressGuide(id, name, city, url) }}>
            <View style={styles.container1}>
                <Image style={styles.image} src={url} />
                {/* <Text style={{textAlign:'right', position: 'absolute', right:20, fontSize:20, fontWeight:'bold' }}>{name}</Text> */}
                <View style={{textAlign:'right', position: 'absolute', right:20, fontSize:20, fontWeight:'bold' }}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={{fontSize:15}}>English, German</Text>
                    <Text style={{fontSize:15}}>{phone}</Text>
                    <Text style={{fontSize:15}}>age : 31</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{city}</Text>
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
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style = {{fontSize:40, fontWeight: 'bold', color: Colors.mainColor1, marginTop: 10, marginLeft: 10}}>Tour</Text>
                    <Text style = {{fontSize:40, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 10, marginLeft: 10}}>Guide</Text>
                </View>
                <Lottie style={{width: '100%'}} source={require('../../../img/guide.json')} autoPlay loop />
            </View>
        </View>

        <View style={styles.bottomView}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search location or Guide from here.."
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
                            id={item.guide_id}
                            name={item.guide_name}
                            city={item.city}
                            location={item.location_name}
                            phone={item.phone}
                            url={item.location_url}
                        />
                    }
                    keyExtractor={(item) => item.guide_id}
                    initialNumToRender={5}
                />
            </View>
        </View>

    </SafeAreaView>
    )
}

export default Guide;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    topView:{
        flex : 2,
    },

    imageBg: {
        flex: 0.3,
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
        width : '50%',
        height : '50%',
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