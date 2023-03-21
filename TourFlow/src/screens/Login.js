import React, {useState, createRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Colors from "../utils/Colors";
import SweetAlert from 'react-native-sweet-alert';

const Login = ({ navigation }) => {

    const onPressLogin = () => {
        navigation.navigate('Initial');
    };

    return(
        <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
            </TouchableOpacity>
        </View> 
    )
}

export default Login;

const styles = StyleSheet.create({

    buttonContent: {
        alignSelf : 'center',
        marginTop: 30
    },

    button: {
        backgroundColor: Colors.mainColor1,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
});