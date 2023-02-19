import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Switch,
} from 'react-native';
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

  const baseurl = 'http://192.168.8.102:1234/mantis';
  const getAll_url = baseurl + '/api/rest/issues/' + id;
  // const url = 'http://192.168.6.136:8080/mantis/api/rest/issues/' + id;
  const getUser = async () => {
    await axios
      .get(getAll_url, { headers: { Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad' } })
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
      .get(getIssues_url, { headers: { Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad' } })
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
              color={'grey'}
              onPress={() =>
                props.navigation.navigate('ReminderScreen', {
                  id: id,
                })
              }>
              {' '}
            </Button>
            <Text></Text>

            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'justify',
              }}>
              Issue Id : {id}
            </Text>
            <Text></Text>

            <FlatList
              data={user}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <>
                  <Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Project : {item.project.name}
                      {'\n'}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Category : {item.category.name}
                      {'\n'}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Reporter : {item.reporter.name}
                      {'\n'}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Assigned to: {item.handler.name}
                      {'\n'}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Summary : {item.summary}
                      {'\n'}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        textAlign: 'justify',
                      }}>
                      Description : {item.description}
                      {'\n'}
                      {'\n'}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'grey',
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
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
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
                        {item.notes.map(secItem => (
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
                              backgroundColor: '#E0E0E0',
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor: '#E0E0E0',
                            }}>
                            <Text style={{ color: 'black', paddingBottom: 3 }}>
                              {' '}
                              👤 {secItem.reporter.real_name}
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
                                  {'\n  ' + secItem.text}
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
                                  <Text style={{ color: '#2980B9' }}>📎 {seItem.filename}
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
