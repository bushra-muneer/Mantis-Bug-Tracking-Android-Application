import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
import { NavigationContainer } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import LoginScreen from '../components/LoginScreen';
import IssueDetailScreen from './IssueDetailScreen';
import ReminderScreen from './ReminderScreen';
import DashboardScreen from './DashboardScreen';
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Keychain from "react-native-keychain";
import {

  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ReportIssue from './ReportIssue';
import AddNote from './AddNote';
import AboutScreen from './AboutScreen';
import { color } from 'react-native-reanimated';
import MonitorScreen from './MonitorScreen';
import AssignedScreen from './AssignedScreen';
import UnAssignedScreen from './UnAssignedScreen';
import ReportedScreen from './ReportedScreen';

global.__reanimatedWorkletInit = () => { };

function DrawerNav(props) {

  const Drawer = createDrawerNavigator();
  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [inputValue, setInputValue] = useState("");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const search_issue = () => {
    setModalVisible(!isModalVisible);
    setInputValue("");


    props.navigation.navigate('IssueDetailScreen', {
      id: inputValue,
    })
  };
  useEffect(() => {

    setIsLoggedIn(global.loggedin);
    setUserDetails(global.userDetails);


  }, []);

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({ logout });
    props.navigation.navigate('LoginScreen'

    )

    if (logout) {
      setIsLoggedIn(false);
      setUserDetails({});
    }
  }
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
              <Button title="Close" color='#848c9c' onPress={toggleModalVisibility} />
              <Text style={{ flex: 0.5 }}></Text>
              <Button title="Submit" color='#041c34' onPress={search_issue
              } />
            </View>

            <Text></Text>
          </View>
        </View>
      </Modal>
      <Drawer.Navigator initialRouteName="DashboardScreen"
        useLegacyImplementation
        screenOptions={{
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: '#142c44'
          }

        }}
        drawerContent={(props) => <CustomDrawerConten {...props} />}      >
        <Drawer.Screen name="DashboardScreen" component={DashboardScreen} options={{
          title: "Dashboard", alignSelf: 'center', headerRight: () => (
            <View >
              <View style={styles.container2}>
                <IconButton
                  icon="magnify"
                  style={{ marginBottom: -25 }}
                  size={24}
                  color={Colors.white}
                  onPress={toggleModalVisibility}
                />
                <IconButton
                  icon="logout"
                  size={20}
                  color={Colors.white}
                  onPress={handleLogout}
                />
              </View>
            </View>
          ), headerTitleStyle: { color: 'white', alignSelf: 'center' }, headerStyle: { backgroundColor: "#142c44" },
        }} />
        <Drawer.Screen name="View Issues" component={HomeScreen} options={{
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={25}
              color={Colors.white}
              onPress={toggleModalVisibility}
            />
          )
        }} />

        <Drawer.Screen name="Unassigned" component={UnAssignedScreen} options={{
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={25}
              color={Colors.white}
              onPress={toggleModalVisibility}
            />
          )
        }} />
        <Drawer.Screen name="Assigned to me" component={AssignedScreen} options={{
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={25}
              color={Colors.white}
              onPress={toggleModalVisibility}
            />
          )
        }} />
        <Drawer.Screen name="Monitored by me" component={MonitorScreen} options={{
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={25}
              color={Colors.white}
              onPress={toggleModalVisibility}
            />
          )
        }} />

        <Drawer.Screen name="Reported by me" component={ReportedScreen} options={{
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={25}
              color={Colors.white}
              onPress={toggleModalVisibility}
            />
          )
        }} />

        <Drawer.Screen name="ReportIssue" component={ReportIssue} options={{ title: "Report Issue" }} />
        <Drawer.Screen name="AboutScreen" component={AboutScreen} options={{ title: "About" }} />
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

  container1: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container2: {
    width: 89,
    height: 36, marginRight: 18,
    marginBottom: 8,
    flexDirection: 'row'
  },

  buttonheader: {
    height: 39,
    width: 92,
    marginTop: -254,
    marginLeft: 263
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  button: {
    backgroundColor: '#041c34',
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

    <DrawerContentScrollView {...props} style={{ backgroundColor: '#c8cad0' }} >
      <DrawerItemList {...props} />
      <View >

        <View
          style={{
            flexDirection: 'row',

            paddingVertical: 5,
            paddingLeft: 4,

          }}>
          <View >
            <TextInput
              style={{ height: 40, paddingRight: 20, marginRight: 22, paddingLeft: 12, color: 'black' }}
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
                props.navigation.navigate('IssueDetailScreen', {
                  id: text
                })
              }
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>

  );
}
const Stack = createStackNavigator();

function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardScreen" component={DrawerNav} options={{ headerShown: false }} />
        <Stack.Screen name="IssueDetailScreen" component={IssueDetailScreen} options={{ title: "Issue Details" }} />
        <Stack.Screen name="ReminderScreen" component={ReminderScreen} options={{ title: "Issue Reminder" }} />
        <Stack.Screen name="AddNote" component={AddNote} options={{ title: "Add Notes" }} />
      </Stack.Navigator>

    </NavigationContainer>

  );

}

export default App;