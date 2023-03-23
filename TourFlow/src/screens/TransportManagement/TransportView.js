import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import AddTransport from './AddTransport';

const Transport = ({ navigation }) => {
    const [company, onChangeText] = React.useState('');
    const [mobile, onChangeNumber] = React.useState('');
    const [province, setProvince] = React.useState();
    const [name, onChangeName] = React.useState('');

    const handleSubmit = () => {
        if (!company) {
        SweetAlert.showAlertWithOptions({
            subTitle: 'Company name required',
            confirmButtonTitle: 'OK',
            confirmButtonColor: 'green',
            style: 'error',
            cancellable: false
        });
            return;
        }
        if (!mobile) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Mobile Number required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
            return;
        }
        if(mobile.length !=10){
            SweetAlert.showAlertWithOptions({
                subTitle: 'Enter Valid Mobile Number',
                confirmButtonTitle: 'OK',
                onfirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
            return;
        }
            
        if (!name) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Owner name required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
            return;
        }
        if (!province) {
            SweetAlert.showAlertWithOptions({
                subTitle: 'Province required',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
            return;
        }
        alert("Submit");

        
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '900', color: Colors.resturantColor, marginTop: 20, marginBottom: 5 }}>Transport</Text>
            </View>
            <Lottie
                style={{ width: '100%' }}
                source={require('../../../img/little-bus.json')}
                autoPlay
                loop
            />

            <ScrollView style={styles.scrollView}>

                <Text style={{ fontSize: 15, fontWeight: '900', color: Colors.fontColor4, textAlign: 'center' }}>Add the New Transport Company</Text>
                <Text style={{ fontSize: 10, fontWeight: '800', color: Colors.fontColor1, textAlign: 'center', margin: 10, }}> Find the new Transport Company on your area and if you want to add the company to this site</Text>

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
                    placeholder="Enter Company Owner Name"
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
                    onValueChange={(value) => setProvince(value)}
                    dropdownStyle={{
                        height: "12%", width: "93%",
                        margin: "3.5%",
                        borderWidth: 1,
                        borderRadius: 15,
                        color: "#929292",
                        textAlign: "center", justifyContent: 'center', alignSelf: 'center', alignItems: 'center'
                    }}
                    dropdownContainerStyle={{
                        color: "#929292",
                        textAlign: "center", justifyContent: 'center', alignSelf: 'center', alignItems: 'center'
                    }}

                    selectedItemStyle={{ color: Colors.fontColor1 }}
                    primaryColor="#929292"
                />

                <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.5}
                    onPress={handleSubmit}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Transport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
    },
    input: {
        height: "12%",
        margin: "3.5%",
        borderWidth: 1,
        borderRadius: 15,
        color: Colors.fontColor1,
        textAlign: "center",
    },
    scrollView: {
        flex: 1,
        marginTop: "0%",
        marginBottom: "20%",
    },
    buttonContent: {
        alignSelf: 'center'
    },
    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 15,
        width: 120,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "2%"
    },
});
