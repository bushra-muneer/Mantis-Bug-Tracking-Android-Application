import React from 'react';
import {Text, ScrollView, View} from 'react-native';
const User = props => {

    
  const dattetime = props.user.updated_at;
  //  "updated_at": "2022-11-14T14:22:11+05:00",
  const date_time = dattetime.split('T');
  const date = date_time[0].split('+');
  const time = date_time[1].split('+');
  const timen = time[0].split('+');
  return (
    <ScrollView>

      <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 8, color: 'black', textAlign: 'left'}}>
          {props.user.id}
        </Text>

        <Text style={{padding: 7, color: 'black', flexWrap: 'wrap',flex: 2,}}>
          {props.user.summary} - {date} {timen}
        </Text>
      
       
      </View>
      <Text style={{paddingHorizontal: 68, color: 'black', flexWrap: 'wrap'}}>
          {props.user.status.label} - {props.user.category.name}
        </Text>
        <Text></Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
    </ScrollView>
  );
};



export default User;
