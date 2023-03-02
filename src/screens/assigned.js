
import React from 'react';

import AssignedUsers from '../components/AssignedUsers';


const AssignedScreen = props => {
    
    return (
        
        <AssignedUsers navigation={props.navigation} />
     
      
    );
};
AssignedScreen.navigationOptions = {
    title: 'Issues'
};
export default AssignedScreen;


