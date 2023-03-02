import React, { Component ,useState} from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple3(props,navigation,route) {
//const CupertinoButtonPurple3= props  => {
  const navigations = useNavigation();    
 
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => {
     
     // alert("unassigned");
      global.buttonId="unassigned";
      navigations.navigate('Mantis Issues'
     
    )} 
    } >
      <Text style={styles.unassigned}>Unassigned</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4a81af",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  unassigned: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple3;
