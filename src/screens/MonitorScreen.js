
import React from 'react';
import MonitorIssues from '../components/MonitorIssues';


const MonitorScreen = props => {
    return (
        <MonitorIssues navigation={props.navigation} />
    );
};
MonitorScreen.navigationOptions = {
    title: 'Issues'
};
export default MonitorScreen;


