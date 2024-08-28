import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {Background, FormInput, Gap} from '../component';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

export default function Login({navigation}) {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'https://dev.pondokdigital.pondokqu.id/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      navigation.replace('Home', {token: response.data.token});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Submit error:', error);
      }
    }
  };
  // const submitLogin = async () => {
  //   try {
  //     const response = await axios.post(
  //       'https://dev.pondokdigital.pondokqu.id/api/login',
  //       {
  //         email: email,
  //         password: password,
  //       },
  //       {headers: {'Content-Type': 'application/json'}},
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log('Axios error:', error.response?.data || error.message);
  //     } else {
  //       console.log('Submit error:', error);
  //     }
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={{justifyContent: 'center', flex: 1}}>
        <View>
          <View style={styles.viewLogin}>
            <Text style={styles.textLogin}>Masuk</Text>
            <Gap height={10} />
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

            <FormInput
              value={password}
              onChangeText={text => setPassword(text)}
              title={'Password'}
              password={true}
              iconName={'lock'}
              placeholder={'Masukkan Password Disini'}
              autoCapitalize={'none'}
            />

            {/* Checkbox Ingat saya */}
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

            {/* btn action */}
            <TouchableNativeFeedback onPress={() => submitLogin()}>
              <View style={styles.viewBtn}>
                <Text style={styles.textBtn}>Masuk</Text>
              </View>
            </TouchableNativeFeedback>
            <Gap height={10} />
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Register')}>
              <View
                style={{
                  ...styles.viewBtn,
                  backgroundColor: '#3ADE00',
                  width: 140,
                }}>
                <Text style={styles.textBtn}>Daftar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
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
