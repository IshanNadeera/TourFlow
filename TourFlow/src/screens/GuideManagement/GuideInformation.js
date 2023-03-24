import React, { useState } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback, Modal} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';

const GuideInformation = ({navigation, route}) => {

    const location_id = route.params.id;
    const guide_name = route.params.name;
    const city = route.params.city;
    const location_url = route.params.url;
    const location = route.params.location;
    const guide_phone = route.params.phone;
    const guide_language = route.params.language;
    const age = route.params.age;


    const image = location_url;
    const backIcon = require('../../../img/backImage.jpg');
    const navigtionIcon = require('../../../img/navigation.png');

    const [modalVisible, setModalVisible] = useState(false);

    const onPressBack = () => {
        navigation.navigate('Guide')
    }

    const onPressEdit = () => {
        setModalVisible(true);
    }

    const onPressClose = () => {
        setModalVisible(false);
    }

    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
                onPress={ () => { onPressBack() }}
                style={{
                    width : 40,
                    height : 40,
                    resizeMode: 'cover',
                    position: 'absolute',
                    zIndex: 100,
                    top: 10,
                    left: 10
                }}>
                    <Lottie style={{width: '100%', zIndex:10}} source={require('../../../img/back.json')} autoPlay loop />
                    
                {/* <Image source={backIcon} style={{ width : '100%', height : '100%',}}/> */}

            </TouchableOpacity>

            <View style={styles.topSection}>
                <ImageBackground src={image} resizeMode="cover" style={styles.image}>
                    
                </ImageBackground>
            </View>
            <View style={styles.bottomSection}>

                <View style={styles.details}>
                    <Lottie style={{width: '10%', bottom: 5}} source={require('../../../img/location-loading.json')} autoPlay loop />
                    <Text style={{fontSize: 18, color:Colors.fontColor1, fontFamily: 'sans-serif-condensed'}}>{location}</Text>
                    <Image source={navigtionIcon} style={{ width : 25, height : 25, tintColor: Colors.mainColor3, marginLeft:20}}/>
                    <Text style={{fontSize: 18, color:Colors.fontColor1, marginLeft:10, fontFamily: 'sans-serif-condensed'}}>{city}</Text>
                </View>

                <View style={styles.tabView}>
                    <View style={{flex:1, paddingLeft: '5%', justifyContent: 'center', backgroundColor: Colors.fontColor1}}>
                        <Text style={{fontSize: 24, color:Colors.fontColor2, fontWeight: 'bold', fontFamily: 'sans-serif-condensed'}}>{guide_name}</Text>
                <Lottie style={{position: 'absolute', width: '60%', alignSelf:'flex-end', bottom:0, right:5 }} source={require('../../../img/5s.json')} autoPlay loop />
                    </View>
                    <View style={{flex:4, padding:15, backgroundColor: '#E7E7E7', marginHorizontal: 10, marginVertical: 20, borderRadius:15, elevation: 5, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color:Colors.fontColor1, textAlign: 'justify', lineHeight: 27, fontFamily: 'sans-serif-condensed'}}>
                            Name: {guide_name}
                        </Text>
                        <Text style={{fontSize: 18, color:Colors.fontColor1, textAlign: 'justify', lineHeight: 27, fontFamily: 'sans-serif-condensed'}}>
                            Age: {age}
                        </Text>
                        <Text style={{fontSize: 18, color:Colors.fontColor1, textAlign: 'justify', lineHeight: 27, fontFamily: 'sans-serif-condensed'}}>
                            Language: {guide_language}
                        </Text>
                        <Text style={{fontSize: 18, color:Colors.fontColor1, textAlign: 'justify', lineHeight: 27, fontFamily: 'sans-serif-condensed'}}>
                            Phone: {guide_phone}
                        </Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity
                onPress={ () => { onPressEdit() }}
                style={{
                    width : 50,
                    height : 50,
                    resizeMode: 'cover',
                    position: 'absolute',
                    zIndex: 100,
                    bottom: 200,
                    right: 10,
                    backgroundColor: 'rgba(0, 179, 92,.8)',
                    borderRadius: 50
                }}>
                    
                <Lottie style={{width: '100%' }} source={require('../../../img/edit-green.json')} autoPlay loop />

            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:26, color:Colors.fontColor1, fontWeight: 'bold', fontFamily: 'sans-serif-condensed', marginBottom: 10}}>Edit Info</Text>

                        <Lottie style={{width: '20%'}} source={require('../../../img/map-pin-location.json')} autoPlay loop />

                        <Text style={styles.textLabel}>Location Name</Text>
                        <TextInput
                            defaultValue={location}
                            style={styles.input}
                        />
                        <Text style={styles.textLabel}>City</Text>
                        <TextInput
                            defaultValue={city}
                            style={styles.input}
                        />
                        <Text style={styles.textLabel}>Name</Text>
                        <TextInput
                            defaultValue={guide_name}
                            style={styles.input}
                        />
                        <Text style={styles.textLabel}>Language</Text>
                        <TextInput
                            defaultValue={guide_language}
                            style={styles.input}
                        />
                        <Text style={styles.textLabel}>Age</Text>
                        <TextInput
                            defaultValue={age}
                            style={styles.input}
                        />
                        <Text style={styles.textLabel}>Phone</Text>
                        <TextInput
                            defaultValue={guide_phone}
                            style={styles.input}
                        />

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{color: '#fff', fontSize: 16}}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2}>
                                <Text style={{color: '#fff', fontSize: 16}}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={ () => { onPressClose() }}
                            style={{
                                width : 50,
                                height : 50,
                                resizeMode: 'cover',
                                position: 'absolute',
                                zIndex: 100,
                                top: 5,
                                right: 5,
                            }}>
                                
                            <Lottie style={{width: '100%'}} source={require('../../../img/cross-loop.json')} autoPlay loop />

                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default GuideInformation;

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
    },

    image : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        resizeMode: 'cover'
    },

    details: {
        flex : 1,
        padding: 5,
        flexDirection: 'row',
    },

    tabView: {
        flex : 8,
        backgroundColor: Colors.fontColor2
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.55,
        shadowRadius: 4,
        elevation: 5,
    },

    input: {
        height: 50,
        marginTop: 5,
        borderWidth: 1,
        borderColor : 'grey',
        padding: 10,
        color: 'black',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    inputArea: {
        height: 90,
        marginTop: 15,
        borderWidth: 1,
        borderColor : 'grey',
        padding: 10,
        color: 'black',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    textLabel : {
        alignSelf : 'flex-start',
        color: Colors.mainColor2,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginLeft: '2%',
        fontFamily: 'sans-serif-condensed'
    },

    buttonContent: {
        alignSelf : 'center',
        marginTop: 50,
        marginBottom: 10,
        flexDirection: 'row'
    },

    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal: 10
    },

    button2: {
        backgroundColor: Colors.mainColor3,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal: 10
    },

})