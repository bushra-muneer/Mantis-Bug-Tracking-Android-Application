import React, { Component,useEffect,useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';


function CupertinoSearchBarBasic(props) {
  const [text, setText] = useState('');
  const navigation = useNavigation();


  const anotherFunc = (val) =>{
    setText('');
}
const callSearch = (text) =>{
  if (text!=""){
    navigation.navigate('UserScreen', {
      id: text
    })
  }
  else {
    alert("Enter Issue #");
  }
}
  return (
    <View style={[ props.style]}>
      <View style={styles.inputBox}>
        {/* <Icon name="magnify" style={styles.inputLeftIcon}></Icon> */}
        <TextInput  maxLength={6} placeholder={text == '' ? 'Search' : text} placeholderTextColor={'black'}  
      style={styles.inputStyle}  keyboardType={'phone-pad'}
      value={text ?? ''}
              onChangeText={text => {setText(text)}}
            
 ></TextInput>
        <IconButton
              icon="magnify"
              size={25}
          
           
              onPress={() =>{
        anotherFunc() 

                // navigation.navigate('UserScreen', {
                //   id: text
                // })
               
                callSearch(text)
              }
              
              }
            />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CECED2",
    padding: 8,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
  
    borderColor:"grey",
    alignItems: "center",
    justifyContent: "center"
  },
  inputLeftIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  inputStyle: {
    height: 40,
    marginLeft:15,
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 16,
    color: "black",
    
    flex: 1
  }
});

export default CupertinoSearchBarBasic;
