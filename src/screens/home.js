
import React from 'react';
import ViewIssues from '../components/ViewIssues';

const HomeScreen = props => {
    return (
        <ViewIssues navigation={props.navigation} />
    );
};
HomeScreen.navigationOptions = {
    title: 'Issues'
};
export default HomeScreen;


