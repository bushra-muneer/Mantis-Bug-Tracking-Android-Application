import * as React from 'react';
import { useState } from 'react';
import {  View, Text, Button, TextInput, Modal, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
import { NavigationContainer } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import {  createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './home';
import LoginScreen from '../components/login';
import UserScreen from './user';
import ReminderScreen from './Reminder';

import { createDrawerNavigator } from "@react-navigation/drawer";
import {

  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ReportIssue from './ReportIssue';
import AddNote from './AddNote';

global.__reanimatedWorkletInit = () => { };



function DrawerNav(props) {

  const Drawer = createDrawerNavigator();
  const [isModalVisible, setModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const search_issue = () => {
    setModalVisible(!isModalVisible);
    setInputValue("");
    
   
    props.navigation.navigate('UserScreen', {
      id: inputValue,
    })
  };
  return (
    <>
      <Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={{ color: 'black', marginTop: 14 }}>Search</Text>

            <Text></Text>
            <TextInput placeholder="Enter Issue Id"
              placeholderTextColor='black'
              keyboardType={'phone-pad'}
              value={inputValue} style={styles.textInput}
              onChangeText={(value) => setInputValue(value)} />
            <View style={styles.container}>
              <Button title="Close" onPress={toggleModalVisibility} />
              <Text style={{ flex: 0.5 }}></Text>
              <Button title="Submit" color='green' onPress={search_issue
              } />
            </View>

            <Text></Text>
          </View>
        </View>
      </Modal>



      <Drawer.Navigator initialRouteName="HomeScreen"
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerConten {...props} />}
      >



        <Drawer.Screen name="Mantis Issues" component={HomeScreen} options={{
          headerRight: () => (
          
            <IconButton
              icon="magnify"
              size={25}
              onPress={toggleModalVisibility}
            />
           
            
          ) 
        }} />

        <Drawer.Screen name="ReportIssue" component={ReportIssue} options={{ title: "Report Issue" }} />

      </Drawer.Navigator>
    </>
  );

}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
    color: 'black',

  },
});

function CustomDrawerConten(props) {
  const [text, setText] = useState('');
  return (

    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View>

        <View
          style={{
            flexDirection: 'row',

            paddingVertical: 5,
            paddingLeft: 4,
          
          }}>
          <View >
            <TextInput
              style={{ height: 40,paddingRight:20,marginRight:22, paddingLeft:12, color: 'black' }}
              placeholder="Enter Issue #"
              placeholderTextColor="#000"
              keyboardType={'phone-pad'}
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
          </View>
          <View style={{ paddingLeft: 100, paddingTop: 4, }}>
          <IconButton
              icon="magnify"
              size={25}
              onPress={() =>
                props.navigation.navigate('UserScreen', {
                  id: text
                })
              }
            />
            {/* <TouchableOpacity

              onPress={() =>
                props.navigation.navigate('UserScreen', {
                  id: text
                })
              }
            >
              <Text style={{ fontSize: 21,alignSelf:'flex-start' }}>🔍</Text>
            </TouchableOpacity>
 */}


          </View>
        </View>

      </View>
      {/* <DrawerItem label="Logout" onPress={() => alert('Link to help')} /> */}
    </DrawerContentScrollView>

  );
}
const Stack = createStackNavigator();

function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

        <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: "Issue Details" }} />

        <Stack.Screen name="ReminderScreen" component={ReminderScreen} options={{ title: "Issue Reminder" }} />
        <Stack.Screen name="AddNote" component={AddNote} options={{ title: "Add Notes" }} />
        <Stack.Screen

          name="HomeScreen"

          component={DrawerNav}      // This is where I added DrawerNav        

          headerLeft={null}
          gestureEnabled={false}

          options={{ headerShown: false }}

        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}




export default App;