import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonDelete5(props) {
  const navigations = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    onPress={() =>navigations.navigate('AboutScreen')}>
    
      <Icon name="md-information-circle-outline" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 9,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0
  },
  icon: {
    color: "#142c44",
    fontSize: 50
  }
});

export default CupertinoButtonDelete5;
