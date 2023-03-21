import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Colors from "../../utils/Colors";


const Restaurant = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Restaurant</Text>
        </SafeAreaView>
    )
}

export default Restaurant;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    }
});