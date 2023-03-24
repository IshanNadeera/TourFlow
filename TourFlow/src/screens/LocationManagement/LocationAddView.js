import React, { useState } from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, TouchableNativeFeedback, Platform, PermissionsAndroid,} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Dropdown from 'react-native-input-select';

const LocationAdd = ({navigation}) => {

    const [filePath, setFilePath] = useState({});
    const [district, setDistrict] = React.useState();

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'This app needs camera permission to get photos',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
                console.warn(err);
            return false;
          }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'This app needs write permission to upload photos',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
                console.warn(err);
          }
          return false;
        } else return true;
    };

    const chooseFile = (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          includeBase64: true
        };
        launchImageLibrary(options, (response) => {

          console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('The user closed the camera selector.');
            return;
          }else if (response.errorCode == 'camera_unavailable') {
            alert('No camera is present on the device.');
            return;
          }else if (response.errorCode == 'permission') {
            alert('Permission not granted');
            return;
          }else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }

        //   console.log('base64 -> ', response.assets[0].base64);
          setFilePath(response.assets[0]);

        });
    };

    const districts = [{name : 'Colombo'},
                        {name : 'Gampaha'},
                        {name : 'Kalutara'},
                        {name : 'Kandy'},
                        {name : 'Matale'},
                        {name : 'Nuwara Eliya'},
                        {name : 'Galle'},
                        {name : 'Matara'},
                        {name : 'Hambantota'},
                        {name : 'Jaffna'},
                        {name : 'Kilinochchi'}
                        ]

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:28, color:Colors.fontColor2, fontWeight: 'bold', fontFamily: 'sans-serif-condensed', marginBottom: 10}}>Add new location</Text>
            </View>
            <View style={styles.animation}>
                <Lottie style={{width: '30%'}} source={require('../../../img/map-pin-location.json')} autoPlay loop />
            </View>
            <View style={styles.content}>

                <Text style={styles.textLabel}>Location Name</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.textLabel}>City</Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.textLabelDropdown}>District</Text>
                <Dropdown
                    placeholder="Select an option..."
                    options={districts}
                    optionLabel={'name'}
                    optionValue={'name'}
                    selectedValue={district}
                    onValueChange={(value) => setDistrict(value)}
                    primaryColor={Colors.mainColor1}
                    isSearchable={true}
                    dropdownStyle={{borderColor: 'grey', backgroundColor: 'white'}}
                    dropdownContainerStyle={{height: 50}}
                    searchInputStyle={{borderColor: 'grey', backgroundColor: 'white', height: 50}}
                    selectedItemStyle={{fontSize: 16}}
                    checkboxStyle={{borderColor: 'grey'}}
                />
                <Text style={styles.textLabel}>Description</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    style={styles.inputArea}
                />

            </View>
        </SafeAreaView>
    )
}

{/* <Image
                source={{uri: "data:image/png;base64,"+filePath.base64}}
                style={styles.imageStyle}
            /> */}

                {/* <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.button} onPress={()=> chooseFile('photo')}>
                        <Text style={{color: '#fff', fontSize: 16}}>Upload Image</Text>
                    </TouchableOpacity>
                </View> */}

export default LocationAdd;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    header: {
        flex: 0.75,
        backgroundColor : Colors.mainColor1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    animation: {
        flex: 1.5,
        padding: 10,
        backgroundColor : 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        flex: 8,
        padding: 10,
        backgroundColor : 'white'
    },

    buttonContent: {
        alignSelf : 'center',
        marginTop: 30,
        marginBottom: 30
    },

    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems : 'center',
        justifyContent : 'center'
    },

    imageStyle: {
        width: 200,
        height: 200,
        margin: 5
    },

    input: {
        height: 50,
        marginTop: 15,
        borderWidth: 1,
        borderColor : 'grey',
        padding: 10,
        color: 'black',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3
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
        color: Colors.mainColor1,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: '2%',
        fontFamily: 'sans-serif-condensed'
    },

    textLabelDropdown : {
        alignSelf : 'flex-start',
        color: Colors.mainColor1,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: '2%',
        fontFamily: 'sans-serif-condensed'
    },
});