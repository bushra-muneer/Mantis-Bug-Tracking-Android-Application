import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Button, TouchableOpacity, Switch, Dimensions,StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Moment from 'moment';
import g from '../global'
import styles from '../style/ScreenStyle/issue_detailStyle';
const IssueDetailScreen = props => {
  //  const id = this.props.navigation.getParam('id');
  Moment.locale('en');
  var data2;
  const id = props.route.params.id;
  const uid = global.uid;
  const access_level = global.ac_level;
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onPress = () =>
    props.navigation.navigate('AddNote', {
      id: id,
    });
 
  const getAll_url = global.base_url + '/api/rest/issues/' + id;
  const getIssues_url = global.base_url + '/api/rest/issues/' + uid + '/' + id;

  const getUser = async () => {
    await axios
      .get(getAll_url, { headers: { Authorization:  global.Authorization_Key } })
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

  const getIssues_User = async () => {
    await axios
      .get(getIssues_url, { headers: { Authorization:  global.Authorization_Key } })
      .then(response => {
        const issue_Array = response.data.issues;
        setUser(issue_Array);
      })
      .catch(error => {
        console.error(`Error: ` + (error))
        if (error == "AxiosError: Request failed with status code 404") {
          alert("No issue found");
          props.navigation.navigate('DashboardScreen');
        }

      })
      .finally(() => setLoading(false));
  };
  function extract_date(data) {
    const dattetime = data;
    //  "updated_at": "2022-11-14T14:22:11+05:00",
    const date_time = dattetime.split('T');
    const date = date_time[0].split('+');
    console.log(date);

    return date;
  }
  function extract_time(timedata) {
    const dattetime = timedata;
    //  "updated_at": "2022-11-14T14:22:11+05:00",
    const date_time = dattetime.split('T');
    const date = date_time[0].split('+');
    const time = date_time[1].split('+');
    const timen = time[0].split('+');
    const times = timen[0].split(':');

    return timen;
  }

  function Clients(ds) {
    data2 = ds
    for (let i in data2) {
      for (let j in data2[i]["field"]) {
        if (data2[i]["field"]["name"] == "Clients") {
          var x = data2[i]["value"];
       
        }
      }
    }

    return x;
  }

  function QAOwner(ds) {
    data2 = ds
    for (let i in data2) {
      for (let j in data2[i]["field"]) {
        if (data2[i]["field"]["name"] == "QA Owner") {
          var x = data2[i]["value"];
        }
      }
    }

    return x;
  }

  function Contacts(ds) {
    data2 = ds
    for (let i in data2) {
      for (let j in data2[i]["field"]) {
        if (data2[i]["field"]["name"] == "Contacts") {
          var x = data2[i]["value"];
          console.log(x);
        }
      }
    }

    return x == "" ? "Not Added" : x;
  }

  function ErDate(ds) {
    data2 = ds
    for (let i in data2) {
      for (let j in data2[i]["field"]) {
        if (data2[i]["field"]["name"] == "ERDate") {
          var x = data2[i]["change"];
        }
      }
    }

    return x == "" ? "No ERDate Added" : x;
  }

  function color_priority(name) {
    let color;
    if (name == "low") {
      //low
      //color = '#F6D25B';
      color = '#FFF4D2';
    }
    else if (name == "normal") {
      //normal --> green
      //  color = '#B1F8AA';
      color = '#9DC08B';
    }

    else if (name == "high") {
      //high --> blue
      // color = '#89CFF0';
      color = '#B4E4FF';
    }
    else if (name == "urgent") {
      //urgent  --> light red
      //  color = '#FA8072';
      color = '#FFD1D1';
    }
    else if (name == "immediate") {
      //immediate --> brighter red
      //color = '#FF4433';
      color = '#FF9494';
    }

    else {
      //none
      //color = '#E0E0E0';
      color = '#ECF2FF';
    }
    return color;

  }


  useEffect(() => {
    console.log(id);
    console.log(uid);
    console.log(access_level);
    setLoading(true);
    if (access_level == global.access_level) {

      getUser();
    }
    else {
      getIssues_User();
    }
    // getUser();
  }, []);
  return (
    <>
      <View style={styles.user_view}>
        {isLoading ? (
          <Text style={styles.loading_text}>Loading...</Text>
        ) : (
          <View style={styles.send_reminder_view}>
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
                    style={styles.issue_id_text}>
                    Issue # {id}
                  </Text>
                  <Text></Text>
                  <Text>

                    <View style={styles.project_view}>
                      <Text
                        style={styles.project_text}>
                        Project


                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          fontWeight: 'bold',
                          marginLeft: 120
                        }}>
                        Module

                      </Text>

                    </View>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap', width: 340, paddingBottom: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.text_style}>
                        {item.project.name}

                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          marginLeft: 94
                        }}>
                        {item.category.name}

                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5, }}>
                      <Text
                        style={styles.project_text}>
                        Created At


                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          fontWeight: 'bold',
                          marginLeft: 94
                        }}>
                        Updated At

                      </Text>

                    </View>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 5,
                      width: 340,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.text_style}>
                        {extract_date(item.created_at) + " " + Moment(extract_time(item.created_at), 'HHmmss').format("HH:mm") ?? ''}

                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          marginLeft: 50
                        }}>
                        {extract_date(item.updated_at) + " " + Moment(extract_time(item.updated_at), 'HHmmss').format("HH:mm") ?? ''}

                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5, }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          fontWeight: 'bold',


                        }}>
                        Priority


                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          fontWeight: 'bold',
                          marginLeft: 117
                        }}>
                        ER Date

                      </Text>

                    </View>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 5,
                      width: 340,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          backgroundColor: color_priority(item.priority.name),
                        }}>
                        {item.priority.name != undefined ? item.priority.name : ''}

                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          marginLeft: 120
                        }}>
                        {ErDate(item.history) ?? "Not Added"}

                      </Text>
                    </View>


                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5
                    }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                          fontWeight: 'bold'
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
                    <View style={{ width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5, }}>
                      <Text
                        style={styles.project_text}>
                        Ticket Status

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {item.resolution.name != undefined ? item.resolution.name : ''}


                      </Text>
                    </View>


                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingBottom: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }} />

                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5
                    }}>
                      <Text
                        style={styles.project_text}>
                        Reporter

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {item.reporter.real_name != undefined ? item.reporter.real_name : 'Not Added'}


                      </Text>
                    </View>

                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.project_text}>
                        AssignedScreen To

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {item.handler.real_name != undefined ? item.handler.real_name : 'Not Added'}


                      </Text>
                    </View>
                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5
                    }}>
                      <Text
                        style={styles.project_text}
                      >Clients

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {Clients(item.custom_fields) ?? "Not Added"}


                      </Text>
                    </View>
                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5
                    }}>
                      <Text
                        style={styles.project_text}>
                        QA Owner

                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          textAlign: 'justify',
                        }}>
                        {QAOwner(item.custom_fields) ?? "Not Added"}


                      </Text>
                    </View>
                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.project_text}>
                        Contacts

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {Contacts(item.custom_fields) ?? "Not Added"}


                      </Text>
                    </View>

                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.project_text}>
                        Summary

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {item.summary}


                      </Text>
                    </View>


                    <View style={{
                      width: 340, flex: 1, flexDirection: 'column', paddingVertical: 5,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}>
                      <Text
                        style={styles.project_text}>
                        Description

                      </Text>
                      <Text
                        style={styles.text_style}>
                        {item.description}


                      </Text>
                    </View>
                  </Text>
                  <Text></Text>
                  <View
                    style={styles.notes_wrapper}>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={styles.notes_text}>
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
                        {item.notes == undefined ? [] : item.notes.map(secItem => (
                          <View
                            key={secItem.id}
                            style={styles.notes_container}>
                            <Text style={{ color: 'black', paddingBottom: 3 }}>
                              {' '}
                              👤 {secItem.reporter.real_name == undefined ? '' : secItem.reporter.real_name}
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
                                  {'\n  ' + secItem.text == undefined ? '' : secItem.text}
                                </Text>
                              ) : (
                                ''
                              )}
                            </Text>
                            <View>
                              {secItem.attachments.map(seItem => (
                                <View
                                  key={seItem.id}
                                  style={styles.notes_attachment}>
                                  <Text style={{ color: '#2980B9' }}>📎 {seItem.filename == undefined ? '' : seItem.filename}
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

    </>
  );
};

IssueDetailScreen.navigationOptions = {
  title: 'Issue Details',
};
export default IssueDetailScreen;


