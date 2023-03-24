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
            'location_url' : 'https://withlocals-com-res.cloudinary.com/image/upload/w_450,h_300,c_fill,g_faces,q_auto,dpr_3.0,f_auto/c122dbf78d303f75cbe19005f0262a90'
        },
        {
            'guide_id' : '2',
            'location_name' : 'Lipton Seat',
            'city' : "Lipton Seat",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://withlocals-com-res.cloudinary.com/image/upload/w_450,h_300,c_fill,g_faces,q_auto,dpr_3.0,f_auto/8231572242a18673640a51a3ac98eda5'
        },
        {
            'guide_id' : '3',
            'location_name' : 'Pidurangala',
            'city' : "Pidurangala",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://withlocals-com-res.cloudinary.com/image/upload/w_450,h_300,c_fill,g_faces,q_auto,dpr_3.0,f_auto/974b01697f654849b4f2d24e869f0870'
        },
        {
            'guide_id' : '4',
            'location_name' : 'Sigiriya Rock Fortress',
            'guide_name' : 'Siriwardana',
            'city' : "Sigiriya",
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://destinationlesstravel.com/wp-content/uploads/2020/04/Depositphotos_88178998_XL-1024x683.jpg.webp'
        },
        {
            'guide_id' : '5',
            'location_name' : 'Fort Frederick',
            'city' : "Galle",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://withlocals-com-res.cloudinary.com/image/upload/w_450,h_300,c_fill,g_faces,q_auto,dpr_3.0,f_auto/2ca4de4fc87d849e39772f6df4b612e4'
        },
        {
            'guide_id' : '6',
            'location_name' : 'Secret Beach',
            'city' : "Unawatuna",
            'guide_name' : 'Siriwardana',
            'age':'30',
            'language':'English',
            'phone' : '0776738388',
            'location_url' : 'https://withlocals-com-res.cloudinary.com/image/upload/w_450,h_300,c_fill,g_faces,q_auto,dpr_3.0,f_auto/8231572242a18673640a51a3ac98eda5'
        }
    ];

    const onPressGuide = (id, name, city, url, location, phone, language, age) => {
        navigation.navigate('GuideSingle', {
            id: id, 
            name: name, 
            age:age,
            city: city, 
            location:location, 
            phone:phone, 
            url:url, 
            language:language
        });
    }

    const onPressAdd = () => {
        navigation.navigate('AddGuide');
    }

    const LocationItem = ({ id, name, city, language, phone, url, age, location }) => (
        <TouchableNativeFeedback onPress={ () => { onPressGuide(id, name, city, url, location, phone, language, age) }}>
            <View style={styles.container1}>
                <View style={styles.guideView}>
                    <Image style={styles.image} src={url} />
                <View style={{left:10}}>
                <Text style={{fontSize:15, fontWeight:'bold', fontSize:20}}>{name}</Text>
                    <Text style={{fontSize:15}}>{language}</Text>
                    <Text style={{fontSize:15}}>{phone}</Text>
                    <Text style={{fontSize:15}}>age : {age}</Text>
                </View>

                </View>
                <View style={styles.textContainer}>
                    <Lottie style={{width: '8%', marginBottom: 7}} source={require('../../../img/location-loading.json')} autoPlay loop />
                    <Text style={styles.simpletext}>{city}</Text>
                </View>
                <Lottie style={{position: 'absolute', width: '60%', alignSelf:'flex-end', bottom:0, right:5 }} source={require('../../../img/5s.json')} autoPlay loop />

            </View>
        </TouchableNativeFeedback>
    );

    return(
        <SafeAreaView style={styles.container}>

        <View style={styles.topView}>
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    {/* <Text style = {{fontSize:40, fontWeight: 'bold', color: Colors.mainColor1, marginTop: 10, marginLeft: 10}}>Tour</Text> */}
                    <Text style = {{fontSize:30, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 10, marginLeft: 10}}> Choose Your Guide</Text>
                </View>
                <Lottie style={{width: '100%'}} source={require('../../../img/guide.json')} autoPlay loop />
            </View>
            <TouchableOpacity
                        onPress={ () => { onPressAdd() }}
                        style={{
                            width : 70,
                            height : 70,
                            resizeMode: 'cover',
                            position: 'absolute',
                            zIndex: 100,
                            bottom: 10,
                            right: 10,
                            top:60,
                            backgroundColor: 'rgba(255, 255, 255,.7)',
                            borderRadius: 50,
                            borderColor: 'grey',
                            borderWidth: 1
                        }}>
                    
                        <Lottie style={{width: '100%'}} source={require('../../../img/addGuide.json')} autoPlay loop />

                    </TouchableOpacity>
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
                            language={item.language}
                            phone={item.phone}
                            url={item.location_url}
                            age={item.age}
                            location={item.location_name}
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
        marginBottom: '18%',
        // flexDirection: 'row',
    },

    textInput:{
        flex:1
    },

    image : {
        width : '40%',
        height : '100%',
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
        height : 150,
        marginVertical : 10,
        borderRadius : 15,
        backgroundColor : '#FFF',
        borderColor: '#000',
        borderWidth: 0,
        elevation:6,
        paddingBottom: 10,
        
    },

    guideView : {
        flexDirection : 'row',
        padding:10
        // left: 20
    },

    simpletext : {
        fontSize : 18,
        color: Colors.fontColor1
    },


});