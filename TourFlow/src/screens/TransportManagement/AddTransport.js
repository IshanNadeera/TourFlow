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
    Dimensions,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { isEmpty } from "lodash";
import firestore from '@react-native-firebase/firestore';

const AddTransport = ({ navigation }) => {
    const [company, onChangeText] = React.useState('');
    const [mobile, onChangeNumber] = React.useState('');
    const [province, setProvince] = React.useState();
    const [name, onChangeName] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [dis, onChangeDiscription] = React.useState('');
    const [filePath, setFilePath] = useState({});


    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {

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

    const handleSubmit = () => {
        if (!company) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Company name required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        if (!mobile) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Mobile Number required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        if (mobile.length != 10) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Enter Valid Mobile Number',
                confirmButtonTitle: 'OK',
                onfirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }

        if (!name) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Driver name required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }

        if (!city) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Company City required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        if (!dis) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Discription required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        if (!province) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Province required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        if (!filePath) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Image required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }

        var id = "id" + Math.random().toString(16).slice(2);

        firestore().collection('Company').doc(id).set({
            company_id: id,
            company_name: company,
            city: city,
            number: mobile,
            driver:name,
            province: province,
            description: dis,
            url: filePath.base64
        })
            .then(() => {
                console.log('Company added!');

                SweetAlert.showAlertWithOptions({
                    title: 'Success!',
                    subTitle: 'Company Added Successfully!',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: 'green',
                    style: 'success',
                    cancellable: false
                },
                    callback => navigation.navigate('Transport'));
            }).catch((error) => {
                console.log(error.code);
                if (error.code === "auth/network-request-failed") {
                    SweetAlert.showAlertWithOptions({
                        title: 'Error!',
                        subTitle: 'Please check your internet connection',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    });
                }
            });
    };

    const onPressBack = () => {
        navigation.navigate('Transport')
    }

    const onPressClose = () => {
        setModalVisible(false);
    }

    const onPressUploadImages = () => {
        setModalVisible(true);
    }

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
                        marginBottom: 5,
                    }}>
                    Add Transports
                </Text>
            </View>
            <Lottie
                style={{ width: '75%' }}
                source={require('../../../img/taxi.json')}
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
                <Lottie
                    style={{ width: '100%' }}
                    source={require('../../../img/backbutton.json')}
                    autoPlay
                    loop
                />
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.fontColor1,
                    textAlign: 'center',
                    margin: 10,
                }}>
                {' '}
                Find the new Transport Company on your area and if you want to add the
                company to this site
            </Text>
            <View style={styles.buttonContent}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.5}
                    onPress={handleSubmit}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>


                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder="Enter Company Name"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    placeholder="Enter Contact Number"
                    keyboardType="numeric"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    placeholder="Enter Driver Name"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCity}
                    placeholder="Enter Company City"
                    placeholderTextColor="#929292"
                />
                <TextInput
                    multiline={true}
                    numberOfLines={6}
                    style={styles.textArea}
                    onChangeText={onChangeDiscription}
                    placeholder="Enter Discription"
                    placeholderTextColor="#929292"
                />
                <Dropdown
                    placeholder="Enter Your Province"
                    options={[
                        { name: 'Central Province', code: 'Central' },
                        { name: 'Eastern Province', code: 'Eastern' },
                        { name: 'North Central Province', code: 'North Central' },
                        { name: 'Northern Province', code: 'Northern' },
                        { name: 'North Western Province', code: 'North Western' },
                        { name: 'Sabaragamuwa Province', code: 'Sabaragamuwa' },
                        { name: 'Southern Province', code: 'Southern' },
                        { name: 'Uva Province', code: 'Uva' },
                        { name: 'Western Province', code: 'Western' },
                    ]}
                    optionLabel={'name'}
                    optionValue={'code'}
                    selectedValue={province}
                    onValueChange={value => setProvince(value)}
                    dropdownStyle={{
                        width: '93%',
                        margin: '3.5%',
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 10,
                        color: '#929292',
                    }}
                    dropdownContainerStyle={{
                        color: '#929292',
                        borderColor: 'grey',
                    }}
                    selectedItemStyle={{ color: Colors.fontColor1 }}
                    primaryColor="#929292"
                />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 26, color: Colors.fontColor1, fontWeight: 'bold', fontFamily: 'sans-serif-condensed', marginBottom: 10 }}>Upload Company Image</Text>
                        <TouchableOpacity onPress={() => chooseFile('photo')}>
                            <View style={styles.uploadContainer}>
                                {!isEmpty(filePath) ? <Image
                                    source={{ uri: "data:image/png;base64," + filePath.base64 }}
                                    style={styles.imageStyle}
                                />
                                    :
                                    <Lottie style={{ width: '90%' }} source={require('../../../img/upload.json')} autoPlay loop />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddTransport;

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
    },
    textArea: {
        height: 90,
        margin: '3.5%',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        color: 'black',
        width: '93%',
        borderRadius: 10,
    },
    scrollView: {
        width: '93%',
        flex: 1,
        marginTop: '0%',
        marginBottom: '5%',
    },
    buttonContent: {
        alignSelf: 'center',
    },
    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
    },
    imageStyle: {
        width: 185,
        height: 185,
        margin: 5,
        resizeMode: 'cover'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        margin: 20,
        width: '95%',
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
        alignItems: 'center'
    }
});
