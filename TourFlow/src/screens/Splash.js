import React, { useState, useEffect } from "react";
import {SafeAreaView, ActivityIndicator, Text, View, StyleSheet, Image, } from "react-native";
import Colors from "../utils/Colors";

const Splash = ({ navigation }) => {


    const [animating, setAnimating] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
            navigation.navigate('Login');
      }, 3000);
    }, []);

    return(
        <SafeAreaView style={{ flex: 1 , backgroundColor: Colors.mainColor1}}>
            <View style={styles.container}>
            <Image
                source={require("../../img/tourflow_logo.png")}
                style={{
                width: "75%",
                height : "40%",
                resizeMode: "contain",
                margin: 20,
                }}
            />
            <ActivityIndicator
                animating={animating}
                color= "#FF385C"
                size="large"
                style={styles.activityIndicator}
            />
            </View>
        </SafeAreaView>
    )
}

export default Splash;
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    activityIndicator: {
        alignItems: "center",
        height: 80,
    },
});