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

const AddTransport = ({ navigation }) => {
    const [company, onChangeText] = React.useState('');
    const [mobile, onChangeNumber] = React.useState('');
    const [province, setProvince] = React.useState();
    const [name, onChangeName] = React.useState('');
    const [city, onChangeCity] = React.useState('');

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
        alert('Submit');
    };

    const onPressBack = () => {
        navigation.navigate('Transport')
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
