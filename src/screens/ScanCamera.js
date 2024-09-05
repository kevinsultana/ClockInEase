import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';
import ApiRequest from '../api/ApiRequest';

export default function ScanCamera({navigation, route}) {
  const token = route.params.token;

  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  async function checkCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('error check camera permission:', error);
    }
  }

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const presenseIn = async () => {
    try {
      const response = await ApiRequest(token).post('/presence-in', {
        status: 'Hadir',
        latitude: 123456,
        longitude: 123456,
        desc: '',
      });

      console.log(response.data);
      Alert.alert('', response.data.message);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log('Presensi masuk yang error', error);
    }
  };

  const presenseOut = async () => {
    try {
      const response = await ApiRequest(token).post('/presence-out', null);
      console.log(response.data);
      Alert.alert('', response.data.message);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error :', error.response.data);
      }
      console.log('Presensi keluar yang error', error);
    }
  };

  const PermissionsPage = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Camera permission is required to scan QR codes.</Text>
      <Button
        title="Request Permission"
        onPress={async () => {
          await Linking.openSettings();
        }}
      />
    </View>
  );

  const [scanned, setScanned] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      setScanned(true);
      onCodeRead(codes[0].value);
    },
  });

  const onCodeRead = value => {
    if (value === 'presensi-pulang') {
      presenseOut();
    } else if (value === 'presensi-masuk') {
      presenseIn();
    } else {
      Alert.alert(
        'Qr Code Tidak Di kenali',
        'Silahkan scan kembali qr nya',
        [
          {
            text: 'Scan Lagi',
            onPress: () => setScanned(false),
          },
          {
            text: 'kembali',
            onPress: () => navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    }
  };

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

  if (scanned === true) {
    return (
      <View style={styles.viewLoading}>
        <View style={styles.viewLoadingModal}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      </View>
    );
  } else
    return (
      <View style={{flex: 1}}>
        <Camera
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
        <Button title="kembali" onPress={() => navigation.goBack()} />
      </View>
    );
}
const styles = StyleSheet.create({
  viewLoadingModal: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 50,
    justifyContent: 'center',
  },
  viewLoading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
