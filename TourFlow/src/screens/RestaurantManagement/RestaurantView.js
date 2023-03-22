import React from "react";
import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';


const Restaurant = ({navigation}) => {

    const selectGuide = () => {
        navigation.navigate('Initial');
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:2.5, marginTop: 10}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style = {{fontSize:50, fontWeight: 'bold', color: Colors.resturantColor, marginTop: 10, marginLeft: 10}}>Resturants</Text>
                </View>
                <Lottie style={{width: '80%',marginLeft:20, marginTop:-20}} source={require('../../../img/cooking.json')} autoPlay loop />
                <Text style = {{fontSize:22, fontWeight: 'bold', color: Colors.fontColor4, textAlign: 'center'}}>Discover the Best Sri Lankan Taste</Text>
            </View>

            <View style={styles.BottomView}>
                
            <Text style = {{fontSize:15, fontWeight: 'bold', color: Colors.fontColor1, textAlign: 'center',width:330,marginTop:-90}}> Based on the compilation of hundreds of guidebooks, thousands of media publications, and millions of online reviews, Tour Flow offers the world’s best restaurant selection at your fingertips wherever you go.</Text>
          
                     <View style={styles.buttonContent}>
                        <TouchableOpacity style={styles.button} onPress={selectGuide}>
                            <Text style={{color: '#fff', fontSize: 16}}>Explore More</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder='Search By Your Location'
                        style={styles.input}
                    />
            </View>
           

        </SafeAreaView>
    )
}

export default Restaurant;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : Colors.bgColor
    },

    BottomView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formContainer: {
        backgroundColor: Colors.fontColor2,
        borderRadius: 10,
        marginVertical: 100,
        marginHorizontal: 0,
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
        marginTop: -15,
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
        marginTop: 20,
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

});