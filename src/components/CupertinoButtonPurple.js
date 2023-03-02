import React, { Component } from "react";
import { StyleSheet,  Text } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}     onPress={() => {
    
     global.buttonid="View Issues"; 
      navigation.navigate('View Issues')}}>
      <Text style={styles.caption}>View Issues</Text>
     
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
  caption: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple;
