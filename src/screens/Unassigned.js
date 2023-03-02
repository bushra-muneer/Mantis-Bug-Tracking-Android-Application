
import React from 'react';

import UnassignedUsers from '../components/UnassignedUsers';


const UnAssignedScreen = props => {
    
    return (
        
        <UnassignedUsers navigation={props.navigation} />
     
      
    );
};
UnAssignedScreen.navigationOptions = {
    title: 'Issues'
};
export default UnAssignedScreen;


