import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Colors from "../../utils/Colors";


const AddGuide = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>AddGuide</Text>
        </SafeAreaView>
    )
}

export default AddGuide;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    }
});