import React, {useState, useEffect, useFocusEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const Location = ({navigation}) => {
  //Getters and Setters

  const image = require('../../../img/back_location.jpeg');
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
      .collection('Locations')
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

  const onPressCard = (id, name, city, district, description, url) => {
    navigation.navigate('LocationSingle', {
      id: id,
      name: name,
      city: city,
      district: district,
      description: description,
      url: url,
    });
  };

  const onPressAdd = () => {
    navigation.navigate('LocationAdd');
  };

  //Single Item View
  const LocationItem = ({id, name, city, district, description, url}) => (
    <TouchableNativeFeedback
      onPress={() => {
        onPressCard(id, name, city, district, description, url);
      }}>
      <View style={styles.container1}>
        <Image
          style={styles.image}
          source={{uri: 'data:image/png;base64,' + url}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Lottie
            style={{width: '10%', marginBottom: 10}}
            source={require('../../../img/location-loading.json')}
            autoPlay
            loop
          />
          <Text style={styles.simpletext}>{city}</Text>
        </View>
        <Lottie
          style={{
            position: 'absolute',
            width: '35%',
            alignSelf: 'flex-end',
            bottom: -10,
          }}
          source={require('../../../img/heart-button.json')}
          autoPlay
          loop
        />
      </View>
    </TouchableNativeFeedback>
  );

  const searchFilter = text => {
    if (text) {
      const newData = allData.filter(item => {
        const itemData = item.location_name
          ? item.location_name.toUpperCase()
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.imageBg}>
          <View style={styles.imageContent}>
            <Text
              style={{
                color: Colors.mainColor2,
                fontSize: 28,
                fontWeight: 'bold',
              }}>
              Hi {username}
            </Text>
            <Text
              style={{
                color: Colors.fontColor2,
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              Where do you want to go?
            </Text>
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
            onChangeText={text => searchFilter(text)}
            value={search}
          />
          <TouchableOpacity onPress={() => clearText()}>
            <Image
              source={search == '' ? searchIcon : closeIcon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                top: 10,
                right: 10,
                tintColor: Colors.mainColor1,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.locationContainer}>
          <FlatList
            contentContainerStyle={{padding: 5}}
            removeClippedSubviews={true}
            data={filteredData}
            renderItem={({item}) => (
              <LocationItem
                id={item.location_id}
                name={item.location_name}
                city={item.location_city}
                district={item.location_district}
                description={item.location_description}
                url={item.location_url}
              />
            )}
            keyExtractor={item => item.location_id}
            initialNumToRender={5}
          />

          {role == 'admin' ? (
            <TouchableOpacity
              onPress={() => {
                onPressAdd();
              }}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'cover',
                position: 'absolute',
                zIndex: 100,
                bottom: 5,
                right: '45%',
                left: '45%',
                backgroundColor: 'rgba(255, 255, 255,.7)',
                borderRadius: 50,
                borderColor: 'grey',
                borderWidth: 1,
              }}>
              <Lottie
                style={{width: '100%'}}
                source={require('../../../img/add.json')}
                autoPlay
                loop
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  topView: {
    flex: 1,
  },

  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },

  imageContent: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
    padding: 30,
    justifyContent: 'center',
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
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: '18%',
  },

  textInput: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '70%',
    borderRadius: 15,
    resizeMode: 'cover',
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    left: 20,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.fontColor1,
  },

  container1: {
    width: '100%',
    height: 220,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 0,
    elevation: 6,
    paddingBottom: 10,
  },

  simpletext: {
    fontSize: 18,
    color: Colors.fontColor1,
  },
});
