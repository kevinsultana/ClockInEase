import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';

export default function HomeHeader({onPress, userDataEmail, userDataName}) {
  return (
    <View>
      <View style={styles.viewTopHeader}>
        <TouchableNativeFeedback>
          <View>
            <Icon
              name={'exit-to-app'}
              size={40}
              color={'black'}
              style={{transform: [{rotate: '180deg'}]}}
              onPress={onPress}
            />
          </View>
        </TouchableNativeFeedback>
        <Gap width={10} />
        <Text style={styles.textHeader}>Clock In Ease</Text>
      </View>

      {/* selamat datang */}
      <View style={{marginHorizontal: 20, marginVertical: 5}}>
        <Text style={styles.textWelcome}>Selamat datang</Text>
      </View>

      {/* username email dan icon */}
      <View style={styles.viewMainHeader}>
        <Icon name={'account-circle'} size={60} color={'black'} />
        <Gap width={10} />
        <View>
          <Text style={styles.textUserName}>{userDataName}</Text>
          <Text style={styles.textUserEmail}>{userDataEmail}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textUserEmail: {
    color: 'black',
    fontSize: 15,
  },
  textUserName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  viewMainHeader: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWelcome: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    fontStyle: 'italic',
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  viewTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
