import React, {useState, createRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ImageBackground, Alert } from "react-native";
import Colors from "../utils/Colors";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import SweetAlert from 'react-native-sweet-alert';

const Register = ({ navigation }) => {

    const staticImage = require("../../img/tourflow_logo.png");
    const image = require("../../img/bg3.jpeg");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const onPressLogin = () => {
        navigation.navigate('Login');
    };

    const onPressRegister = () => {

        if(name == '' || email == '' || password == '' || cPassword == ''){
            SweetAlert.showAlertWithOptions({
                title: 'Error!',
                subTitle: 'Input fields cannot be empty',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
        }else if(password != cPassword){
            SweetAlert.showAlertWithOptions({
                title: 'Error!',
                subTitle: 'Passwords not matched',
                confirmButtonTitle: 'OK',
                confirmButtonColor: 'green',
                style: 'error',
                cancellable: false
            });
        }else{
            const role = 'user';

            auth().createUserWithEmailAndPassword(email,password)
                .then(()=> {
                    firestore().collection("users").doc(auth().currentUser.uid).set({
                        uid: auth().currentUser.uid,
                        name,
                        email,
                        role
                    })

                    SweetAlert.showAlertWithOptions({
                        title: 'Success!',
                        subTitle: 'Registration Success. Please Login to proceed',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: 'green',
                        style: 'error',
                        cancellable: false
                    },
                    callback => navigation.navigate('Login'));

                })
                .catch((error)=>{
                    if (error.code === "auth/email-already-in-use"){
                        SweetAlert.showAlertWithOptions({
                            title: 'Error!',
                            subTitle: 'That email address is already in use!',
                            confirmButtonTitle: 'OK',
                            confirmButtonColor: 'green',
                            style: 'error',
                            cancellable: false
                        });
                    }else if(error.code === "auth/invalid-email"){
                        SweetAlert.showAlertWithOptions({
                            title: 'Error!',
                            subTitle: 'That email address is invalid!',
                            confirmButtonTitle: 'OK',
                            confirmButtonColor: 'green',
                            style: 'error',
                            cancellable: false
                        });
                    }else if(error.code === "auth/weak-password"){
                        SweetAlert.showAlertWithOptions({
                            title: 'Error!',
                            subTitle: 'Password should be at least 6 characters',
                            confirmButtonTitle: 'OK',
                            confirmButtonColor: 'green',
                            style: 'error',
                            cancellable: false
                        });
                    }
                    console.log(error.message);
                });
        }
    };

    return(
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>

            <View style = {styles.formContent}>

                <Image style ={styles.bgImg} source={staticImage}></Image>
                <Text style = {{fontSize:30, fontWeight: 'bold', color: Colors.fontColor1, marginTop: 10,marginBottom: 10, fontFamily: 'sans-serif-condensed'}}>Register from here!</Text>

                <Text style={styles.textLabel}>Name</Text>
                <TextInput
                    placeholder='Enter your name'
                    style={styles.input}
                    onChangeText={(name) =>
                        setName(name)
                    }
                />

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
                    secureTextEntry={true}
                    onChangeText={(pass) =>
                        setPassword(pass)
                    }
                />

                <Text style={styles.textLabel}>Confirm password</Text>
                <TextInput
                    placeholder='Enter your password again'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(cPass) =>
                        setCPassword(cPass)
                    }
                />

                <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.button} onPress={onPressRegister}>
                        <Text style={{color: '#fff', fontSize: 16}}>Register</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.bottomContent}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color: Colors.fontColor1, fontSize: 16}}>Already have an account?</Text>
                    <TouchableOpacity style={{marginLeft: 5}} onPress={onPressLogin}>
                        <Text style={{color: Colors.mainColor2, fontSize: 16}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection : 'column',
        backgroundColor : Colors.bgColor
    },

    topContent : {
        marginTop:20,
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
    },

    bgImg: {
        width: 100,
        height: 100,
        borderRadius: 30,
        marginRight: '2%',
        marginTop:10,
    },

    imageBg: {
        flex: 1,
        justifyContent: 'center',
    },

    appname : {
        fontWeight : 'bold',
        fontSize : 50,
        color : Colors.themeColor
    },

    formContent : {
        flex : 6,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        // backgroundColor: 'rgba(60,60,60,.1)',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
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
        marginBottom: 20
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
        flex: 0.3,
        alignSelf : 'center',
    }
})

export default Register;