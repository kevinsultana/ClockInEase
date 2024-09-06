import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';

export default function MonthControl({
  onPressLeft,
  disabledLeft,
  onPressMonth,
  textMonth,
  onPressRight,
  disabledRight,
}) {
  return (
    <View style={styles.viewMonthControl}>
      <TouchableOpacity
        style={styles.btnArrow}
        onPress={onPressLeft}
        disabled={disabledLeft}>
        <Icon name={'chevron-left'} size={25} color={'black'} />
      </TouchableOpacity>
      <Gap width={20} />
      <TouchableOpacity style={styles.btnMonth} onPress={onPressMonth}>
        <Text style={styles.textMonthControl}>{textMonth}</Text>
      </TouchableOpacity>
      <Gap width={20} />
      <TouchableOpacity
        style={styles.btnArrow}
        onPress={onPressRight}
        disabled={disabledRight}>
        <Icon name={'chevron-right'} size={25} color={'black'} />
      </TouchableOpacity>
      <Gap width={100} />
      <TouchableOpacity style={styles.btnCalender} onPress={onPressMonth}>
        <Icon name={'calendar'} size={25} color={'black'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textMonthControl: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  btnCalender: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMonth: {
    width: 100,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  btnArrow: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMonthControl: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
