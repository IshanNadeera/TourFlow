import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import {isEmpty} from 'lodash';
import firestore from '@react-native-firebase/firestore';

const LocationAdd = ({navigation}) => {
  //Getters and Setters
  const [filePath, setFilePath] = useState({});
  const [locationName, setLocationName] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

      setFilePath(response.assets[0]);
    });
  };

  //Set districts
  const districts = [
    {name: 'Colombo'},
    {name: 'Gampaha'},
    {name: 'Kalutara'},
    {name: 'Kandy'},
    {name: 'Matale'},
    {name: 'Nuwara Eliya'},
    {name: 'Galle'},
    {name: 'Matara'},
    {name: 'Hambantota'},
    {name: 'Jaffna'},
    {name: 'Kilinochchi'},
  ];

  const onPressClose = () => {
    setModalVisible(false);
  };

  const onPressUploadImages = () => {
    setModalVisible(true);
  };

  //Add locations to firebase
  const onPressAddLocation = () => {
    if (
      locationName == '' ||
      city == '' ||
      district == '' ||
      description == ''
    ) {
      SweetAlert.showAlertWithOptions({
        title: 'Error!',
        subTitle: 'Input fields cannot be empty',
        confirmButtonTitle: 'OK',
        confirmButtonColor: 'green',
        style: 'error',
        cancellable: false,
      });
    } else if (isEmpty(filePath)) {
      SweetAlert.showAlertWithOptions({
        title: 'Error!',
        subTitle: 'Please select an image',
        confirmButtonTitle: 'OK',
        confirmButtonColor: 'green',
        style: 'error',
        cancellable: false,
      });
    } else {
      var id = 'id' + Math.random().toString(16).slice(2);

      firestore()
        .collection('Locations')
        .doc(id)
        .set({
          location_id: id,
          location_name: locationName,
          location_city: city,
          location_district: district,
          location_description: description,
          location_url: filePath.base64,
        })
        .then(() => {
          console.log('Location added!');

          SweetAlert.showAlertWithOptions(
            {
              title: 'Success!',
              subTitle: 'Location Added Successfully!',
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 28,
            color: Colors.fontColor2,
            fontWeight: 'bold',
            fontFamily: 'sans-serif-condensed',
            marginBottom: 10,
          }}>
          Add new location
        </Text>
      </View>
      <View style={styles.animation}>
        <Lottie
          style={{width: '20%'}}
          source={require('../../../img/map-pin-location.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.textLabel}>Location Name</Text>
        <TextInput
          placeholder="Enter location name"
          style={styles.input}
          onChangeText={location_name => setLocationName(location_name)}
        />
        <Text style={styles.textLabel}>City</Text>
        <TextInput
          placeholder="Enter main city"
          style={styles.input}
          onChangeText={city => setCity(city)}
        />
        <Text style={styles.textLabelDropdown}>District</Text>
        <Dropdown
          placeholder="Select an option..."
          options={districts}
          optionLabel={'name'}
          optionValue={'name'}
          selectedValue={district}
          onValueChange={value => setDistrict(value)}
          primaryColor={Colors.mainColor1}
          isSearchable={true}
          dropdownStyle={{borderColor: 'grey', backgroundColor: 'white'}}
          dropdownContainerStyle={{height: 50}}
          searchInputStyle={{
            borderColor: 'grey',
            backgroundColor: 'white',
            height: 50,
          }}
          selectedItemStyle={{fontSize: 16}}
          checkboxStyle={{borderColor: 'grey'}}
        />
        <Text style={styles.textLabel}>Description</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          style={styles.inputArea}
          onChangeText={description => setDescription(description)}
          placeholder="Enter location breif description"
        />
      </View>

      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onPressUploadImages();
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            onPressAddLocation();
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Add Location</Text>
        </TouchableOpacity>
      </View>

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
              }}>
              Upload Cover Image
            </Text>
            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <View style={styles.uploadContainer}>
                {!isEmpty(filePath) ? (
                  <Image
                    source={{uri: 'data:image/png;base64,' + filePath.base64}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Lottie
                    style={{width: '90%'}}
                    source={require('../../../img/upload.json')}
                    autoPlay
                    loop
                  />
                )}
              </View>
            </TouchableOpacity>

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

export default LocationAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fontColor2,
  },

  header: {
    flex: 0.75,
    backgroundColor: Colors.mainColor1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animation: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 8,
    padding: 10,
    backgroundColor: 'white',
  },

  buttonContent: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    backgroundColor: Colors.fontColor2,
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
    backgroundColor: Colors.mainColor2,
    borderRadius: 10,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  imageStyle: {
    width: 185,
    height: 185,
    margin: 5,
    resizeMode: 'cover',
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
    elevation: 3,
  },

  inputArea: {
    height: 90,
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

  textLabelDropdown: {
    alignSelf: 'flex-start',
    color: Colors.mainColor1,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: '2%',
    fontFamily: 'sans-serif-condensed',
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
});
