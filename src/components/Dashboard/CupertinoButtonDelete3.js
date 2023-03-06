import React, { Component } from "react";
import { StyleSheet,Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


import{ ImagesAssets } from '../../../assets/ImageAssets';

function CupertinoButtonDelete3(props) {
  const navigations = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    onPress={() => {
     
      // alert("unassigned");
       global.buttonId="unassigned";
       navigations.navigate('Unassigned'
      
     )} 
     }
    
    >  
   <Image   source={ImagesAssets.UnassignedLogo} style={styles.icon}  />

     {/* <Icon name="ios-checkmark-circle-outline" style={styles.icon}></Icon> */}
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
  //    color: "#142c44",
  //   fontSize: 50,
   
  
  // }
  icon: {
    color: "#142c44",
   // fontSize: 50,
   height:50,
   width:50,
  }

});

export default CupertinoButtonDelete3;
