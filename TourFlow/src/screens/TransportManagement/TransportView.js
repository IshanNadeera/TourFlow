import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import Colors from '../../utils/Colors';
import Lottie from 'lottie-react-native';
import Dropdown from 'react-native-input-select';
import SweetAlert from 'react-native-sweet-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Transport = ({ navigation }) => {
    const [province, setProvince] = React.useState();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getUser();
        setUsername(user.name);
        setRole(user.name);
        setFilteredData(data);
    }, [])

    useEffect(() => {
        setUsername(user.name);
        setRole(user.role);
    },[user])

    const getUser = async() => {
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

    const data = [
        {
            'company_id': '1',
            'company_name': "PickMe",
            'province': 'Uva',
            'city': 'Ella',
            'name':'Saman Perera',
            'mobile': '0775273900',
            'discription':'PickMe is a Sri Lankan taxi hailing and delivery app developed by Digital Mobility Solutions Ltd. It launched in June 2015. The app is available in English, Sinhala and Tamil on Android and iOS. By 2021 the company had 8000 registered users. PickMe has access to Tuk, Flex, Mini, Car, Minivan and Luxury cars.',
            'img': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/PickMe_SriLanka_Logo.png'
        },
        {
            'company_id': '2',
            'company_name': "Kangaroo Cabs",
            'province': 'Southern',
            'city': 'Matara',
            'name':'Kusum Perera',
            'mobile': '0775273901',
            'discription':'Airport pick up Colombo Srilanka, Taxi Cab Colombo Sri lanka, offering the lowest rates in airport transfers in Sri Lanka We are the pioneering Cab company in Sri Lanka, having started our operations in Nineteen Eighty Eight and today we are enjoying 70% of the market share to proudly be the market leader in Cab service industry in the country. Kangaroo caters its services for all walks of life with 23 years of experience under its belt. Its operations have been 24/7 365 Days around the clock. Geared with the latest technologies to enhance quality and service from the start to the end',
            'img': 'https://play-lh.googleusercontent.com/jZlLzZHaWY0iHmrq8Uvw9qGUHUrE8wrLv6l-RO1SW3AFg4wiaICf7FX99OOHg0_3u5vx'
        },
        {
            'company_id': '3',
            'company_name': "Uber",
            'province': 'Southern',
            'city': 'Galle',
            'name':'Wasantha Perera',
            'mobile': '0775273902',
            'discription':'Uber Technologies, Inc., based in San Francisco, provides mobility as a service/ride-hailing, food delivery/package delivery/couriers via Uber Eats and Postmates, and freight transport.',
            'img': 'https://play-lh.googleusercontent.com/AQtSF5Sl18yp3mQ2tcbOrBLekb7cyP3kyg5BB1uUuc55zfcnbkCDLHFTBwZfYiu1aDI'
        },
        {
            'company_id': '4',
            'company_name': "Lotus Cabs",
            'province': 'Western',
            'city': 'Avissawella',
            'name':'Palitha Perera',
            'mobile': '0775273903',
            'discription':'Uber Technologies, Inc., based in San Francisco, provides mobility as a service/ride-hailing, food delivery/package delivery/couriers via Uber Eats and Postmates, and freight transport.',
            'img': 'https://media-cdn.tripadvisor.com/media/photo-s/1b/50/47/55/lotus-cabs-and-tours.jpg'
        },
        {
            'company_id': '5',
            'company_name': "Taxi Cabs",
            'province': 'Northern',
            'city': 'Jaffna',
            'name':'Chamara Perera',
            'mobile': '0775273905',
            'discription':'Uber Technologies, Inc., based in San Francisco, provides mobility as a service/ride-hailing, food delivery/package delivery/couriers via Uber Eats and Postmates, and freight transport.',
            'img': 'https://i.pinimg.com/originals/84/b8/69/84b8696db1c395655d572fa6ec3af774.png'
        }
    ];

    const onPressCompany = (id, cname,name,province,mobile,city,dis,url) => {
        //navigation.navigate('LocationSingle', {id: id, cname:cname,name: name,province:province,mobile:mobile,city: city,dis:dis,url:url});
    }

    const dropdownFilter = (text) => {
        if(text!='ALL'){
            const newData = data.filter((item) => {
                const itemData = item.province ? item.province.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setProvince(text);
        }else if(text =='ALL'){
            const newData = data;
            setFilteredData(newData);
            setProvince(text);
        }else{
            setFilteredData(data);
            setProvince(text);
        }
    }

    const TaxiItem = ({id, cname,name,province,mobile,city,dis,url}) => (
        <TouchableNativeFeedback onPress={ () => { onPressCompany(id, cname,name,province,mobile,city,dis,url) }}>
            <View style={styles.CompanyContainer}>
                <Image style={styles.image} src={url} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{cname}</Text>
                    <Text style={styles.simpletext}>{city}</Text>
                    <Text style={styles.simpletext}>{name}</Text>
                </View>
                <Lottie style={{position: 'absolute', width: '35%', alignSelf:'flex-end',right:10,bottom:55}} source={require('../../../img/right.json')} autoPlay loop />
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
                </View> : null }

            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ padding: 3 }}
                    removeClippedSubviews={true}
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TaxiItem
                            id={item.company_id}
                            cname={item.company_name}
                            name={item.name}
                            province ={item.province}
                            mobile ={item.mobile}
                            city={item.city}
                            discription={item.discription}
                            url={item.img}
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
        width : '100%',
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
    image : {
        width : '25%',
        height : '100%',
        borderRadius : 15,
        resizeMode: 'cover'
    },
    
    textContainer : {
        flex : 1,
        flexDirection : 'column',
        left: 120,
        position: 'absolute' ,
        zIndex: 3,
        elevation:4,
    },

    text : {
        fontWeight : 'bold',
        fontSize : 17,
        color : Colors.fontColor1
    },

    CompanyContainer: {
        width : '100%',
        height : 100,
        marginVertical : 10,
        borderRadius : 15,
        backgroundColor : '#FFF',
        borderColor: '#000',
        borderWidth: 0,
        elevation:2,
    },

    simpletext : {
        fontSize : 13,
        color: Colors.fontColor1
    },
});
