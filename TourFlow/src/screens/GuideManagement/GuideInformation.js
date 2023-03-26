import React, { useState } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback, Modal} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';
import SweetAlert from 'react-native-sweet-alert';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';

const GuideInformation = ({navigation, route}) => {

    const [guideId, setGuideId] = useState(route.params.id);
    const [guide_name, setGuideName] = useState(route.params.guide_name);
    const [city, setCity] = useState(route.params.city);
    const [guide_url, setGuideUrl] = useState(route.params.guide_url);
    const [district, setDistrict] = useState(route.params.district);
    const [phone, setPhone] = useState(route.params.phone);
    const [language, setLanguage] = useState(route.params.language);
    const [age, setAge] = useState(route.params.age);

    const image = guide_url;
    const backIcon = require('../../../img/backImage.jpg');
    const navigtionIcon = require('../../../img/navigation.png');

    const [modalVisible, setModalVisible] = useState(false);
    const [newGuideUrl, setNewGuideUrl] = useState('');

    const onPressBack = () => {
        navigation.navigate('Guide')
    }

    const onPressEdit = () => {
        setModalVisible(true);
    }

    const onPressClose = () => {
        setModalVisible(false);
    }

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

      setNewGuideUrl(response.assets[0].base64);
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
    if (guide_name == '') {
      SweetAlert.showAlertWithOptions({
        title: 'Error!',
        subTitle: 'Input fields cannot be empty',
        confirmButtonTitle: 'OK',
        confirmButtonColor: 'green',
        style: 'error',
        cancellable: false,
      });
    }  else if (phone == '') {
        SweetAlert.showAlertWithOptions({
          title: 'Error!',
          subTitle: 'Input fields cannot be empty',
          confirmButtonTitle: 'OK',
          confirmButtonColor: 'green',
          style: 'error',
          cancellable: false,
        });
      } else if (language == '') {
        SweetAlert.showAlertWithOptions({
          title: 'Error!',
          subTitle: 'Input fields cannot be empty',
          confirmButtonTitle: 'OK',
          confirmButtonColor: 'green',
          style: 'error',
          cancellable: false,
        });
      } else if (age == '') {
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
          .collection('Guides')
          .doc(guideId)
          .update({
            guide_name: guide_name,
            age: age,
            language:language,
            phone:phone,
            guide_url: newGuideUrl == '' ? guide_url : newGuideUrl,
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
      .collection('Guides')
      .doc(guideId)
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

            </TouchableOpacity>

            <View style={styles.topSection}>
                <ImageBackground
                    source={{uri: 'data:image/png;base64,' + guide_url}} 
                    resizeMode="cover" 
                    style={styles.image}></ImageBackground>
            </View>
            <View style={styles.bottomSection}>

                <View style={styles.details}>
                    <Lottie style={{width: '10%', bottom: 5}} source={require('../../../img/location-loading.json')} autoPlay loop />
                    <Text style={{fontSize: 18, color:Colors.fontColor1, fontFamily: 'sans-serif-condensed'}}>{district}</Text>
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
                            Language: {language}
                        </Text>
                        <Text style={{fontSize: 18, color:Colors.fontColor1, textAlign: 'justify', lineHeight: 27, fontFamily: 'sans-serif-condensed'}}>
                            Phone: {phone}
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

                        <TouchableOpacity onPress={() => chooseFile('photo')}>
                            <View style={styles.uploadContainer}>
                                {newGuideUrl == '' ? (
                                <Image
                                    source={{uri: 'data:image/png;base64,' + guide_url}}
                                    style={styles.imageStyle}
                                />
                                ) : (
                                <Image
                                    source={{uri: 'data:image/png;base64,' + newGuideUrl}}
                                    style={styles.imageStyle}
                                />
                                )}
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.textLabel}>Name</Text>
                        <TextInput
                            defaultValue={guide_name}
                            style={styles.input}
                            onChangeText={guide_name => setGuideName(guide_name)}
                        />

                        <Text style={styles.textLabel}>Age</Text>
                        <TextInput
                            defaultValue={age}
                            style={styles.input}
                            onChangeText={age => setAge(age)}
                        />

                        <Text style={styles.textLabel}>Language</Text>
                        <TextInput
                            defaultValue={language}
                            style={styles.input}
                            onChangeText={language => setLanguage(language)}
                        />

                        <Text style={styles.textLabel}>Phone</Text>
                        <TextInput
                            defaultValue={phone}
                            style={styles.input}
                            onChangeText={phone => setPhone(phone)}
                        />

                        {/* <Text style={styles.textLabel}>City</Text>
                        <TextInput
                            defaultValue={city}
                            style={styles.input}
                        /> */}

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    onPressUpdate();
                                }}>
                                <Text style={{color: '#fff', fontSize: 16}}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2}>
                                <Text style={{color: '#fff', fontSize: 16}}
                                onPress={() => {
                                    onPressDelete();
                                }}>Delete</Text>
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

    uploadContainer: {
        marginTop: '5%',
        marginBottom: '5%',
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

})