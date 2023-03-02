
import React from 'react';
import Users from '../components/Users';
import { NavigationContainer } from "@react-navigation/native";
import MonitorUsers from '../components/MonitorUsers';


const MonitorScreen = props => {
    
    return (
        
        <MonitorUsers navigation={props.navigation} />
     
      
    );
};
MonitorScreen.navigationOptions = {
    title: 'Issues'
};
export default MonitorScreen;


