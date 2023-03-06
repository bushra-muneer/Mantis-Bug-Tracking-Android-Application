import React, { Component } from "react";
import { StyleSheet,Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import{ ImagesAssets } from '../../../assets/ImageAssets';
function CupertinoButtonDelete8(props) {
  const navigations = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    onPress={() => {
      global.buttonId="";
    //  alert("reported by me");
      global.buttonId="reported";
      navigations.navigate('Reported by me'
     
    )} 
    }
 >
    {/* <Image   source={ImagesAssets.report_issue} style={styles.icon}  /> */}
      <Icon name="ios-document" style={styles.icon}></Icon>
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
    fontSize: 45,
   height:50,
   width:45,
  }
});

export default CupertinoButtonDelete8;
