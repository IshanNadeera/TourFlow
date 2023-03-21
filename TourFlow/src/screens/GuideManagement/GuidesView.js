import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Colors from "../../utils/Colors";


const Guide = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Guide</Text>
        </SafeAreaView>
    )
}

export default Guide;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    }
});