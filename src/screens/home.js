
import React from 'react';
import Users from '../components/Users';
import { NavigationContainer } from "@react-navigation/native";


const HomeScreen = props => {
    
    return (
        
        <Users navigation={props.navigation} />
     
      
    );
};
HomeScreen.navigationOptions = {
    title: 'Issues'
};
export default HomeScreen;


