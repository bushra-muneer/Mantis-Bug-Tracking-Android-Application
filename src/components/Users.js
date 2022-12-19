import React, { useEffect, useState } from 'react';
import { ActivityIndicator,View, Text, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import User from './User';
import axios  from 'axios';
const Users = props => {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const url='http://192.168.6.136/mantis/api/rest/issues';
    const getUsers= async ()=>{
    
    await axios.get(url,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=>{
    const allissues = response.data.issues;
    setTimeout(() => {
        setUsers(allissues);
      
        console.log(allissues);
    }, 2500)

})
      
        
   
    .catch(error =>console.error(`Error: $(error)`))
    .finally(() => setLoading(false));
    }

  
    useEffect(() => {
        setLoading(true);
        getUsers();
    }, []);
    return(
        <View style={{ padding: 2,color:'black' }}>
            {isLoading ?  <View style={[styles.container, styles.horizontal]}>
  
   
    <ActivityIndicator size="large" color="grey" />
  </View> :
            (
                <View >
                     <Text style={styles.title}>Assigned to Me</Text>
                <FlatList
                    data={users}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={
                        ({ item }) =>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate('UserScreen', {
                                    id: item.id
                                })
                            }
                        >
                            <View>
                                <User user={item} />
                            </View>
                        </TouchableOpacity>
                    }
                />
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
  
    title: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal:108,
        paddingVertical:3,
        backgroundColor:'#33b5e6'
    }, container: {
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
      },
      horizontal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
      }
  
    });
    
export default Users;