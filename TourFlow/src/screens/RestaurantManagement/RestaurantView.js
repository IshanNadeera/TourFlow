import React, { useState, useEffect, useFocusEffect } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from "@react-navigation/native";


const Restaurant = ({navigation}) => {

    const image = require("../../../img/food.jpg");
    const image2 = require("../../../img/f1.png");
    const searchIcon = require('../../../img/search.png');
    const closeIcon = require('../../../img/close.png');

    const isFocused = useIsFocused();

    const [search, setSearch] = useState('');
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        getUser();
        getRestaurants();

        setUsername(user.name);
        setRole(user.role);
    }, [isFocused])

    useEffect(() => {
        setUsername(user.name);
        setRole(user.role);
    },[user])

    const getRestaurants = async() => {

        var data = [];

        firestore()
        .collection('Restaurants')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                data.push(documentSnapshot.data());
            });
            setFilteredData(data);
            setAllData(data);
        });
    }

    const getUser = async() => {
        try {
            const userValue = await AsyncStorage.getItem('User');
            setUser(JSON.parse(userValue));
            
        } catch (error) {
            console.log(error);
        }
    }

    const onPressCard = (id, name, city, hour, description,url) => {
        navigation.navigate('RestaurantSingle', {id: id, name: name, city: city,hour:hour, description: description, url:url});
    }

    const onPressAdd = () => {
        navigation.navigate('RestaurantAdd');
    }

    const RestaurantItem = ({ id, name, city, hour, description, url}) => (
        <TouchableNativeFeedback onPress={ () => { onPressCard(id, name, city,hour, description, url) }}>
            <View style={styles.container1}>
                <Image style={styles.image} source={{uri: "data:image/png;base64,"+url}} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Lottie style={{width: '10%', marginBottom: 4}} source={require('../../../img/calendar.json')} autoPlay loop />
                    <Text style={styles.simpletext}>{hour}</Text>
                </View>
                <Lottie   style={{
            width: '55%',
            alignSelf: 'flex-end',
            bottom: 5,
            right:15,
            position:"absolute"
          }} source={require('../../../img/5s.json')} autoPlay loop />

            </View>
        </TouchableNativeFeedback>
    );

    const searchFilter = (text) => {
        if(text){
            const newData = allData.filter((item) => {
                const itemData = item.restaurant_city ? item.restaurant_city.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        }else{
            setFilteredData(allData);
            setSearch(text);
        }
    }

    const clearText = () => {
        setSearch('');
        setFilteredData(allData);
    }

    
    const onPressHelp = () => {
        navigation.navigate('RestaurantHelp');
    };

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.topView}>
                <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
                    <View style={styles.imageContent}>
                    <TouchableOpacity
              onPress={() => {
                onPressHelp();
              }}
             ><Lottie  style={{
            width: '35%',
            alignSelf: 'flex-end',
            bottom: -20,
            right:0,
            position:"absolute"
          }} source={require('../../../img/loading-dot.json')} autoPlay loop />
          </TouchableOpacity>
                        <Text style={{color:Colors.mainColor2, fontSize: 28, fontWeight:'bold'}}>Hi {username}</Text>
                        <Text style={{color:Colors.fontColor2, fontSize: 20, fontWeight:'bold'}}>Here are some of the best</Text>
                        <Text style={{color:Colors.fontColor2, fontSize: 26, fontWeight:'bold'}}>restuarants near you ....</Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.bottomView}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search Restaurants from city here..."
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                        value={search}
                    />
                    <TouchableOpacity onPress={ () => clearText()}>
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
                <View style={styles.restaurantContainer}>
                <Image source={image2} resizeMode="cover" style={styles.imageBg2}/>
                    <FlatList
                        contentContainerStyle={{padding:5}}
                        removeClippedSubviews={true}
                        data={filteredData}
                        renderItem={({item}) =>
                            <RestaurantItem
                                id={item.restaurant_id}
                                name={item.restaurant_name}
                                city={item.restaurant_city}
                                hour={item.restaurant_hour}
                                description={item.restaurant_description}
                                url={item.restaurant_url}
                            />
                        }
                        keyExtractor={(item) => item.restaurant_id}
                        initialNumToRender={5}
                    />

                    {role == 'admin' ? <TouchableOpacity
                        onPress={ () => { onPressAdd() }}
                        style={{
                            width : 60,
                            height : 60,
                            resizeMode: 'cover',
                            position: 'absolute',
                            zIndex: 100,
                            bottom: 5,
                            right: '45%',
                            left: '45%',
                            backgroundColor: 'rgba(255, 255, 255,.7)',
                            borderRadius: 50,
                            borderColor: 'grey',
                            borderWidth: 1
                        }}>
                    
                        <Lottie style={{width: '100%'}} source={require('../../../img/add.json')} autoPlay loop />

                    </TouchableOpacity> : null }

                </View>
            </View>

        </SafeAreaView>
    )
}

export default Restaurant;

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

    imageBg2: {
        width:'100%'
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

    restaurantContainer: {
        flex: 6,
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