// // import React from 'react';
// // import { createAppContainer } from 'react-navigation';
// // import { createStackNavigator } from 'react-navigation-stack';
// import HomeScreen from './home';
// import LoginScreen from '../components/login';
// import UserScreen from './user';
// import InitialScreen from './Initial';
// import ReminderScreen from './Reminder';


// import { Button } from 'react-native';

// // const StackNavigator = createStackNavigator({
// //     Login: LoginScreen,
// //     Initial:InitialScreen,
// //     Home: HomeScreen,
// //     User: UserScreen,
// //     Reminder: ReminderScreen,

// // });
// // export default createAppContainer(StackNavigator);




// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-gesture-handler';


// import React, { useState } from 'react';
// import User from '../components/User';

// const Drawer = createDrawerNavigator();

// const AppDrawer = () => {
//   return (
   
//    <Drawer.Navigator >
//               <Drawer.Screen
//                   name="Signout"
//                   component={Root2}
//                   options={{headerShown:false ,   drawerItemStyle: { height: 0 }}}
                 
//                 />

//                  {/* <Drawer.Screen
//                   name= "Initial"
//                   component={InitialScreen}
//                   options={{ title: 'Mantis' }}
//                 /> */}

// <Drawer.Screen
//                   name= "Home"
//                   component={HomeScreen}
//                   options={{ title: 'View Issues' }}
//                 />
              
//               <Drawer.Screen
//                   name= "Initial"
//                   component={InitialScreen}
//                   options={{ title: 'Report Issue' }}
//                 />
              
             
//               {/* <Drawer.Screen name="User" options={{ headerShown: true , title: 'Issue Detail' }} component={UserScreen} />

//               <Drawer.Screen name="Reminder" options={{ headerShown: true , title: 'Report Issue' }} component={ReminderScreen} /> */}
//                    {/*
//                  <Drawer.Screen
//                   name=
//                   "UserScreen"
//                   component={UserScreen}
                
//                 />
//                  <Drawer.Screen
//                   name=
//                   "Reminder"
//                   component={ReminderScreen}
                
//                 /> */}
//                </Drawer.Navigator>  
//       //          <>
//       //             <Stack.Navigator initialRouteName="Login">
 
//       //  <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
//       //    <Stack.Screen name="Initial" options={{ headerShown: false }} component={InitialScreen} />
      
//       //  </Stack.Navigator>

//         // </>
//   // }
         
//             // </> 
//   );
// }

// const Stack = createStackNavigator();


// // const StackNavigator = createStackNavigator({
// //     Login: LoginScreen,
// //     Initial:InitialScreen,
// //     Home: HomeScreen,
// //     User: UserScreen,
// //     Reminder: ReminderScreen,

// // });

// function Root2() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
 
//       <Stack.Screen name="LoginPage" options={{ headerShown: false }} component={LoginScreen} />
   
//       <Stack.Screen name="Home"  options={{
       
      
        
//           title: 'Issues'
//         }} component={HomeScreen} />
   
//       <Stack.Screen name="User" options={{ headerShown: true , title: 'Issue Detail' }} component={UserScreen} />
   
//       <Stack.Screen name="Reminder" options={{ headerShown: true , title: 'Send Reminder' }} component={ReminderScreen} />
//       {/* <Stack.Screen
//                   name= "Initial"
//                   component={InitialScreen}
                 
//                 /> */}
//       {/* <Stack.Screen name="ReportIssues" options={{ headerShown: false }} component={ReportIssues} /> */}

//     </Stack.Navigator>
//   );
// }
// function MyCustomDrawer() {
//   return (
//     <NavigationContainer>
//       <AppDrawer />
//     </NavigationContainer>
//   );
// }

// export default MyCustomDrawer;


import * as React from 'react';

import { Pressable, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {

  createStackNavigator,

  HeaderBackButton,

} from '@react-navigation/stack';

import HomeScreen from './home';
import LoginScreen from '../components/login';
import UserScreen from './user';
import ReminderScreen from './Reminder';

import { createDrawerNavigator } from "@react-navigation/drawer";
import ReportIssue from './ReportIssue';

global.__reanimatedWorkletInit = () => {};


 

function DrawerNav() {

  const Drawer = createDrawerNavigator();


 

  return (

    <Drawer.Navigator initialRouteName="HomeScreen">

     <Drawer.Screen name="Mantis Issues" component={HomeScreen} />
   
      <Drawer.Screen name="ReportIssue" component={ReportIssue} options={{ title: "Report Issue" }} />

    </Drawer.Navigator>

  );

}




const Stack = createStackNavigator();

function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }} />

       

        <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: "Issue Details" }}/>

        <Stack.Screen name="ReminderScreen" component={ReminderScreen} options={{ title: "Issue Reminder" }}/>

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