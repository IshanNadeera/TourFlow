import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';

const AddGuide = ({ navigation }) => {
    const [name, onChangeName] = React.useState('');
    const [mobile, onChangeNumber] = React.useState('');
    const [age, onChangeAge] = React.useState();
    const [location, onChangeLanguage] = React.useState('');
    const [city, onChangeCity] = React.useState('');

    const handleSubmit = () => {
        if (!name) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Guide name required',
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
                subTitle: 'Guide name required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }

        if (!city) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'City required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }

        if (!age) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Age is required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false,
            });
            return;
        }
        alert('Submit');
    };

    const onPressBack = () => {
        navigation.navigate('Guide')
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
                    Find the new Transport Company on your area and if you want to add the
                    company to this site
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

                <View style={styles.buttonContent}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={handleSubmit}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        marginBottom: '20%',
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
});
