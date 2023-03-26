import React, { useState, useEffect } from "react";
import {TouchableNativeFeedback, FlatList, ImageBackground, View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image,  } from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const Guide = ({navigation}) => {
    const searchIcon = require('../../../img/search.png');
    const closeIcon = require('../../../img/close.png');
    const isFocused = useIsFocused();
    const [search, setSearch] = useState('');
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [allData, setAllData] = useState([]);

    //setup user details and location details
    useEffect(() => {
        getUser();
        getLocations();

        setUsername(user.name);
        setRole(user.role);
    }, [isFocused]);

    useEffect(() => {
        setUsername(user.name);
        setRole(user.role);
    }, [user]);

    //Get location data from firebase
  const getLocations = async () => {
    var data = [];

    firestore()
      .collection('Guides')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data());
        });
        setFilteredData(data);
        setAllData(data);
      });
  };

    //Get user data from firebase
    const getUser = async () => {
        try {
          const userValue = await AsyncStorage.getItem('User');
          setUser(JSON.parse(userValue));
        } catch (error) {
          console.log(error);
        }
    };

    const onPressGuide = (id, guide_name, city, guide_url, district, phone, language, age) => {
        navigation.navigate('GuideSingle', {
            id: id, 
            guide_name: guide_name, 
            age:age,
            city: city, 
            district:district, 
            phone:phone, 
            guide_url:guide_url, 
            language:language
        });
    }

    const onPressAdd = () => {
        navigation.navigate('AddGuide');
    }

    const GuideItem = ({ id, guide_name, city, language, phone, guide_url, age, district }) => (
        <TouchableNativeFeedback onPress={ () => { onPressGuide(id, guide_name, city, guide_url, district, phone, language, age) }}>
            <View style={styles.container1}>
                <View style={styles.guideView}>
                    <Image style={styles.image} 
                    source={{uri: 'data:image/png;base64,' + guide_url}} />
                <View style={{left:10}}>
                <Text style={{fontSize:15, fontWeight:'bold', fontSize:20}}>{guide_name}</Text>
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

    const searchFilter = text => {
        if (text) {
          const newData = allData.filter(item => {
            const itemData = item.city
              ? item.city.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredData(newData);
          setSearch(text);
        } else {
          setFilteredData(allData);
          setSearch(text);
        }
      };

      const clearText = () => {
        setSearch('');
        setFilteredData(allData);
      };

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
          {role == 'admin' ? (
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
                    ) : null }
        </View>

        <View style={styles.bottomView}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search location.."
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={text => searchFilter(text)}
                    value={search}
                />
                <TouchableOpacity onPress={() => clearText()}>
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
                    data={filteredData}
                    renderItem={({item}) =>
                        <GuideItem
                            id={item.guide_id}
                            guide_name={item.guide_name}
                            city={item.city}
                            language={item.language}
                            phone={item.phone}
                            guide_url={item.guide_url}
                            age={item.age}
                            district={item.district}
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