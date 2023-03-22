import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView,TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';

const AddTransport = ({ navigation }) => {
    const [company, onChangeText] = React.useState('');
    const [mobile, onChangeNumber] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [name, onChangeName] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '900', color: Colors.resturantColor, marginTop: 20, marginBottom: 5 }}>Transport</Text>
            </View>
            <Lottie
                style={{ width: '100%'}}
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
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCity}
                    placeholder="Enter Your City"
                    placeholderTextColor="#929292"
                />
                <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.button}>
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
        alignSelf : 'center'
    },
    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 15,
        width: 120,
        height: 45,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom: "2%"
    },
});
