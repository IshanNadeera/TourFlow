import React, {useState, createRef, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import Colors from "../utils/Colors";
import SweetAlert from 'react-native-sweet-alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RestaurantInitial = ({ navigation }) => {

}

export default RestaurantInitial;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection : 'column',
        backgroundColor: Colors.fontColor2,
    },

    BottomView: {
        flex: 3,
        // backgroundColor: Colors.mainColor1,
        justifyContent: 'center',
    },

    formContainer: {
        backgroundColor: 'rgba(60,60,60,.1)',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textLabel : {
        alignSelf : 'flex-start',
        color: Colors.mainColor2,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: '4%'
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

    bottomContent: {
        alignSelf : 'center',
        marginBottom: 20
    },

    imageBg: {
        flex: 1,
        justifyContent: 'center',
    },

});