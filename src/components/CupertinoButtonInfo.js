import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
const CupertinoButtonInfo = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}   
      onPress={() => { global.buttonId="issues";
      navigation.navigate('View Issues')}}>
      <Text style={styles.issues}>Issues</Text>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041c34",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 7,
    paddingLeft: 16,
    paddingRight: 16,
   
  },
  issues: {
    color: "#fff",
    fontSize: 16,
    
  }
});

export default CupertinoButtonInfo;
