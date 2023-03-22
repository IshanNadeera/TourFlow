import React, { useState } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';

const LocationSingle = ({navigation, route}) => {

    const location_id = route.params.id;
    const location_name = route.params.name;
    const location_city = route.params.city;
    const location_url = route.params.url;

    const image = location_url;
    const backIcon = require('../../../img/go-back.png');

    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
                style={{
                    width : '100%',
                    height : '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                    zIndex: 100,
                    top: 10,
                    left: 10
                }}>
                    
                <Image source={backIcon} style={{ width : '10%', height : '6%',}}/>

            </TouchableOpacity>

            <View style={styles.topSection}>
                <ImageBackground src={image} resizeMode="cover" style={styles.image}>
                    
                </ImageBackground>
            </View>
            <View style={styles.bottomSection}>

                <View style={styles.header}>
                    <Text style={{fontSize: 35, color:Colors.mainColor2, fontWeight: 'bold', flex:2}}>{location_name}</Text>
                    <Lottie style={{width: '12%'}} source={require('../../../img/heart-button.json')} autoPlay loop />
                </View>

                <View style={styles.details}>
                    <Lottie style={{width: '10%', bottom: 5}} source={require('../../../img/location-loading.json')} autoPlay loop />
                    <Text style={{fontSize: 20, color:Colors.fontColor1}}>{location_city}</Text>
                </View>

                <View style={styles.tabView}>
                    
                </View>

            </View>
        </SafeAreaView>
    )
}

export default LocationSingle;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    topSection: {
        flex:1,
    },

    bottomSection: {
        flex:1,
        backgroundColor : Colors.fontColor2
    },

    image : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        resizeMode: 'cover'
    },

    header: {
        flex : 1,
        padding: 5,
        marginLeft:10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },

    details: {
        flex : 1,
        padding: 5,
        flexDirection: 'row',
    },

    tabView: {
        flex : 8,
        backgroundColor : Colors.mainColor1
    }

})