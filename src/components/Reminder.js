

import React, {useState, useEffect} from 'react';
import { Checkbox } from 'react-native-paper';
import {SafeAreaView, StyleSheet, Text, View,TextInput,Button,ScrollView} from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import { LogBox } from 'react-native';


const ReminderScreen = props => {
 
 //   const id = props.navigation.getParam('id');
 const id=props.route.params.id; 
 const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
  
    const [updatedData, setUpdatedData] = useState([]);
    
    const [serverData, setServerData] = useState([]);
    
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  
 
    function compareStrings(a, b) {
     
      a = a.toLowerCase();
      b = b.toLowerCase();
    
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    
  //const url='http://192.168.8.102:1234/mantis/api/rest/users/getAll';
     const url = 'http://mantis.sibisoft.com/api/rest/users/getAll';
    const getProjectUsers = async () => {
      await axios
        .get(url, {headers: {Authorization: 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh'}})
        .then(response => {
          const allprojectUsers = response.data;
          setServerData(allprojectUsers);
          console.log("Api response.success and set in server Data");
  
  console.log(serverData);
  
    serverData.map(i => (i.name_email = i['realname'] + '[' + i['email'] + ']'));
    serverData.sort(function(a, b) {
      return compareStrings(a.realname, b.realname);
    })
         console.log(serverData);
  
         setUpdatedData(serverData);
        })
        .catch(error => console.error(`Error: $(error)`))
        .finally(() => setLoading(false));
    };
   
  
    useEffect(() => {
      LogBox.ignoreAllLogs();
      const timeout = setTimeout(() => {
            setLoading(false);
            console.log(loading);
          }, 1000);
      getProjectUsers();
      return () => clearTimeout(timeout);
    }, [loading]);
  
  
  
  
  
    const onSelectedItemsChange = selectedItems => {
      setSelectedItems(selectedItems);
  
      for (let i = 0; i < selectedItems.length; i++) {
        var tempItem = serverData.find(item => item.id === selectedItems[i]);
  
    
      }
    
      console.log(tempItem);
      console.log(tempItem.realname);
      console.log(tempItem.email);
    };
  
    return loading ? (
        <Text>loading</Text>
      ) : (
        <>
        <View style={{backgroundColor:'#c8cad0', flex:1}}>
        <ScrollView>
                    <SafeAreaView style={{flex: 1,backgroundColor:'#c8cad0'}}>
          <View style={styleSheet.MainContainer}>
            {/* <Text style={styleSheet.text}> React Native Multiple Select </Text> */}
            <View style={{padding:2, paddingTop:10}}>
            <Text style={{ fontSize: 15 , color:'black',fontWeight:'bold'}}>Issue Id : {id}</Text>
            </View>
      <View style={styleSheet.wrapper}>
     
<Text style={styleSheet.textn}>Status : </Text>
<Checkbox  
status={checked ? 'checked' : 'unchecked'}
onPress={() => {
  setChecked(!checked);
 
  if (checked==1){
    console.log("it is set private");
  }
}}
/>
        <Text style={styleSheet.textn}>
         Private
        </Text>
      </View>
      <View style={{backgroundColor:'#c8cad0'}}>
      <MultiSelect
              //  hideTags
              items={updatedData}
              itemFontSize={12}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Users"
              styleTextDropdown={{borderRadius:10,marginHorizontal:5}}
              searchInputPlaceholderText="Search Users"
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor="#243c4c"
              tagBorderColor="#45556c"
              tagTextColor="#45556c"
              selectedItemTextColor="#041c34"
              selectedItemIconColor="#041c34"
              itemTextColor="#041c34"
              displayKey="name_email"
              searchInputStyle={{color: '#344c5c'}}
              submitButtonColor="#344c5c"
              submitButtonText="Submit"
            />
              </View>
      <View style={styleSheet.BottomContainer}>
      <Text style={styleSheet.textn}>Message: </Text>
     
      <View style={styleSheet.textAreaContainer} >
    <TextInput
      style={styleSheet.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      numberOfLines={10}
      onChangeText={newText => setText(newText)}
      defaultValue={text}
      multiline={true}
      color='black'
    />
    
  </View>
 
  </View>
    
          <Text></Text>
     </View>

        </SafeAreaView>
       
        </ScrollView>
        </View>
        <View >
          <Button style={{marginTop:20}}  color={'#041c34'} title="submit" onPress={() => alert("Reminder send")} />
     
        </View>
        </>
      );
    }
    
    const styleSheet = StyleSheet.create({
      MainContainer: {
        flex: 1,
        padding: 12,
        backgroundColor: '#c8cad0',
      },
    
      text: {
        padding: 12,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
      },


      container: {
        width: '100%',
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#c8cad0'
      },
      wrapper: {
        color:'#c8cad0',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingTop: 20,
      },
      multiselectContainer: {
        color:'white',
      
        alignContent: 'center',
        paddingHorizontal: 14,
      },
      textn: {
        color:'black',
     
        paddingBottom:18,
        marginTop:5
      },
      MainContainer: {
     
        paddingTop: 12,
        paddingHorizontal:12,
        backgroundColor: '#c8cad0'
      },
      Container: {
      
        paddingTop: 45,
        paddingHorizontal:12,
        paddingBottom:5,
        backgroundColor: '#c8cad0'
      },
      BottomContainer: {
      flex:1,
        paddingTop: 12,
        paddingHorizontal:12,
        paddingBottom:5,
        backgroundColor: '#c8cad0'
      },
    
    
      text: {
        padding: 12,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
      }
    ,textAreaContainer: {
      borderColor:'grey',
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      height: 250,
      justifyContent: "flex-start"
    
    }

    });
export default ReminderScreen;