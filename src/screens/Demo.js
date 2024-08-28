import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Demo() {
  const [divisi, setDivisi] = useState([]);

  const instance = axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const getDivision = async () => {
    try {
      const response = await instance.get('/getAllDivision');

      setDivisi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDivision();
  }, []);

  return (
    <View>
      {divisi.map(index => {
        <View>
          <Text>{index.name}</Text>
        </View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
