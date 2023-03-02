
import React from 'react';
import Users from '../components/Users';
import { NavigationContainer } from "@react-navigation/native";
import MonitorUsers from '../components/MonitorUsers';
import ReportedUsers from '../components/ReportedUsers';


const ReportedScreen = props => {
    
    return (
        
        <ReportedUsers navigation={props.navigation} />
     
      
    );
};
ReportedScreen.navigationOptions = {
    title: 'Issues'
};
export default ReportedScreen;


