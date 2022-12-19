import React, { useEffect, useState } from 'react';
import { Text, View,FlatList,Button,TouchableOpacity } from 'react-native';
import axios from 'axios';

const UserScreen = props => {
 
  //  const id = this.props.navigation.getParam('id');

    const id=props.route.params.id;
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
   

    const url='http://192.168.6.136/mantis/api/rest/issues/'+id;
    const getUser= async ()=>{
    
    await axios.get(url,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=>{
   const issue_Array = response.data.issues;
    setUser(issue_Array);
      
        console.log(issue_Array);
             
      
    })
    .catch(error =>console.error(`Error: $(error)`))
    .finally(() => setLoading(false));
    }

    useEffect(() => {
        console.log(id)
        setLoading(true);
        getUser();
    }, []);
    return (
        <>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? <Text style={{ color:'black'}}>Loading...</Text> : 
            (
                <View style={{padding:2, paddingTop:10}}>
                      <Button title='Send Reminder' color={'grey'} onPress={() =>
                                props.navigation.navigate('ReminderScreen', {
                                    id: id
                                })
                            }
                        > </Button>
                          <Text></Text>
                
                  <Text style={{ fontSize: 15 , color:'black',fontWeight:'bold'}}>Issue Id : {id}</Text>
                  <Text></Text>
                
                
                    <FlatList
                    data={user}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={
                        ({ item }) =>

                            <Text>
                                  <Text style={{ fontSize: 15 , color:'black'}}>Project : {item.project.name}{"\n"}{"\n"}</Text>
                            
                                  <Text style={{  fontSize: 15 , color:'black'}}>Category : {item.category.name}{"\n"}{"\n"}</Text>
                              
                                  <Text style={{fontSize: 15 , color:'black'}}>Reporter : {item.reporter.name}{"\n"}{"\n"}</Text>
                              
                                  <Text style={{  fontSize: 15 , color:'black'}}>Assigned to: {item.handler.name}{"\n"}{"\n"}</Text>
                                
                                  <Text style={{fontSize: 15 , color:'black'}}>Summary : {item.summary}{"\n"}{"\n"}</Text>
                                 
                                  <Text style={{fontSize: 15 , color:'black'}}>Description : {item.description}{"\n"}{"\n"}</Text>
                            </Text>

                            
                      
                    }
                />
                
                </View>
            )}
        </View>
        
     </>
);
};
UserScreen.navigationOptions = {
   title: 'Issue Details'


  
};
export default UserScreen;