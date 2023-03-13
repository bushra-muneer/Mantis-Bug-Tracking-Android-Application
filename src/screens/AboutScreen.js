import React, { useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { LogBox } from 'react-native';
import styles from '../style/ScreenStyle/AboutScreenStyle';

const AboutScreen = () => {
 
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (

    <>
      <View style={styles.about_container}>
        <View style={styles.about_view}>
          <View
            style={styles.about_wrapper}>
            <Text style={styles.about_text}>
            { global.sample}
            </Text>

          </View>
        </View>



      </View>
    </>
  );
};

export default AboutScreen;


