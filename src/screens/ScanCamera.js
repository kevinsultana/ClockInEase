import {Button, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function ScanCamera({navigation}) {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const [scannedCode, setScannedCode] = useState();
  // const dataScannedCode = scannedCode[0].value;
  // console.log(dataScannedCode);
  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      setScannedCode(codes);
    },
  });

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
