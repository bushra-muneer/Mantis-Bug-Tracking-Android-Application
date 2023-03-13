import React, { Component } from "react";
import { StyleSheet,Image } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import{ ImagesAssets } from '../../../assets/ImageAssets';
function ViewIssuesButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    
    onPress={() => {
      
      global.buttonid="View Issues"; 
       navigation.navigate('View Issues')}}
    >
 <Image   source={ImagesAssets.view_issues} style={styles.icon}  />

      {/* <Icon name="list" style={styles.icon}></Icon> */}
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
  // icon: {
  //   color: "#142c44",
  //   fontSize: 50
  // }
  icon: {
    color: "#142c44",
   // fontSize: 50,
   height:46,
   width:45,
  }
});

export default ViewIssuesButton;
