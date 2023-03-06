import React, { Component } from "react";
import { StyleSheet,Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import{ ImagesAssets } from '../../../assets/ImageAssets';
function CupertinoButtonDelete4(props) {
  const navigations = useNavigation();

  return (
    <TouchableOpacity style={[styles.container, props.style]}  onPress={() => navigations.navigate('ReportIssue')}>
      {/* <Icon name="ios-create" style={styles.icon}></Icon>
       */}
          <Image   source={ImagesAssets.report_issue} style={styles.icon}  />
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
//   icon: {
//     color: "#142c44",
//    fontSize: 50,
//     margin: 3
//   }
  icon: {
    color: "#142c44",
   // fontSize: 50,
   height:50,
   width:45,
  }

});

export default CupertinoButtonDelete4;
