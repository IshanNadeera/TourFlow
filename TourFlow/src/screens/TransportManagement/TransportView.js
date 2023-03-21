import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Colors from "../../utils/Colors";


const Transport = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Transport</Text>
        </SafeAreaView>
    )
}

export default Transport;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    }
});