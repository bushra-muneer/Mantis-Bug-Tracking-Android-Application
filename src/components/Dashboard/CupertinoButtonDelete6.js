import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
function CupertinoButtonDelete6(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="ios-apps" style={styles.icon}></Icon>
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

export default CupertinoButtonDelete6;
