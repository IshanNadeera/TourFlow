import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';

const RestaurantHelp = ({navigation}) => {
  const image = require('../../../img/tea.jpg');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.imageBg}>
          <View style={styles.imageContent}>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 'bold',
                marginLeft: 120,
                marginTop: 50,
                borderBottom: 50,
              }}>
              Need Help ?{' '}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.imageContent1}>
        <Text
          style={{
            color: '#00aecd',
            fontSize: 22,
            fontWeight: 'bold',
            padding:10,
            marginTop: 50,
            borderBottom: 50,
            textAlign: 'justify',
          }}>
          Hotels/experiences included in the Plus program{' '}
        </Text>

        <Text
          style={{
            color: 'black',
            fontSize: 16,
            padding: 10,
            marginTop: 30,
            borderBottom: 50,
            textAlign: 'justify',
          }}>
          The Plus program provides perks and special offers on select hotels
          and experiences around the globe. Look out for the Tripadvisor Plus
          logo across the site or use our Plus filter to find offers that are
          part of the program.{' '}
        </Text>
      </View>

      <Text
        style={{
          color: 'black',
          fontSize: 16,
          padding: 10,
          marginTop: 30,
          borderBottom: 50,
          textAlign: 'justify',
        }}>
        The specific cancellation and refund policies of each Plus booking will
        vary. For specific questions, please reference the My Bookings section
        of your member profile or contact the Plus Helpdesk.{' '}
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 16,
          padding: 10,
          marginTop: 30,
          borderBottom: 50,
          textAlign: 'justify',
        }}>
        You can cancel your reservation through the My Bookings link in the menu
        under your member avatar at the top right corner of the page.{' '}
      </Text>

      <Lottie
        style={{width: '60%', marginLeft: 42}}
        source={require('../../../img/online-food-delivery-process.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default RestaurantHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  imageBg: {
    height: 100,
  },
});
