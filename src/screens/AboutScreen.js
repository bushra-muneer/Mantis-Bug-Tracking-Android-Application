import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
 
} from 'react-native';


import { LogBox  } from 'react-native';

const AboutScreen = props => {
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    LogBox.ignoreAllLogs();
   
  }, [loading]);

  
  return (
<>
 
      <View style={styles.container}>
        <View style={{width: '100%', marginTop: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 15
        }}>
            Sample About Screen
            </Text>  
           
          </View>
        </View>


       
 </View>
   </>
   );
 };

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: 'white',
  padding:4,
    color: 'black',
  },

});
