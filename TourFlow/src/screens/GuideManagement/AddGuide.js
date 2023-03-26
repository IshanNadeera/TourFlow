import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SweetAlert from 'react-native-sweet-alert';
import {isEmpty} from 'lodash';
import firestore from '@react-native-firebase/firestore';
import Dropdown from 'react-native-input-select';

const AddGuide = ({ navigation }) => {
    const [filePath, setFilePath] = useState({});
    const [guide_name, onChangeName] = React.useState('');
    const [phone, onChangeNumber] = React.useState('');
    const [age, onChangeAge] = React.useState();
    const [language, onChangeLanguage] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [district, setDistrict] = React.useState('');
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

    const onPressUploadImages = () => {
        setModalVisible(true);
    };

    const handleSubmit = () => {
        if (!guide_name) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Guide name required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        } else if (district == '') {
          SweetAlert.showAlertWithOptions({
            title: 'Error!',
            subTitle: 'Input fields cannot be empty',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'error',
            cancellable: false,
          });
        }
        else if (!phone) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Mobile Number required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        else if (phone.length != 10) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Enter Valid Mobile Number',
                confirmButtonTitle: 'OK',
                onfirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        } 
        else if (!city) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'City required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        else if (!district) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'City required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        else if (!age) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Age is required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        } else if (isEmpty(filePath)) {
            SweetAlert.showAlertWithOptions({
              title: 'Error!',
              subTitle: 'Please select an image',
              confirmButtonTitle: 'OK',
              confirmButtonColor: 'green',
              style: 'error',
              cancellable: false,
            });
          }
        else{
            var id = 'id' + Math.random().toString(16).slice(2);

            firestore()
            .collection('Guides')
            .doc(id)
            .set({
              guide_id: id,
              guide_name: guide_name,
              city: city,
              age: age,
              phone:phone,
              language: language,
              district: district,
              guide_url: filePath.base64,
            })
            .then(() => {
              console.log('Guide added!');
    
              SweetAlert.showAlertWithOptions(
                {
                  title: 'Success!',
                  subTitle: 'Guide Details Added Successfully!',
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

    const onPressBack = () => {
        navigation.navigate('Guide')
    }

    const onPressClose = () => {
      setModalVisible(false);
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

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: Colors.mainColor2,
                        marginTop: 20,
                        marginBottom: 0,
                    }}>
                    Add Guide
                </Text>
            </View>
            <Lottie
                style={{ width: '60%', margin:10 }}
                source={require('../../../img/addGuideAnim.json')}
                autoPlay
                loop
            />

            <TouchableOpacity
                onPress={() => {
                    onPressBack();
                }}
                style={{
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    zIndex: 10,
                    top: 12,
                    left: 0,
                }}>
        <Lottie style={{width: '75%', left:5, top:3}} source={require('../../../img/backGuide.json')} autoPlay loop />

            </TouchableOpacity>

            <ScrollView style={styles.scrollView}>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Colors.fontColor1,
                        textAlign: 'center',
                        margin: 10,
                    }}>
                    {' '}
                    Add New Guide For Tour Guide Platform. Make Sure To Give All The Information Of The Guide.
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    placeholder="Enter Guide Name"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeAge}
                    placeholder="Enter Age"
                    keyboardType="numeric"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLanguage}
                    placeholder="Enter Languages"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCity}
                    placeholder="Enter City"
                    placeholderTextColor="#929292"
                />

            <Dropdown
              placeholder="Select a District..."
              options={districts}
              optionLabel={'name'}
              optionValue={'name'}
              selectedValue={district}
              onValueChange={value => setDistrict(value)}
              primaryColor={Colors.mainColor1}
              isSearchable={true}
              dropdownStyle={{
                width: '93%',
                margin: '3.5%',
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 10,
                color: '#929292',
              }}
              dropdownContainerStyle={{height: 50}}
              searchInputStyle={{
                borderColor: 'grey',
                backgroundColor: 'white',
                height: 50,
              }}
              selectedItemStyle={{fontSize: 16}}
              checkboxStyle={{borderColor: 'grey'}}
            />
                

                <View style={styles.buttonContent}>
                <TouchableOpacity
                        style={styles.button2}
                        activeOpacity={0.5}
                        onPress={onPressUploadImages}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={handleSubmit}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
              Upload Image
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

export default AddGuide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        height: 50,
        margin: '3.5%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        color: Colors.fontColor1,
        textAlign: 'left',
        paddingLeft:10
    },

    scrollView: {
        flex: 1,
        marginTop: '0%',
        marginBottom: '5%',
    },
    buttonContent: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
        marginLeft:10
    },

    button2: {
        backgroundColor: Colors.mainColor1,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
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

    textLabelDropdown: {
      alignSelf: 'flex-start',
      color: Colors.mainColor1,
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: '20%',
      fontFamily: 'sans-serif-condensed',
    },



});
