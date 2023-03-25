import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image, FlatList, ScrollView, TouchableNativeFeedback, Modal } from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import firestore from '@react-native-firebase/firestore';

const SingleCompany = ({ navigation, route }) => {

    const company_id = route.params.id;
    const company_name = route.params.cname;
    const driver_name = route.params.name;
    const province = route.params.province;
    const mobile = route.params.mobile;
    const city = route.params.city;
    const dis = route.params.dis;
    const imgurl = route.params.url;

    const [companyNew, onChangeNewText] = React.useState('');
    const [mobileNew, onChangeNewNumber] = React.useState('');
    const [provinceNew, setNewProvince] = React.useState();
    const [nameNew, onChangeNewName] = React.useState('');
    const [cityNew, onChangeNewCity] = React.useState('');
    const [disNew, onChangeNewDiscription] = React.useState('');

    const image = imgurl;
    const navigtionIcon = require('../../../img/navigation.png');

    const [modalVisible, setModalVisible] = useState(false);

    const onPressBack = () => {
        navigation.navigate('Transport')
    }

    const onPressEdit = () => {
        setModalVisible(true);
    }

    const onPressClose = () => {
        setModalVisible(false);
    }

    const handleSubmitUpdate = () => {

        if (!company_name) {
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

        if (!driver_name) {
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
        if (!disNew) {
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
        firestore()
            .collection('Company')
            .doc(company_id)
            .update({
                company_id: company_id,
                company_name: companyNew,
                city: cityNew,
                number: mobileNew,
                driver: nameNew,
                province: provinceNew,
                description: disNew,
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
        setModalVisible(false);
    }


    const handleSubmitDelete = () => {
        firestore()
            .collection('Company')
            .doc(company_id)
            .delete()
            .then(() => {
                SweetAlert.showAlertWithOptions(
                    {
                        title: 'Success!',
                        subTitle: 'Company Deleted Successfully!',
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
        setModalVisible(false);
    }


    return (
        <SafeAreaView style={styles.container}>

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

            <View style={styles.topSection}>

                <View style={styles.header}>
                    <Text style={{ fontSize: 35, color: Colors.mainColor2, fontWeight: 'bold', flex: 1, textAlign: 'center', fontFamily: 'sans-serif-condensed' }}>{company_name}</Text>
                </View>
            </View>

            <View style={styles.middleSection}>
                <ImageBackground source={{ uri: "data:image/png;base64," + image }} resizeMode="cover" style={styles.image}>

                </ImageBackground>
            </View>
            <View style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: Colors.mainColor2, alignItems: 'center', bottom: 10 }}>
                <Text style={{ fontSize: 24, color: Colors.fontColor2, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif-condensed' }}>About</Text>
            </View>

            <View style={styles.details1}>
                <Lottie style={{ width: '10%', bottom: 2 }} source={require('../../../img/person.json')} autoPlay loop />
                <Text style={{ fontSize: 24, color: Colors.fontColor1, fontWeight: 'bold', fontFamily: 'sans-serif-condensed' }}>   {driver_name}</Text>
            </View>

            <View style={styles.details2}>
                <Lottie style={{ width: '20%', bottom: 2 }} source={require('../../../img/mobile.json')} autoPlay loop />
                <Text style={{ fontSize: 18, marginRight: 100, color: Colors.fontColor, fontWeight: 'bold', fontFamily: 'sans-serif-condensed' }}>{mobile}</Text>
            </View>

            <View style={styles.details3}>
                <Lottie style={{ width: '10%', bottom: 5 }} source={require('../../../img/location-loading.json')} autoPlay loop />
                <Text style={{ fontSize: 18, color: Colors.fontColor1, fontWeight: 'bold', fontFamily: 'sans-serif-condensed' }}>    {city}</Text>
            </View>

            <View style={styles.details4}>
                <Image source={navigtionIcon} style={{ width: 25, height: 25, tintColor: Colors.mainColor3, marginLeft: 20 }} />
                <Text style={{ fontSize: 18, color: Colors.fontColor1, marginLeft: 10, fontWeight: 'bold', fontFamily: 'sans-serif-condensed' }}>   {province} Province</Text>
            </View>

            <View style={{ backgroundColor: Colors.fontColor1, alignItems: 'center', bottom: 10, width: "100%", height: 2, top: 10 }}>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.disciption}>
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'left', marginLeft: "5%", marginTop: "8%" }}>{dis}</Text>
                </View>

            </ScrollView>

            <TouchableOpacity
                onPress={() => { onPressEdit() }}
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    position: 'absolute',
                    zIndex: 100,
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(0, 179, 92,.8)',
                    borderRadius: 50
                }}>

                <Lottie style={{ width: '100%' }} source={require('../../../img/edit.json')} autoPlay loop />

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
                        <Text style={{ fontSize: 26, color: Colors.fontColor1, fontWeight: 'bold', fontFamily: 'sans-serif-condensed', marginBottom: 10 }}>Edit Company Details</Text>


                        <Text style={styles.textLabel}>Company Name</Text>
                        <TextInput
                            defaultValue={company_name}
                            onChangeText={onChangeNewText}
                            style={styles.input}
                        />

                        <Text style={styles.textLabel}>Driver Name</Text>
                        <TextInput
                            defaultValue={driver_name}
                            onChangeText={onChangeNewName}
                            style={styles.input}
                        />

                        <Text style={styles.textLabel}>Mobile Number</Text>
                        <TextInput
                            defaultValue={mobile}
                            onChangeText={onChangeNewNumber}
                            style={styles.input}
                        />

                        <Text style={styles.textLabel}>City</Text>
                        <TextInput
                            defaultValue={city}
                            onChangeText={onChangeNewCity}
                            style={styles.input}
                        />

                        <Text style={styles.textLabel}>Description</Text>
                        <TextInput
                            defaultValue={dis}
                            onChangeText={onChangeNewDiscription}
                            multiline={true}
                            numberOfLines={5}
                            style={styles.inputArea}
                        />

                        <Text style={styles.textLabel}>Province</Text>
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
                            onValueChange={value => setNewProvince(value)}
                            dropdownStyle={{
                                width: '100%',
                                marginTop: '3.5%',
                                marginLeft: '0%',
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

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmitUpdate}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={handleSubmitDelete}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => { onPressClose() }}
                            style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'cover',
                                position: 'absolute',
                                zIndex: 100,
                                top: 5,
                                right: 5,
                            }}>

                            <Lottie style={{ width: '100%' }} source={require('../../../img/cross-loop.json')} autoPlay loop />

                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default SingleCompany;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor
    },
    topSection: {
        height: 70,
    },
    middleSection: {
        flex: 1,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        marginLeft: "12%",
    },
    header: {
        flex: 1,
        padding: 5,
        marginTop: 10,
    },
    bottomSection: {
    },

    details1: {
        marginTop: 0,
        marginLeft: "12%",
        padding: 5,
        flexDirection: 'row',
    },
    details2: {
        marginTop: 0,
        marginLeft: "7%",
        padding: 5,
        flexDirection: 'row',
    },
    details3: {
        marginTop: 0,
        marginLeft: "12%",
        padding: 5,
        flexDirection: 'row',
    },
    details4: {
        marginTop: 0,
        marginLeft: "8%",
        padding: 5,
        flexDirection: 'row',
    },
    disciption: {
        flex: 1,
    },
    scrollView: {
        width: '97%',
        flex: 1,
        marginTop: '0%',
        marginBottom: '5%',
    },
    tabView: {
        flex: 8,
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
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'grey',
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
        borderColor: 'grey',
        padding: 10,
        color: 'black',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    textLabel: {
        alignSelf: 'flex-start',
        color: Colors.mainColor2,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: '2%',
        fontFamily: 'sans-serif-condensed'
    },

    buttonContent: {
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 10,
        flexDirection: 'row'
    },

    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },

    button2: {
        backgroundColor: Colors.mainColor3,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },

})