import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SweetAlert from 'react-native-sweet-alert';
import firestore from '@react-native-firebase/firestore';

const LocationSingle = ({navigation, route}) => {
  //Setters and Getters
  const [locationId, setLocationId] = useState(route.params.id);
  const [locationName, setLocationName] = useState(route.params.name);
  const [locationCity, setLocationCity] = useState(route.params.city);
  const [locationDistrict, setLocationDistrict] = useState(
    route.params.district,
  );
  const [locationDescription, setLocationDescription] = useState(
    route.params.description,
  );
  const [locationUrl, setLocationUrl] = useState(route.params.url);
  const [newLocationUrl, setNewLocationUrl] = useState('');

  //Icons
  const backIcon = require('../../../img/go-back.png');
  const navigtionIcon = require('../../../img/navigation.png');

  //Modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  const onPressBack = () => {
    navigation.navigate('Location');
  };

  const onPressEdit = () => {
    setModalVisible(true);
  };

  const onPressClose = () => {
    setModalVisible(false);
  };

  //Fire when user click select image
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('The user closed the camera selector.');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('No camera is present on the device.');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not granted');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setNewLocationUrl(response.assets[0].base64);
    });
  };

  const onPressDelete = () => {
    SweetAlert.showAlertWithOptions(
      {
        title: 'Do you want to Delete?',
        subTitle: "This can't be undone",
        confirmButtonTitle: 'Ok',
        confirmButtonColor: 'green',
        style: 'warning',
        cancellable: true,
      },
      callback => deleteData(),
    );
  };

  const onPressUpdate = () => {
    if (locationDescription == '') {
      SweetAlert.showAlertWithOptions({
        title: 'Error!',
        subTitle: 'Input fields cannot be empty',
        confirmButtonTitle: 'OK',
        confirmButtonColor: 'green',
        style: 'error',
        cancellable: false,
      });
    } else {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Do you want to Update?',
          subTitle: "This can't be undone",
          confirmButtonTitle: 'Ok',
          confirmButtonColor: 'green',
          style: 'warning',
          cancellable: true,
        },
        callback => updateData(),
      );
    }
  };

  //Update firebase data
  const updateData = () => {
    firestore()
      .collection('Locations')
      .doc(locationId)
      .update({
        location_description: locationDescription,
        location_url: newLocationUrl == '' ? locationUrl : newLocationUrl,
      })
      .then(() => {
        SweetAlert.showAlertWithOptions(
          {
            title: 'Success!',
            subTitle: 'Details Added Successfully!',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'success',
            cancellable: false,
          },
          callback => navigation.navigate('Initial'),
        );
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/network-request-failed') {
          SweetAlert.showAlertWithOptions({
            title: 'Error!',
            subTitle: 'Please check your internet connection',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'error',
            cancellable: false,
          });
        }
      });
  };

  //Delete firebase data
  const deleteData = () => {
    console.log('delete');
    firestore()
      .collection('Locations')
      .doc(locationId)
      .delete()
      .then(() => {
        SweetAlert.showAlertWithOptions(
          {
            title: 'Success!',
            subTitle: 'Location Deleted Successfully!',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'success',
            cancellable: false,
          },
          callback => navigation.navigate('Initial'),
        );
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/network-request-failed') {
          SweetAlert.showAlertWithOptions({
            title: 'Error!',
            subTitle: 'Please check your internet connection',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'error',
            cancellable: false,
          });
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPressBack();
        }}
        style={{
          width: 40,
          height: 40,
          resizeMode: 'cover',
          position: 'absolute',
          zIndex: 100,
          top: 10,
          left: 10,
        }}>
        <Image source={backIcon} style={{width: '100%', height: '100%'}} />
      </TouchableOpacity>

      <View style={styles.topSection}>
        <ImageBackground
          source={{uri: 'data:image/png;base64,' + locationUrl}}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 35,
              color: Colors.mainColor2,
              fontWeight: 'bold',
              flex: 2,
              fontFamily: 'sans-serif-condensed',
            }}>
            {locationName}
          </Text>
          <Lottie
            style={{width: '12%'}}
            source={require('../../../img/heart-button.json')}
            autoPlay
            loop
          />
        </View>

        <View style={styles.details}>
          <Lottie
            style={{width: '10%', bottom: 5}}
            source={require('../../../img/location-loading.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              fontSize: 18,
              color: Colors.fontColor1,
              fontFamily: 'sans-serif-condensed',
            }}>
            {locationCity}
          </Text>
          <Image
            source={navigtionIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.mainColor3,
              marginLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: Colors.fontColor1,
              marginLeft: 10,
              fontFamily: 'sans-serif-condensed',
            }}>
            {locationDistrict} District
          </Text>
        </View>

        <View style={styles.tabView}>
          <View
            style={{
              flex: 1,
              paddingLeft: '5%',
              justifyContent: 'center',
              backgroundColor: Colors.mainColor1,
            }}>
            <Text
              style={{
                fontSize: 24,
                color: Colors.fontColor2,
                fontWeight: 'bold',
                fontFamily: 'sans-serif-condensed',
              }}>
              About
            </Text>
          </View>
          <View
            style={{
              flex: 4,
              padding: 15,
              backgroundColor: '#E7E7E7',
              marginHorizontal: 10,
              marginVertical: 20,
              borderRadius: 15,
              elevation: 5,
              justifyContent: 'center',
            }}>
            <ScrollView>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.fontColor1,
                  textAlign: 'justify',
                  lineHeight: 27,
                  fontFamily: 'sans-serif-condensed',
                }}>
                {locationDescription}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          onPressEdit();
        }}
        style={{
          width: 50,
          height: 50,
          resizeMode: 'cover',
          position: 'absolute',
          zIndex: 100,
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0, 179, 92,.8)',
          borderRadius: 50,
        }}>
        <Lottie
          style={{width: '100%'}}
          source={require('../../../img/edit.json')}
          autoPlay
          loop
        />
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
            <Text
              style={{
                fontSize: 26,
                color: Colors.fontColor1,
                fontWeight: 'bold',
                fontFamily: 'sans-serif-condensed',
                marginBottom: 10,
                paddingHorizontal: 25,
              }}>
              Edit Data - {locationName}
            </Text>

            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <View style={styles.uploadContainer}>
                {newLocationUrl == '' ? (
                  <Image
                    source={{uri: 'data:image/png;base64,' + locationUrl}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image
                    source={{uri: 'data:image/png;base64,' + newLocationUrl}}
                    style={styles.imageStyle}
                  />
                )}
              </View>
            </TouchableOpacity>

            <Text style={styles.textLabel}>Description</Text>
            <TextInput
              defaultValue={locationDescription}
              multiline={true}
              numberOfLines={6}
              style={styles.inputArea}
              onChangeText={description => setLocationDescription(description)}
            />

            <View style={styles.buttonContent}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  onPressDelete();
                }}>
                <Text style={{color: '#fff', fontSize: 16}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onPressUpdate();
                }}>
                <Text style={{color: '#fff', fontSize: 16}}>Update</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                onPressClose();
              }}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
                position: 'absolute',
                zIndex: 100,
                top: 5,
                right: 5,
              }}>
              <Lottie
                style={{width: '100%'}}
                source={require('../../../img/cross-loop.json')}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LocationSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  topSection: {
    flex: 1,
  },

  bottomSection: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },

  header: {
    flex: 1,
    padding: 5,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  details: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },

  tabView: {
    flex: 8,
    backgroundColor: Colors.fontColor2,
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
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    color: 'black',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  inputArea: {
    height: 110,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    color: 'black',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  textLabel: {
    alignSelf: 'flex-start',
    color: Colors.mainColor1,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    marginLeft: '2%',
    fontFamily: 'sans-serif-condensed',
  },

  buttonContent: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },

  button: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 10,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  button2: {
    backgroundColor: Colors.mainColor3,
    borderRadius: 10,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  uploadContainer: {
    marginTop: '15%',
    marginBottom: '15%',
    height: 200,
    width: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    width: 185,
    height: 185,
    margin: 5,
    resizeMode: 'cover',
  },
});
