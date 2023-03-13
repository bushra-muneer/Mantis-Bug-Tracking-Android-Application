
import React from 'react';
import ReportedIssues from '../components/ReportedIssues';

const ReportedScreen = props => {
    return (
        <ReportedIssues navigation={props.navigation} />
    );
};
ReportedScreen.navigationOptions = {
    title: 'Issues'
};
export default ReportedScreen;


