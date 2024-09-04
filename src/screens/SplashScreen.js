import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../component';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function SplashScreen({navigation}) {
  async function refreshToken() {
    try {
      const credentials = await EncryptedStorage.getItem('credentials');
      if (credentials) {
        const response = await axios.post(
          'https://dev.pondokdigital.pondokqu.id/api/login',
          JSON.parse(credentials),
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setTimeout(() => {
          navigation.replace('Home', {token: response.data.token});
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      }
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
      console.log('credential gagal di ambil');
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.viewImage}>
        <Image
          source={require('../assets/QrCodeScanner.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
