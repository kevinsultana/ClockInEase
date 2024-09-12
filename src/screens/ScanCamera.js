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
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';
import ApiRequest from '../api/ApiRequest';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../component';
import {useSelector} from 'react-redux';

export default function ScanCamera({navigation, route}) {
  const token = useSelector(state => state.credential.token);
  // const token = route.params.token;
  const userName = route.params.userName;

  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  async function checkCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
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
      navigation.goBack();
    } catch (error) {
      console.log('Presensi masuk yang error', error);
    }
  };

  const presenseOut = async () => {
    try {
      const response = await ApiRequest(token).post('/presence-out', null);
      console.log(response.data);
      if (
        response.data.message ==
        `HAI ${userName.toUpperCase()} ANDA BELUM PRESENSI MASUK, SILAHKAN PRESENSI MASUK TERLEBIH DAHULU`
      ) {
        Alert.alert('', 'Presensi Masuk Terlebih Dahulu.', [
          {text: 'OK', onPress: () => setScanned(false)},
        ]);
      } else {
        Alert.alert('', response.data.message);
        navigation.goBack();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error :', error.response.data);
      }
      console.log('Presensi keluar yang error', error);
    }
  };

  const PermissionsPage = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={styles.viewModalPermission}>
        <Icon name={'alert'} size={25} color={'black'} />
        <Gap width={20} />
        <Text style={{color: 'black', fontSize: 16}}>
          Izin Kamera Diperlukan
        </Text>
        <Gap width={20} />
        <TouchableOpacity>
          <View style={styles.viewModalHeader}>
            <Icon
              name={'refresh'}
              size={25}
              color={'black'}
              onPress={async () => {
                await Linking.openSettings();
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
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
          style={{width: '100%', height: '100%'}}
          device={device}
          isActive={true}
        />
        <TouchableOpacity
          style={styles.viewLocBtn}
          onPress={() => navigation.goBack()}>
          <View style={styles.viewBtn}>
            <Text style={{color: 'black', fontSize: 20}}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: 100,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLocBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginVertical: -50,
  },
  viewModalHeader: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  viewModalPermission: {
    height: 80,
    width: '80%',
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
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
