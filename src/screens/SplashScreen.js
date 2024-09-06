import {Image, StyleSheet, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../component';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import ApiRequest from '../api/ApiRequest';

export default function SplashScreen({navigation}) {
  async function refreshToken() {
    try {
      const credentials = await EncryptedStorage.getItem('credentials');
      if (credentials) {
        const response = await ApiRequest().post(
          '/login',
          JSON.parse(credentials),
        );
        navigation.replace('Home', {token: response.data.token});
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else console.log('credential gagal di ambil');
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Background />
      <View style={styles.viewImage}>
        <Image
          source={require('../assets/QrCodeScanner.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.textVer}>v1.0.0-aplha-rc</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textVer: {
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 110,
    height: 110,
  },
  viewImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
