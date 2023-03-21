import React, {useState, createRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from "react-native";
import Colors from "../utils/Colors";
import SweetAlert from 'react-native-sweet-alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';

const Login = ({ navigation }) => {

    const onPressLogin = () => {
        navigation.navigate('Initial');
    };

    return(
        <SafeAreaView style={styles.container}>

            <View style={{flex:2.5, marginTop: 10}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor1, marginTop: 10, marginLeft: 10}}>Tour</Text>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 10, marginLeft: 10}}>Flow</Text>
                </View>
                <Lottie style={{width: '100%'}} source={require('../../img/login.json')} autoPlay loop />
                <Text style = {{fontSize:30, fontWeight: 'bold', color: Colors.fontColor1, marginLeft: 10}}>Welcome Back!</Text>
            </View>

            <View style={styles.BottomView}>
                <View style={styles.formContainer}>
                    <Text style={styles.textLabel}>Username</Text>
                    <TextInput
                        placeholder='Enter your email'
                        style={styles.input}
                    />

                    <Text style={styles.textLabel}>Password</Text>
                    <TextInput
                        placeholder='Enter your password'
                        style={styles.input}
                    />

                    <View style={styles.buttonContent}>
                        <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                            <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection : 'column',
    },

    BottomView: {
        flex: 3,
        backgroundColor: Colors.mainColor1,
    },

    formContainer: {
        backgroundColor: Colors.fontColor2,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textLabel : {
        alignSelf : 'flex-start',
        color: Colors.mainColor2,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15
    },

    input: {
        height: 50,
        marginTop: 15,
        borderWidth: 1,
        borderColor : 'grey',
        padding: 10,
        color: 'black',
        width: '95%',
        borderRadius: 10,
        backgroundColor: 'white'
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

});