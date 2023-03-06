import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Switch,Dimensions
} from 'react-native';
const { width } = Dimensions.get("window");
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Moment from 'moment';

import { LogBox } from 'react-native';
import LoginScreen from '../components/login';
const UserScreen = props => {
  //  const id = this.props.navigation.getParam('id');
  Moment.locale('en');
  const id = props.route.params.id;
  const uid =  global.uid;
  const access_level =  global.ac_level;



  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onPress = () =>
    props.navigation.navigate('AddNote', {
      id: id,
    });
    const baseurl = 'http://mantis.sibisoft.com';
  //const baseurl = 'http://192.168.8.102:1234/mantis';
  const getAll_url = baseurl + '/api/rest/issues/' + id;
  // const url = 'http://mantis.sibisoft.com/api/rest/issues/' + id;
  const getUser = async () => {
    await axios
      .get(getAll_url, { headers: { Authorization: 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh' } })
      .then(response => {
        const issue_Array = response.data.issues;
        setUser(issue_Array);
      })
      .catch(error => {
        console.error(`Error: ` + (error))
        if (error == "AxiosError: Request failed with status code 404") {
          alert("No issue found");
          props.navigation.navigate('HomeScreen');
        }

      })
      .finally(() => setLoading(false));
  };
  const getIssues_url = baseurl + '/api/rest/issues/' + uid + '/' + id;

  const getIssues_User = async () => {
    await axios
      .get(getIssues_url, { headers: { Authorization: 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh' } })
      .then(response => {
        const issue_Array = response.data.issues;
        setUser(issue_Array);
      })
      .catch(error => {
        console.error(`Error: ` + (error))
        if (error == "AxiosError: Request failed with status code 404") {
          alert("No issue found");
          props.navigation.navigate('InitialScreen');
        }

      })
      .finally(() => setLoading(false));
  };
   function extract_date(data){
    const dattetime = data;
    //  "updated_at": "2022-11-14T14:22:11+05:00",
    const date_time = dattetime.split('T');
    const date = date_time[0].split('+');
  console.log(date);
  
return date;
   }
   function extract_time(timedata){
    const dattetime = timedata;
    //  "updated_at": "2022-11-14T14:22:11+05:00",
    const date_time = dattetime.split('T');
    const date = date_time[0].split('+');
    const time = date_time[1].split('+');
    const timen = time[0].split('+');
    const times = timen[0].split(':');
    
return timen;
   }

  useEffect(() => {
    console.log(id);
    console.log(uid);
    console.log(access_level);
    setLoading(true);
    if (access_level == '90') {
    
      getUser();
    }
    else {
      getIssues_User(); 
    }
    // getUser();
  }, []);
  return (
    <>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <Text style={{ color: 'black' }}>Loading...</Text>
        ) : (
          <View style={{ padding: 2, paddingTop: 10, paddingHorizontal: 10 }}>
            <Button
              title="Send Reminder"
              color={'#142c44'}
              onPress={() =>
                props.navigation.navigate('ReminderScreen', {
                  id: id,
                })
              }>
              {' '}
            </Button>
            <Text></Text>

        

            <FlatList
              data={user}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <>
                    <Text
              style={{
                fontSize: 16,
                alignSelf:'center',
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'justify',
              }}>
              Issue # {id}
            </Text>
            <Text></Text>
                  <Text>
                    
                    <View style={{flexDirection:'row' , flexWrap:'wrap',paddingTop:5,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                    
                        
                      }}>
                      Project
                    
                   
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                        marginLeft:120
                      }}>
                      Category 
                    
                    </Text>
                   
                    </View>
                    <View style={{flexDirection:'row' , flexWrap:'wrap',width:340,paddingBottom:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      
                      }}>
                     {item.project.name}
                    
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        marginLeft:94
                      }}>
                    {item.category.name}
                    
                    </Text>
                    
                   </View>

                   <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5
  }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                      QA Status 
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                            {item.status.name ?? ''} 
                     
                      
                    </Text>
                    </View>
                    <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                      Ticket Status
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                 { item.resolution.name!=undefined ?  item.resolution.name: '' } 
                     
                      
                    </Text>
                    </View>



                   {/* <View style={{flexDirection:'row' , flexWrap:'wrap',paddingTop:5,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                    
                        
                      }}>
                         QA Status
                    
                   
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                        marginLeft:105
                      }}>
                    Ticket Status
                    
                    </Text>
                   
                    </View>
                    <View style={{flexDirection:'row' , flexWrap:'wrap',paddingBottom:5,
                    width:340,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      
                      }}>
                    {item.status.name ?? ''} 
                    
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        marginLeft:114
                      }}>
                   {item.resolution.name ?? ''} 
                    
                    </Text>
        
                   </View> */}
                   <View style={{flexDirection:'row' , flexWrap:'wrap',paddingTop:5,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                    
                        
                      }}>
                     Created At
                    
                   
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                        marginLeft:100
                      }}>
                   Updated At
                    
                    </Text>
                   
                    </View>
                    <View style={{flexDirection:'row' , flexWrap:'wrap',paddingBottom:5,
                    width:340,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      
                      }}>
                    { extract_date(item.created_at)  +" "+ Moment( extract_time(item.created_at),'HHmmss').format("HH:mm")   ?? ''} 
                    
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        marginLeft:56
                      }}>
                   { extract_date(item.updated_at) +" "+ Moment( extract_time(item.updated_at),'HHmmss').format("HH:mm")   ?? ''} 
                    
                    </Text>
                    </View>
                   {/* <View style={{flexDirection:'row' , flexWrap:'wrap',}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                    
                        
                      }}>
                      Reporter
                    
                   
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold',
                        marginLeft:110
                      }}>
                      Assigned To 
                    
                    </Text>
                   
                    </View> */}
                    <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5
  }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                      Reporter 
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                         {item.reporter.real_name!=undefined ? item.reporter.real_name : ''} 
                     
                      
                    </Text>
                    </View>
                    <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                      Assigned To 
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                   {item.handler.real_name!=undefined ? item.handler.real_name : ''} 
                     
                      
                    </Text>
                    </View>
               
