import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonDelete1(props) {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    
    onPress={() => { global.buttonId="monitored";
    
    navigation.navigate('Monitored by me')}}>
 
      <Icon name="md-checkbox-outline" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
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
    fontSize: 50,
    padding: 0
  }
});

export default CupertinoButtonDelete1;
