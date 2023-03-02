import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
function CupertinoButtonPurple1(props) {
  const navigations = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}  onPress={() => {
   
    //  alert("assigned");
      global.buttonId="assigned";
      navigations.navigate('Mantis Issues'
     
    )
  } 
    } >

      <Text style={styles.assignedToMe}>Assigned to me</Text>
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
  assignedToMe: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple1;
