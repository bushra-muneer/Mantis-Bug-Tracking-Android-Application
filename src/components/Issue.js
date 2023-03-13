import React from 'react';
import {Text, ScrollView, View} from 'react-native';
const Issue = props => {

    
  const dattetime = props.user.updated_at;
  //  "updated_at": "2022-11-14T14:22:11+05:00",
  const date_time = dattetime.split('T');
  const date = date_time[0].split('+');
  const time = date_time[1].split('+');
  const timen = time[0].split('+');
 const s = props.user.priority.id;


 const getBackgroundColor = () => {
  let color;
  if (s == 20) {
    //low
      //color = '#F6D25B';
      color = '#FFF4D2';
  }
 else if (s == 30) {
  //normal --> green
  //  color = '#B1F8AA';
  color = '#9DC08B';
}

else if (s == 40) {
  //high --> blue
 // color = '#89CFF0';
 color = '#B4E4FF';
}
else if (s == 50) {
  //urgent  --> light red
//  color = '#FA8072';
color = '#FFD1D1';
}
else if (s == 60) {
  //immediate --> brighter red
  //color = '#FF4433';
  color = '#FF9494';
}

   else  {
    //none
      //color = '#E0E0E0';
      color = '#ECF2FF';
  }
  return color;
};

  return (
    <ScrollView>
<View style={{backgroundColor:getBackgroundColor(), borderRadius:12,marginBottom:4,marginTop:4,marginHorizontal:4}}>
      <View style={{flexDirection: 'row'}} >
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
     
      </View>
    </ScrollView>
  );
};



export default Issue;
