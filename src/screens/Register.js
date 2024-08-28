import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, FormInput, Gap} from '../component';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

export default function Register({navigation}) {
  const [gender, setGender] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const instance = axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const [divisi, setDivisi] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState(2);
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
      getDepartement();
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

  const getDepartement = async () => {
    const divisiId = selectedDivisi;
    try {
      const response = await instance.get(`/getDepartment/${divisiId}`);
      setDepartement(response.data);
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

  const getDepartement1 = async () => {
    const divisiId = selectedDivisi;
    try {
      const response = await instance.get(`/getDepartment/${divisiId}`);
      setDepartement([]);
      setDepartement(response.data);
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

  useEffect(() => {
    getDivision();
    // getDepartement();
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
                title={'Nomor Telepon'}
                password={false}
                iconName={'phone'}
                placeholder={'08123456789'}
                keyboardType={'number-pad'}
              />

              <Gap height={20} />

              {/* Input Email */}
              <FormInput
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
                      setSelectedDivisi(itemValue), getDepartement1;
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
                    {departement.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
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
                        value={item.name}
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

              {/* checkbox ingat saya */}
              <View style={styles.viewRememberMe}>
                <CheckBox
                  value={rememberMe}
                  onValueChange={() => setRememberMe(!rememberMe)}
                  tintColors={{true: 'black', false: 'black'}}
                />
                <Text
                  style={styles.textRememberme}
                  onPress={() => setRememberMe(!rememberMe)}>
                  Ingat Saya
                </Text>
              </View>

              {/* btn Action */}
              <TouchableNativeFeedback
                // onPress={getDivision}
                onPress={() => navigation.navigate('Home')}>
                <View style={styles.viewBtn}>
                  <Text style={styles.textBtn}>Daftar</Text>
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
  textRememberme: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
  viewRememberMe: {
    alignSelf: 'flex-end',
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
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
