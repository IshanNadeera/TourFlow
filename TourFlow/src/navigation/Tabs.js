import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Guide from '../screens/GuideManagement/GuidesView';
import Location from '../screens/LocationManagement/LocationsView';
import Restaurant from '../screens/RestaurantManagement/RestaurantView';
import Transport from '../screens/TransportManagement/TransportView';
import Colors from '../utils/Colors';
import {View, Image, Text} from 'react-native'

const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
    return(
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                elevation:10,
                borderRadius: 15,
                position: 'absolute',
                height: 70,
                left: 10,
                right: 10,
                bottom: 10,
                backgroundColor: Colors.mainColor2
            }
        }}>

            <Tab.Screen name = "Location" component = {Location}  navigation={navigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return(
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('../../img/locations.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: focused ? Colors.mainColor3 : Colors.fontColor2
                                    }} />
                                <Text style={{color : focused ? Colors.mainColor3 : Colors.fontColor2 }}>Locations</Text>
                            </View>
                        )
                    },
                    headerShown: false,
                    unmountOnBlur: true

                }}
            />

            <Tab.Screen name = "Restaurant" component = {Restaurant} navigation={navigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return(
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('../../img/restaurant.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.mainColor3 : Colors.fontColor2
                                    }} />
                                <Text style={{color : focused ? Colors.mainColor3 : Colors.fontColor2 }}>Restaurants</Text>
                            </View>
                        )
                    },
                    headerShown: false,
                    unmountOnBlur: true

                }}
            />

            <Tab.Screen name = "Transport" component = {Transport} navigation={navigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return(
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('../../img/transport.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.mainColor3 : Colors.fontColor2
                                    }} />
                                <Text style={{color : focused ? Colors.mainColor3 : Colors.fontColor2 }}>Transport</Text>
                            </View>
                        )
                    },
                    headerShown: false,
                    unmountOnBlur: true

                }}
            />

            <Tab.Screen name = "Guide" component = {Guide} navigation={navigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return(
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('../../img/tourist-guide.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? Colors.mainColor3 : Colors.fontColor2
                                    }} />
                                <Text style={{color : focused ? Colors.mainColor3 : Colors.fontColor2 }}>Guidance</Text>
                            </View>
                        )
                    },
                    headerShown: false,
                    unmountOnBlur: true

                }}
            />
            
        </Tab.Navigator>
    )
}

export default Tabs;