import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Colors from "../../utils/Colors";


const Location = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Location</Text>
        </SafeAreaView>
    )
}

export default Location;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    }
});