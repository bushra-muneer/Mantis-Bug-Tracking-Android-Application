import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple7(props) {
  const navigations = useNavigation();


  return (
    <TouchableOpacity style={[styles.container, props.style]}  onPress={() => {
      global.buttonId="";
    //  alert("monitored");
      global.buttonId="monitored";
      navigations.navigate('Mantis Issues',{name:'mo'}
    )} 
    } >
      <Text style={styles.filters}>Filters</Text>
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
  filters: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple7;
