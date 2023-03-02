import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple2(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}  onPress={() => navigation.navigate('ReportIssue')}>
      <Text style={styles.reportIssue}>Report Issue</Text>
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
  reportIssue: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple2;
