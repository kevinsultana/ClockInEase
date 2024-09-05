import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';
import ApiRequest from '../api/ApiRequest';

export default function ScanCamera({navigation, route}) {
  const token = route.params.token;

  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const {requestCameraPermission} = useCameraPermission();

  const handleRequestPermission = async () => {
    const permission = await requestCameraPermission;
    console.log(permission);
    if (permission === undefined) {
      await Linking.openSettings();
      // di arahkan ke setting
    } else {
      // Handle the case where permission is denied
    }
  };

  const presenseIn = async () => {
    try {
      const response = await ApiRequest(token).post('/presence-in', {
        status: 'Hadir',
        latitude: 123456,
        longitude: 123456,
        desc: '',
      });
      // const response = await axios.post(
      //   'https://dev.pondokdigital.pondokqu.id/api/presence-in',
      //   {
      //     status: 'Hadir',
      //     latitude: 123456,
      //     longitude: 123456,
      //     desc: '',
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       Authorization: `bearer ${token}`,
      //     },
      //   },
      // );
      console.log(response.data);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log('Presensi masuk yang error', error);
    }
  };

  const presenseOut = async () => {
    try {
      const response = await ApiRequest(token).post('/presence-out', null);
      // const response = await axios.post(
      //   'https://dev.pondokdigital.pondokqu.id/api/presence-out',
      //   null,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `bearer ${token}`,
      //     },
      //   },
      // );
      console.log(response.data);
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
    <View>
      <Text>Camera permission is required to scan QR codes.</Text>
      <Button
        title="Request Permission"
        onPress={() => {
          handleRequestPermission();
        }}
      />
    </View>
  );

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

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
      // console.log('hit presensi pulang');
    } else if (value === 'presensi-masuk') {
      presenseIn();
      // console.log('hit presensi masuk')
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
  if (scanned === true) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 200,
            height: 200,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
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
const styles = StyleSheet.create({});
