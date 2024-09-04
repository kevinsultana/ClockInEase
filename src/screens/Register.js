import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, FormInput, Gap} from '../component';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('pria');
  const [jabatan, setJabatan] = useState('staff');

  const instance = axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const [divisi, setDivisi] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState(0);
  const [departement, setDepartement] = useState([]);
  const [selectedDepartemen, setSelectedDepartemen] = useState(0);
  const [cabang, setCabang] = useState([]);
  const [selectedCabang, setSelectedCabang] = useState(0);
  // console.log(divisi);
  // console.log(selectedDivisi);

  const getDivision = async () => {
    try {
      const response = await instance.get('/getAllDivision');
      setDivisi(response.data);
      getDepartement(response.data[0].id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          'Axios error divisi:',
          error.response?.data || error.message,
        );
      } else {
        console.log('Submit error divisi:', error);
      }
    }
  };

  const getDepartement = async divisiId => {
    try {
      const response = await instance.get(`/getDepartment/${divisiId}`);
      if (response.data) {
        setDepartement(response.data);
      } else {
        setDepartement([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          'Axios error departemen:',
          error.response?.data || error.message,
        );
      } else {
        console.log('Submit error departemen:', error);
      }
    }
  };

  const getBranches = async () => {
    try {
      const response = await instance.get('/branches');
      setCabang(response.data);
    } catch (error) {
      console.log('error cabang:', error);
    }
  };

  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://dev.pondokdigital.pondokqu.id/api/register',
        {
          name: name,
          gender: gender,
          email: email,
          phone_number: phoneNumber,
          password: password,
          division: selectedDivisi,
          departement: selectedDepartemen,
          branch: selectedCabang,
          position: jabatan,
          device_model: 1234,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const responseLogin = await axios.post(
        'https://dev.pondokdigital.pondokqu.id/api/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      await EncryptedStorage.setItem(
        'credentials',
        JSON.stringify({email: email, password: password}),
      );
      setLoading(false);
      navigation.replace('Home', {token: response.data.token});
      ToastAndroid;
      // navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        Alert.alert('Gagal register', error.response.data.message);
        console.log(error.response.data);
      } else {
        console.log('register error:', error);
      }
    }
  };
  useEffect(() => {
    getDivision();
    getBranches();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView>
        <Gap height={20} />
        <View style={{justifyContent: 'center', flex: 1}}>
          <View>
            <View style={styles.viewLogin}>
              <Text style={styles.textLogin}>Daftar</Text>
              <Gap height={10} />

              {/* Input Nama */}
              <FormInput
                value={name}
                onChangeText={text => setName(text)}
                title={'Nama Lengkap'}
                password={false}
                iconName={'account-circle'}
                placeholder={'Masukkan Nama...'}
              />

              <Gap height={20} />

              {/* Picker Gender */}
              <View style={styles.viewPickerContainer}>
                <Text style={styles.textPicker}>Gender</Text>
                <View style={styles.viewPicker}>
                  <Gap width={30} />
                  <Icon name={'human-male-female'} size={20} color={'black'} />
                  <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={itemValue => setGender(itemValue)}>
                    <Picker.Item label="Pria" value={'pria'} />
                    <Picker.Item label="Wanita" value={'wanita'} />
                  </Picker>
                </View>
              </View>

              <Gap height={20} />

              {/* Input Nomer Telepon */}
              <FormInput
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                title={'Nomor Telepon'}
                password={false}
                iconName={'phone'}
                placeholder={'08123456789'}
                keyboardType={'number-pad'}
              />

              <Gap height={20} />

              {/* Input Email */}
              <FormInput
                value={email}
                onChangeText={text => setEmail(text)}
                title={'Email'}
                password={false}
                iconName={'gmail'}
                placeholder={'Masukkan Email Disini'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />

              <Gap height={20} />

              {/* Input Password */}
              <FormInput
                value={password}
                onChangeText={text => setPassword(text)}
                title={'Password'}
                password={true}
                iconName={'lock'}
                placeholder={'Masukkan Password Disini'}
                autoCapitalize={'none'}
              />

              <Gap height={20} />

              {/* picker Divisi */}
              <View style={styles.viewPickerContainer}>
                <Text style={styles.textPicker}>Pilih Divisi</Text>
                <View style={styles.viewPicker}>
                  <Gap width={30} />
                  <Icon name={'office-building'} size={20} color={'black'} />
                  <Picker
                    selectedValue={selectedDivisi}
                    style={styles.picker}
                    onValueChange={itemValue => {
                      setSelectedDivisi(itemValue);
                      getDepartement(itemValue);
                    }}>
                    {divisi.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <Gap height={20} />

              {/* picker Departemen */}
              <View style={styles.viewPickerContainer}>
                <Text style={styles.textPicker}>Pilih Departemen</Text>
                <View style={styles.viewPicker}>
                  <Gap width={30} />
                  <Icon
                    name={'office-building-outline'}
                    size={20}
                    color={'black'}
                  />
                  <Picker
                    selectedValue={selectedDepartemen}
                    style={styles.picker}
                    onValueChange={value => setSelectedDepartemen(value)}>
                    {departement[0] ? (
                      departement.map(item => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      ))
                    ) : (
                      <Picker.Item
                        label={'Departemen Belum Tersedia'}
                        value={'Departemen Belum Tersedia'}
                      />
                    )}
                  </Picker>
                </View>
              </View>

              <Gap height={20} />

              {/* picker Cabang */}
              <View style={styles.viewPickerContainer}>
                <Text style={styles.textPicker}>Pilih Cabang</Text>
                <View style={styles.viewPicker}>
                  <Gap width={30} />
                  <Icon name={'source-merge'} size={20} color={'black'} />
                  <Picker
                    selectedValue={selectedCabang}
                    style={styles.picker}
                    onValueChange={value => setSelectedCabang(value)}>
                    {cabang.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <Gap height={20} />

              {/* picker Jabatan */}
              <View style={styles.viewPickerContainer}>
                <Text style={styles.textPicker}>Pilih Jabatan</Text>
                <View style={styles.viewPicker}>
                  <Gap width={30} />
                  <Icon name={'account-multiple'} size={20} color={'black'} />
                  <Picker
                    selectedValue={jabatan}
                    style={styles.picker}
                    onValueChange={itemValue => setJabatan(itemValue)}>
                    <Picker.Item label="Staff" value={'Staff'} />
                    <Picker.Item label="Supervisor" value={'Supervisor'} />
                    <Picker.Item label="Manager" value={'Manager'} />
                  </Picker>
                </View>
              </View>

              <Gap height={30} />

              {/* btn Action */}
              <TouchableNativeFeedback onPress={() => submitRegister()}>
                <View style={styles.viewBtn}>
                  {loading ? (
                    <ActivityIndicator color={'white'} size={'small'} />
                  ) : (
                    <Text style={styles.textBtn}>Daftar</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <Gap height={10} />
              <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                <View
                  style={{
                    ...styles.viewBtn,
                    backgroundColor: '#3ADE00',
                    width: 140,
                  }}>
                  <Text style={styles.textBtn}>Kembali</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textPicker: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  viewPickerContainer: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#B8BC00',
  },
  viewPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  viewBtn: {
    backgroundColor: '#D4CB00',
    width: 240,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  viewLogin: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
});
