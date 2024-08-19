import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../component';

export default function SplashScreen({navigation}) {
  const loading = setTimeout(() => {
    navigation.replace('Login');
  }, 2000);

  useEffect(() => {
    loading;
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
