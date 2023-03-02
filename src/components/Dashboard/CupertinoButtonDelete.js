import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

function CupertinoButtonDelete(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    
    onPress={() => {
      
      global.buttonid="View Issues"; 
       navigation.navigate('View Issues')}}
    >

      <Icon name="list" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  icon: {
    color: "#142c44",
    fontSize: 50
  }
});

export default CupertinoButtonDelete;
