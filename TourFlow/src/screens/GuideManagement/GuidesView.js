import React from "react";
import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';


const Guide = ({navigation}) => {

    const selectGuide = () => {
        navigation.navigate('Initial');
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:2.5, marginTop: 10}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor1, marginTop: 10, marginLeft: 10}}>Tour</Text>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 10, marginLeft: 10}}>Flow</Text>
                </View>
                <Lottie style={{width: '100%'}} source={require('../../../img/guide.json')} autoPlay loop />
                <Text style = {{fontSize:30, fontWeight: 'bold', color: Colors.fontColor1, textAlign: 'center'}}>Select Your Guide!</Text>
            </View>

            <View style={styles.BottomView}>
                <View style={styles.formContainer}>
                    <Text style={styles.textLabel}>Location</Text>
                    <TextInput
                        placeholder='Enter Location'
                        style={styles.input}
                    />

                    <View style={styles.buttonContent}>
                        <TouchableOpacity style={styles.button} onPress={selectGuide}>
                            <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default Guide;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    BottomView: {
        flex: 3,
    },

    formContainer: {
        backgroundColor: Colors.fontColor2,
        padding: 10,
        borderRadius: 10,
        marginVertical: 100,
        marginHorizontal: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textLabel : {
        alignSelf : 'flex-start',
        color: Colors.mainColor2,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10,
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

});