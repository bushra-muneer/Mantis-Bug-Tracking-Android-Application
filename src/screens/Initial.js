import {StyleSheet, Text, View, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InitialScreen = props => {
   
    const [user, setUser] = useState([]);
   
    const url='http://192.168.6.136/mantis/api/rest/users/me';
    const getUsers= async ()=>{
    
    await axios.get(url,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=>{
    const info = response.data;
        setUser(info);
      
        console.log(info);
        
    })
    .catch(error =>console.error(`Error: $(error)`));
    }

  
    useEffect(() => {
      
        getUsers();
    }, []);
  return (

    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <Text style={{color: 'black', textAlign: 'left'}}>{user.name}</Text>
          <Text style={{color: 'black', textAlign: 'justify'}}>{user.email}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <Text
          style={{
            color: '#33b5e6',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          http://192.168.6.136/mantis/
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 250,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title="Report Issues"
              onPress={() => props.navigation.navigate('Home')}
              //	onPress={goToTabExampleScreen}

              color="#33b5e6"
              //   color="blue"
            />
            <Text></Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title="View Issues"
              onPress={() => props.navigation.navigate('Home')}
              color="#33b5e6"
            />
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
InitialScreen.navigationOptions = {
  title: 'Homepage',
};
export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
