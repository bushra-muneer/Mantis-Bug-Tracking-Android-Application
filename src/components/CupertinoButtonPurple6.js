import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple6(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}    onPress={() => navigation.navigate('AboutScreen')}>
      <Text style={styles.about}>About</Text>
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
  about: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple6;
