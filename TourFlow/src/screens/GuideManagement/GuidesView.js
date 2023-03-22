import React from "react";
import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, FlatList,  } from 'react-native'
import Colors from "../../utils/Colors";
import Lottie from 'lottie-react-native';


const Guide = ({navigation}) => {

    const cards = [
        { name: 'guide 1', location:'kandy' },
        { name: 'guide 2', location:'kandy' },
        { name: 'guide 3', location:'kandy' },
        { name: 'guide 4', location:'kandy' },
        { name: 'guide 5', location:'kandy' },
        { name: 'guide 6', location:'kandy' },
        { name: 'guide 7', location:'kandy' },
        { name: 'guide 8', location:'kandy' },
        { name: 'guide 9', location:'kandy' },
        { name: 'guide 10', location:'kandy' },
    ];

    const selectGuide = () => {
        navigation.navigate('Initial');
    };

    const OrderItem = ({ name, img, location }) => (
        
        <TouchableWithoutFeedback>
            <View style={styles.card}>
                <Text style={{ marginTop:10, color:'black' }}>Location: {location}, name: {name} </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const addGuide = () => {
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

            <View style={styles.buttonContent}>
                <TouchableOpacity style={styles.button} onPress={addGuide}>
                    <Text style={styles.headerText}>+ Add Guide</Text>
                </TouchableOpacity>
            </View> 

            <View style={styles.BottomView}>
                <View style={styles.formContainer}>
                    <Text style={styles.textLabel}>Location</Text>
                    <TextInput
                        placeholder='Enter Location'
                        style={styles.input}
                    />

                </View>
            </View>

            <View style={styles.subContainer}>

                <Text style={styles.subText}>Guide List</Text>

                <View style={styles.ordersContainer}>
                    <ScrollView horizontal={true}>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{paddingBottom: 10}}
                            data={cards}
                            renderItem={({ item }) =>
                                <OrderItem
                                    name={item.name}
                                    img={item.img}
                                    location={item.location}
                                />
                            }
                            keyExtractor={(item) => item.name}
                            initialNumToRender={5}
                        /> 
                    </ScrollView>
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
    
    headerText: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        backgroundColor : 'gray'
    },

    BottomView: {
        flex: 3,
        marginTop:-80,
        // backgroundColor : 'red',
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

    card: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 10,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    subContainer: {
        flex : 1,
        marginTop: -200,
        backgroundColor : Colors.bgColor,
        padding: 0,
        align:'center',
    },

    subText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.themeColor,
        textAlign: 'center',
    },

    ordersContainer: {
        // borderColor: 'black',
        // borderWidth: 2,
        height: '90%',
    },

    buttonContent: {
        alignSelf : 'center',
        marginTop: 30
    },

});