
import React from 'react';
import AssignedIssues from '../components/AssignedIssues';

const AssignedScreen = props => {
    return (
        <AssignedIssues navigation={props.navigation} />
    );
};
AssignedScreen.navigationOptions = {
    title: 'Issues'
};
export default AssignedScreen;


