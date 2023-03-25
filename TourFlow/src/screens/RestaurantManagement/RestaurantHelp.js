import React, {useState, createRef, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import Colors from "../utils/Colors";
import SweetAlert from 'react-native-sweet-alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const image = require("../../img/bg3.jpeg");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
        if(email == '' || password == ''){
            SweetAlert.showAlertWithOptions({
                title: 'Error!',
                subTitle: 'Input fields cannot be empty',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
        }else{
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user)=> {
                const userId = user.user.uid

                firestore()
                .collection('users')
                .where('uid', '==', userId)
                .get()
                .then(querySnapshot => {

                  querySnapshot.forEach(documentSnapshot => {
                    storeData(documentSnapshot.data());
                  });
                });
                navigation.navigate('Initial');
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email"){
                    SweetAlert.showAlertWithOptions({
                        title: 'Error!',
                        subTitle: 'That email address is invalid',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    });
                }else if (error.code === "auth/wrong-password"){
                    SweetAlert.showAlertWithOptions({
                        title: 'Error!',
                        subTitle: 'Password in invalid',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    });
                }
                else if (error.code === "auth/user-not-found"){
                    SweetAlert.showAlertWithOptions({
                        title: 'Error!',
                        subTitle: 'No User Found, Check credentials again',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    });
                }
                else if (error.code === "auth/network-request-failed"){
                    SweetAlert.showAlertWithOptions({
                        title: 'Error!',
                        subTitle: 'Please check your internet connection',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    });
                }
                console.log(error.message);
            })
        }
    };

    const storeData = async (value) => {

        try {
            await AsyncStorage.clear();

            await AsyncStorage.setItem('User', JSON.stringify(value));

        } catch (error) {
            console.log(error);
            return;
        }
    }

    const onPressRegister = () => {
        navigation.navigate('Register');
    };

    return(
        <SafeAreaView style={styles.container}>

            <View style={{flex:1.7, marginTop: 10}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor1, marginTop: 10, marginLeft: 10}}>Tour</Text>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 10, marginLeft: 10}}>Flow</Text>
                </View>
                <Lottie style={{width: '100%'}} source={require('../../img/login.json')} autoPlay loop />
            </View>

            <View style={styles.BottomView}>
                <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>

                    <View style={styles.formContainer}>

                        <Text style = {{alignSelf: 'flex-start',fontSize:30, fontWeight: 'bold', color: Colors.fontColor1, marginLeft: 10}}>Welcome Back!</Text>

                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput
                            placeholder='Enter your email'
                            style={styles.input}
                            onChangeText={(email) =>
                                setEmail(email)
                            }
                        />

                        <Text style={styles.textLabel}>Password</Text>
                        <TextInput
                            placeholder='Enter your password'
                            style={styles.input}
                            onChangeText={(password) =>
                                setPassword(password)
                            }
                        />

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                                <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomContent}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 16}}>Don't have an account?</Text>
                                <TouchableOpacity style={{marginLeft: 5}} onPress={onPressRegister}>
                                    <Text style={{color: Colors.mainColor2, fontSize: 16}}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </ImageBackground>
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