{/* 
                    <View style={{flexDirection:'row' , flexWrap:'wrap',
                    width:340,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      
                      }}>
                    {item.reporter.real_name ?? ''} 
                    
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        marginLeft:104
                      }}>
                   {item.handler.real_name ?? ''} 
                    
                    </Text>
                    
                   </View>
                   </View> */}
               <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                      Summary 
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                     {item.summary}
                     
                      
                    </Text>
                    </View>


                    <View style={{ width:340,flex:1,flexDirection:'column',paddingVertical:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                        fontWeight:'bold'
                      }}>
                        Description 
                        
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                    {item.description}
                     
                      
                    </Text>
                    </View>














                    {/* <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Description : {item.description}
                      {'\n'}
                      {'\n'}
                    </Text> */}
                  </Text>
                  <Text></Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#142c44',
                      paddingVertical: 5,
                      paddingLeft: 4,
                      marginBottom: 4,
                    }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          marginRight: 16,
                          marginLeft: 4,
                          color: 'white',
                          fontSize: 16,
                        }}>
                        Notes
                      </Text>
                    </View>
                    <View style={{ flex: 7 }}>
                      <Switch
                        trackColor={{ false: '#848c9c', true: '#041c34' }}
                        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />

                    </View>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity

                        onPress={onPress}
                      >
                        <Text style={{ fontSize: 18 }} >✚</Text>
                      </TouchableOpacity>


                    </View>
                  </View>

                  {isEnabled == false ? (
                    <View style={{ color: 'black' }}></View>
                  ) : (
                    <>
                      <View>
                        { item.notes==undefined ? [] : item.notes.map(secItem => (
                          <View
                            key={secItem.id}
                            style={{
                              marginRight: 5,
                              marginLeft: 5,
                              marginTop: 5,
                              marginBottom: 5,
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 5,
                              backgroundColor: '#c8cad0',
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor: '#E0E0E0',
                            }}>
                            <Text style={{ color: 'black', paddingBottom: 3 }}>
                              {' '}
                              👤 {secItem.reporter.real_name== undefined ? '' : secItem.reporter.real_name}
                            </Text>

                            <Text style={{ color: 'black', paddingBottom: 3 }}>
                              {' '}
                              🕘{' '}
                              {Moment(secItem.created_at).format(
                                'DD-MM-YYYY HH:mm',
                              )}{' '}
                              🔗~{secItem.id}{' '}
                              {secItem.text != '' ? (
                                <Text style={{ color: 'black', marginVertical: 5, paddingLeft: 5 }}>
                                  {'\n  ' + secItem.text== undefined ? '' :  secItem.text}
                                </Text>
                              ) : (
                                ''
                              )}
                            </Text>
                            <View>
                              {secItem.attachments.map(seItem => (
                                <View
                                  key={seItem.id}
                                  style={{
                                    marginRight: 5,
                                    paddingLeft: 5,
                                    backgroundColor: '#E0E0E0',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#E0E0E0',
                                  }}>
                                  <Text style={{ color: '#2980B9' }}>📎 {seItem.filename== undefined ? '' :   seItem.filename}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        ))}
                      </View>

                    </>
                  )}
                </>
              )}
            />
          </View>
        )}
      </View>
      {/* </ScrollView>
       */}
    </>
  );
};

UserScreen.navigationOptions = {
  title: 'Issue Details',
};
export default UserScreen;
