import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import {TouchableOpacity} from 'react-native-gesture-handler';
function CupertinoButtonDelete2(props) {
  
  const navigations = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    
    onPress={() => {
     
      // alert("unassigned");
       global.buttonId="assigned";
       navigations.navigate('Assigned to me'
      
     )} 
     }
    
    >
      <Icon name="ios-checkmark-circle" style={styles.icon}></Icon>
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

export default CupertinoButtonDelete2;
