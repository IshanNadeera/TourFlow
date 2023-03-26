import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from "@react-navigation/native";



const Transport = ({ navigation }) => {

    const isFocused = useIsFocused();

    const [province, setProvince] = React.useState();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        getUser();
        getCompany();

        setUsername(user.name);
        setRole(user.name);
    }, [isFocused])

    useEffect(() => {
        setUsername(user.name);
        setRole(user.role);
    }, [user]);

    const getCompany = async() => {

        var data = [];

        firestore()
        .collection('Company')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                data.push(documentSnapshot.data());
            });
            setFilteredData(data);
            setAllData(data);
        });
    }

    const getUser = async () => {
        try {
            const userValue = await AsyncStorage.getItem('User');
            setUser(JSON.parse(userValue));

        } catch (error) {
            console.log(error);
        }
    }

    const addComapny = () => {
        navigation.navigate('AddTransport');
    }

    const onPressCompany = (id, cname, name, province, mobile, city, dis, url) => {
        navigation.navigate('SingleCompany', { id: id, cname: cname, name: name, province: province, mobile: mobile, city: city, dis: dis, url: url });
    }

    const dropdownFilter = (text) => {
        if (text != 'ALL') {
            const newData = allData.filter((item) => {
                const itemData = item.province ? item.province.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setProvince(text);
        } else if (text == 'ALL') {
            const newData = allData;
            setFilteredData(newData);
            setProvince(text);
        } else {
            setFilteredData(allData);
            setProvince(text);
        }
    }

    const TaxiItem = ({ id, cname, name, province, mobile, city, dis, url }) => (
        <TouchableNativeFeedback onPress={() => { onPressCompany(id, cname, name, province, mobile, city, dis, url) }}>
            <View style={styles.CompanyContainer}>
                <Image style={styles.image} source={{uri: "data:image/png;base64,"+url}} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{cname}</Text>
                    <Text style={styles.simpletext}>{city}</Text>
                    <Text style={styles.simpletext}>{name}</Text>
                </View>
                <Lottie style={{ position: 'absolute', width: '35%', alignSelf: 'flex-end', right: 10, bottom: 55 }} source={require('../../../img/right.json')} autoPlay loop />
            </View>
        </TouchableNativeFeedback>
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={{
                flexDirection: 'row', alignSelf: 'center', alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.mainColor2, marginTop: 20, marginBottom: 5 }}>Choose a Transport...</Text>
            </View>
            <Dropdown

                placeholder="Select the Province"
                options={[
                    { name: 'All', code: 'ALL' },
                    { name: 'Central Province', code: 'Central' },
                    { name: 'Eastern Province', code: 'Eastern' },
                    { name: 'North Central Province', code: 'North Central' },
                    { name: 'Northern Province', code: 'Northern' },
                    { name: 'North Western Province', code: 'North Western' },
                    { name: 'Sabaragamuwa Province', code: 'Sabaragamuwa' },
                    { name: 'Southern Province', code: 'Southern' },
                    { name: 'Uva Province', code: 'Uva' },
                    { name: 'Western Province', code: 'Western' },
                ]}
                optionLabel={'name'}
                optionValue={'code'}
                selectedValue={province}
                onValueChange={(value) => dropdownFilter(value)}
                dropdownStyle={{
                    width: "93%",
                    marginLeft: "3.5%",
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 10,
                    color: "#929292",
                }}
                dropdownContainerStyle={{
                    color: "#929292",
                    borderColor: 'grey',
                }}

                selectedItemStyle={{ color: Colors.fontColor1 }}
                primaryColor="#929292"
            />

            <Lottie
                style={{ width: '40%' }}
                source={require('../../../img/car.json')}
                autoPlay
                loop
            />
            {role == 'admin' ? <View style={styles.buttonContent}>
                <TouchableOpacity style={styles.button} activeOpacity={0.5}
                    onPress={addComapny}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Add Company</Text>
                </TouchableOpacity>
            </View> : null}

            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ padding: 3 }}
                    removeClippedSubviews={true}
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TaxiItem
                            id={item.company_id}
                            cname={item.company_name}
                            name={item.driver}
                            province={item.province}
                            mobile={item.number}
                            city={item.city}
                            dis={item.description}
                            url={item.url}
                        />
                    }
                    keyExtractor={(item) => item.company_id}
                    initialNumToRender={6}
                />
            </View>
        </SafeAreaView>
    );
};

export default Transport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: '20%'
    },
    buttonContent: {
        alignSelf: 'center'
    },
    button: {
        backgroundColor: Colors.mainColor2,
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "2%",
    },
    image: {
        width: '25%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover'
    },

    textContainer: {
        flex: 1,
        flexDirection: 'column',
        left: 120,
        position: 'absolute',
        zIndex: 3,
        elevation: 4,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 17,
        color: Colors.fontColor1
    },

    CompanyContainer: {
        width: '100%',
        height: 100,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderWidth: 0,
        elevation: 2,
    },

    simpletext: {
        fontSize: 13,
        color: Colors.fontColor1
    },
});
