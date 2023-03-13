
import React from 'react';
import UnassignedIssues from '../components/UnassignedIssues';

const UnAssignedScreen = props => {
    return (
        <UnassignedIssues navigation={props.navigation} />
    );
};
UnAssignedScreen.navigationOptions = {
    title: 'Issues'
};
export default UnAssignedScreen;


