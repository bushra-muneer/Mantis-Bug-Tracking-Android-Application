import {StyleSheet, Text, View,Keyboard, KeyboardAvoidingView} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from 'react-native-paper';
// import CupertinoButtonPurple from "../components/CupertinoButtonPurple";
// import CupertinoButtonPurple1 from "../components/CupertinoButtonPurple1";
// import CupertinoButtonPurple2 from "../components/CupertinoButtonPurple2";
// import CupertinoButtonPurple3 from "../components/CupertinoButtonPurple3";
// import CupertinoButtonPurple4 from "../components/CupertinoButtonPurple4";
// import CupertinoButtonPurple5 from "../components/CupertinoButtonPurple5";
// import CupertinoButtonPurple6 from "../components/CupertinoButtonPurple6";
// import CupertinoButtonPurple7 from "../components/CupertinoButtonPurple7";
 import CupertinoSearchBarBasic from "../components/CupertinoSearchBarBasic";



import CupertinoButtonDelete from "../components/Dashboard/CupertinoButtonDelete";
import CupertinoButtonDelete2 from "../components/Dashboard/CupertinoButtonDelete2";
import CupertinoButtonDelete3 from "../components/Dashboard/CupertinoButtonDelete3";
import CupertinoButtonDelete1 from "../components/Dashboard/CupertinoButtonDelete1";
import CupertinoButtonDelete4 from "../components/Dashboard/CupertinoButtonDelete4";
import CupertinoButtonDelete8 from "../components/Dashboard/CupertinoButtonDelete8";
import CupertinoButtonDelete6 from "../components/Dashboard/CupertinoButtonDelete6";
import CupertinoButtonDelete7 from "../components/Dashboard/CupertinoButtonDelete7";
import CupertinoButtonDelete5 from "../components/Dashboard/CupertinoButtonDelete5";



import * as Keychain from "react-native-keychain";
import { LogBox  } from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';
//import { ScrollView } from 'react-native-gesture-handler';

const InitialScreen = props => {

  const uid =  global.uid;
  console.log(uid);
  const baseurl='http://mantis.sibisoft.com';
  const qaOwners_url =
  baseurl+'/api/rest/projects/rest_projects_get_uid/'+uid;
  const filters_url =
  baseurl+'/api/rest/filters';

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [updatedQA_OwnersData, setUpdatedQA_OwnersData] = useState([]);
  const [updatedFiltersData, setUpdatedFiltersData] = useState([]);

  const [updatedClientsData, setUpdatedClientsData] = useState([]);
  const [module_text, setModuleText] = useState('');

  const [qaOwner_text, setQA_OwnerText] = useState('');
  const [filter_text, setFilterText] = useState('');

    useEffect(() => {
      getQAOwners();
setIsLoggedIn(global.loggedin);
setUserDetails(global.userDetails);

      LogBox.ignoreAllLogs();
      const timeout = setTimeout(() => {
        setLoading(false);
        console.log(loading);
      }, 1000);
   
      getQAOwners();
      getFilters();
      return () => clearTimeout(timeout);
    }, [loading]);

    const getQAOwnersById_func = t => {
     
      setQA_OwnerText(t);
      console.log(t);
    };
    const getFiltersById_func = t => {
      setFilterText(t);
      console.log(t);
    };


    const handleLogout = async()=>{
      const logout = await Keychain.resetGenericPassword();
      console.log({logout});
      props.navigation.navigate('LoginScreen'
   
      )
     
      if(logout){
        setIsLoggedIn(false);
        setUserDetails({});
      }
    }
    const getFilters = async () => {
      await axios
        .get(filters_url, {
          headers: {Authorization: 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh'},
        })
        .then(response => {
          const all_filters = response.data.filters;
  

  
          setUpdatedFiltersData(all_filters);
  
          console.log('---------------Project-------------------');
          console.log(updatedFiltersData);
        })
        .catch(error => console.error(`Error: $(error)`))
        .finally(() => setLoading(false));
    };
    
    const getQAOwners = async () => {
    //  alert(global.pref_id);
      await axios
        .get(qaOwners_url, {
          headers: {Authorization: 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh'},
        })
        .then(response => {
          const all_qaOwners = response.data.projects;
  

  
          setUpdatedQA_OwnersData(all_qaOwners);
  
          console.log('---------------Project-------------------');
          console.log(updatedQA_OwnersData);
          if (global.pref_id==6){
            setQA_OwnerText("Production")
          }
          else if (global.pref_id==3){
            setQA_OwnerText("Northstar")
          }
          else if (global.pref_id==0 || global.pref_id==""|| global.pref_id ==undefined){
            setQA_OwnerText("Select Project")
          }
       
        })
        .catch(error => console.error(`Error: $(error)`))
        .finally(() => setLoading(false));
    };
    
  
  return (
<>
<View style={styles.container1}>
<Text style={{color:'black',marginLeft:25, fontWeight:'500', paddingTop:10,fontSize:15}} >Select Project </Text>
<KeyboardAvoidingView behavior='height'   onAccessibilityTap={()=>Keyboard.dismiss()} style={{width: '100%'}} >
           
           <View style={styles.container_dd}>
       
                         <SearchableDropdown 
                 onTextChange={qaOwners_text => {console.log(qaOwners_text)}}
                 // Listner on the searchable input
                 onItemSelect={item => {
                   getQAOwnersById_func(item);
                 }}
                
                 // Called after the selection
                 containerStyle={{marginTop:10,paddingHorizontal:22}}
                 // Suggestion container style
                 textInputStyle={{
                   // Inserted text style
                   padding: 7,
                  // borderWidth: 1,
               //    borderColor: '#ccc',
                   backgroundColor: 'white',
                   color: 'black',
                 //  padding: 12,
                   //borderWidth: 1,
                 //  borderColor: '#ccc',
                   borderRadius: 5,
                 }}
                 listProps={
                   {
                     nestedScrollEnabled: true,
                   }
                 }
                 placeholderTextColor={'black'}
                 itemStyle={{
                   // Single dropdown item style
                   padding: 10,
                   //marginTop: 2,
                   //borderWidth: 1,
                   //borderLeftWidth:  0,
                   //borderRightWidth:  0,
                   //borderTopWidth:  0,
                   backgroundColor: 'white',
                  // borderColor: '#ccc',
                   color: 'black',
                 }}
                 itemTextStyle={{
                   // Text style of a single dropdown item
   
                   color: 'black',
                 }}
                 
                 itemsContainerStyle={{
                   // Items container style you can pass maxHeight
                   // To restrict the items dropdown hieght
                   maxHeight: '100%',
                    color: 'black',
                   // borderWidth: 1,
                   //borderColor: '#ccc',
                 }}
                 items={updatedQA_OwnersData}
                 // Mapping of item array
                 defaultIndex={1}
                 // Default selected item index
                 placeholder={qaOwner_text.name== null ? (qaOwner_text ?? 'Select') : qaOwner_text.name}
                 // place holder for the search input
                 resPtValue={false}
                 // Reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                
                 // To remove the underline from the android input
               />
           
            
              </View>
          
           </KeyboardAvoidingView>
     
        

<Text style={{color:'black',marginLeft:25, fontWeight:'500', paddingTop:10,fontSize:15}} >Select Filter </Text>

<KeyboardAvoidingView behavior='height'   onAccessibilityTap={()=>Keyboard.dismiss()} style={{width: '100%'}} >
           
           <View style={styles.container_dd}>
       
                         <SearchableDropdown 
                 onTextChange={filter_text => {console.log(filter_text)}}
                 // Listner on the searchable input
                 onItemSelect={item => {
                   getFiltersById_func(item);
                 }}
                
                 // Called after the selection
                 containerStyle={{marginTop:10,paddingHorizontal:22}}
                 // Suggestion container style
                 textInputStyle={{
                   // Inserted text style
                   padding: 7,
                  // borderWidth: 1,
               //    borderColor: '#ccc',
                   backgroundColor: 'white',
                   color: 'black',
                 //  padding: 12,
                   //borderWidth: 1,
                 //  borderColor: '#ccc',
                   borderRadius: 5,
                 }}
                 listProps={
                   {
                     nestedScrollEnabled: true,
                   }
                 }
                 placeholderTextColor={'black'}
                 itemStyle={{
                   // Single dropdown item style
                   padding: 10,
                   //marginTop: 2,
                   //borderWidth: 1,
                   //borderLeftWidth:  0,
                   //borderRightWidth:  0,
                   //borderTopWidth:  0,
                   backgroundColor: 'white',
                  // borderColor: '#ccc',
                   color: 'black',
                 }}
                 itemTextStyle={{
                   // Text style of a single dropdown item
   
                   color: 'black',
                 }}
                 
                 itemsContainerStyle={{
                   // Items container style you can pass maxHeight
                   // To restrict the items dropdown hieght
                   maxHeight: '95%',
                    color: 'black',
                   // borderWidth: 1,
                   //borderColor: '#ccc',
                 }}
                 items={updatedFiltersData}
                 // Mapping of item array
                 defaultIndex={1}
                 // Default selected item index
                 placeholder={filter_text.name== null ? 'Select Filter' : filter_text.name}
                 // place holder for the search input
                 resPtValue={false}
                 // Reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                
                 // To remove the underline from the android input
               />
           
            
              </View>
          
           </KeyboardAvoidingView>
<View style={{flexDirection:'row' , flexWrap:'wrap',width:140,alignSelf:'center',marginTop:20,
    borderBottomColor: '#142c44',
    
    borderBottomWidth: 3,}}>
      </View>
    
      <View style={styles.viewissuesRow}>
        <CupertinoButtonDelete
          style={styles.viewissues}
        ></CupertinoButtonDelete>
        <CupertinoButtonDelete2
          style={styles.assignedbtn}
        ></CupertinoButtonDelete2>
        <CupertinoButtonDelete3
          style={styles.unassignedbutton}
        ></CupertinoButtonDelete3>
      </View>
      <View style={styles.monitoredbuttonRow}>
        <CupertinoButtonDelete1
          style={styles.monitoredbutton}
        ></CupertinoButtonDelete1>
        <CupertinoButtonDelete4
          style={styles.reportissuebtn}
        ></CupertinoButtonDelete4>
        <CupertinoButtonDelete8
          style={styles.reportedissue_button}
        ></CupertinoButtonDelete8>
      </View>
      <View style={styles.viewIssuesRow}>
        <Text style={styles.viewIssues}>View Issues</Text>
        <Text style={styles.assigned}>Assigned</Text>
        <Text style={styles.unassigned}>Unassigned</Text>
      </View>
      <View style={styles.monitoredRow}>
        <Text style={styles.monitored}>Monitored</Text>
        <Text style={styles.reportIssue}>Report Issue</Text>
        <Text style={styles.reported}>Reported</Text>
      </View>
      <View style={styles.filtersbtnRow}>
        <CupertinoButtonDelete6
          style={styles.filtersbtn}
        ></CupertinoButtonDelete6>
        <CupertinoButtonDelete7
          style={styles.logoutbtn}
        ></CupertinoButtonDelete7>
        <CupertinoButtonDelete5
          style={styles.aboutbtn}
        ></CupertinoButtonDelete5>
      </View>
      <View style={styles.filtersRow}>
        <Text style={styles.filters}>filters</Text>
        <Text style={styles.logout}>Logout</Text>
        <Text style={styles.about}>About</Text>
      </View>
      
   
{/* <View
      style={{
        flexDirection: 'column',
        height: '100%',
      }}
    >
       
       
        <View style={styles.container}>


           */}
      {/* <View style={styles.button_ViewIssuesRow}>
        <CupertinoButtonPurple 
          style={styles.button_ViewIssues}
        ></CupertinoButtonPurple>
        <CupertinoButtonPurple1
          style={styles.button_Assignedtome}
        ></CupertinoButtonPurple1>
      </View>
      <View style={styles.button_ReportIssueRow}>
        <CupertinoButtonPurple2
          style={styles.button_ReportIssue}
        ></CupertinoButtonPurple2>
        <CupertinoButtonPurple3
          style={styles.button_Unassigned}
        ></CupertinoButtonPurple3>
      </View>


      <View style={styles.cupertinoButtonPurple4Row}>
        <CupertinoButtonPurple4
          style={styles.cupertinoButtonPurple4}
        ></CupertinoButtonPurple4>
        <CupertinoButtonPurple5
          style={styles.cupertinoButtonPurple5}
        ></CupertinoButtonPurple5>
      </View>
    
    
      <View style={styles.cupertinoButtonPurple6Row}>
        <CupertinoButtonPurple6
          style={styles.cupertinoButtonPurple6}
        ></CupertinoButtonPurple6>
        <CupertinoButtonPurple7
          style={styles.cupertinoButtonPurple7}
        ></CupertinoButtonPurple7>
      </View>
     */}
      {/* <CupertinoSearchBarBasic
        style={styles.cupertinoSearchBarBasic}
      ></CupertinoSearchBarBasic>
      */}
    
      {/* <View >
    
        <SearchableDropdown
        onTextChange={qaOwner_text => {keyboard.dismiss(),console.log(qaOwner_text), setQA_OwnerText(qaOwner_text)}}
          // Change listner on the searchable input
          onItemSelect={item => {
            getQAOwnersById_func(item.id);
          }}
          dropDownDirection="TOP"
          // Called after the selection from the dropdown
          containerStyle={{padding: 14,marginTop:-590,borderRadius:12}}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={updatedQA_OwnersData}
          // Mapping of item array
          defaultIndex={2}
          // Default selected item index
          placeholder={qaOwner_text.name== null ? 'Project' : qaOwner_text.name}
          placeholderTextColor="black"
          // Place holder for the search input
          resetValue={false}
          // Reset textInput Value with true and false state
          // underlineColorAndroid="transparent"
          // To remove the underline from the android input
        />
      </View> */}  
      
       {/* <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}> */}
          {/* <View 
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
         */}
         {/* <Text style={{color:'black',paddingTop:30, marginTop:10,marginLeft:25, fontWeight:'500',fontSize:15}} >Select Project </Text>
           */}
             {/* <KeyboardAvoidingView behavior='height'   onAccessibilityTap={()=>Keyboard.dismiss()} style={{width: '100%'}} >
           
        <View style={styles.container_dd}>
    
                      <SearchableDropdown 
              onTextChange={qaOwners_text => {console.log(qaOwners_text)}}
              // Listner on the searchable input
              onItemSelect={item => {
                getQAOwnersById_func(item);
              }}
             
              // Called after the selection
              containerStyle={{marginTop:-700,paddingHorizontal:22}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
               // borderWidth: 1,
            //    borderColor: '#ccc',
                backgroundColor: 'white',
                color: 'black',
              //  padding: 12,
                //borderWidth: 1,
              //  borderColor: '#ccc',
                borderRadius: 5,
              }}
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                //marginTop: 2,
                //borderWidth: 1,
                //borderLeftWidth:  0,
                //borderRightWidth:  0,
                //borderTopWidth:  0,
                backgroundColor: 'white',
               // borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '100%',
                 color: 'black',
                // borderWidth: 1,
                //borderColor: '#ccc',
              }}
              items={updatedQA_OwnersData}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={qaOwner_text.name== null ? 'Select' : qaOwner_text.name}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
             
              // To remove the underline from the android input
            />
        
         
           </View>
       
        </KeyboardAvoidingView> */}
  
           {/* <KeyboardAvoidingView behavior='height'   onAccessibilityTap={()=>Keyboard.dismiss()} style={{width: '100%'}} >
          
        <View style={styles.container_dd}>
    
                      <SearchableDropdown 
              onTextChange={qaOwners_text => {console.log(qaOwners_text)}}
              // Listner on the searchable input
              onItemSelect={item => {
                getQAOwnersById_func(item);
              }}
             
              // Called after the selection
              containerStyle={{marginTop:-720,paddingHorizontal:22}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
               // borderWidth: 1,
            //    borderColor: '#ccc',
                backgroundColor: 'white',
                color: 'black',
              //  padding: 12,
                //borderWidth: 1,
              //  borderColor: '#ccc',
                borderRadius: 5,
              }}
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                //marginTop: 2,
                //borderWidth: 1,
                //borderLeftWidth:  0,
                //borderRightWidth:  0,
                //borderTopWidth:  0,
                backgroundColor: 'white',
               // borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '100%',
                 color: 'black',
                // borderWidth: 1,
                //borderColor: '#ccc',
              }}
              items={updatedQA_OwnersData}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={qaOwner_text.name== null ? 'Select' : qaOwner_text.name}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
             
              // To remove the underline from the android input
            />
        
         
           </View>
       
        </KeyboardAvoidingView> */}
      
             {/* </TouchableWithoutFeedback> */}

</View>
    </>  
  );
};
InitialScreen.navigationOptions = {
  title: 'Dashboard',
};
export default InitialScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 2,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container_dd: {
   // paddingTop: 30,
  
   // marginLeft: 20,
   // marginRight: 20,
    
  },

  titleText: {
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
 
  button_ViewIssues: {
    height: 54,
    width: 158
  },
  button_Assignedtome: {
    height: 54,
    width: 153,
    marginLeft: 7
  },
  button_ViewIssuesRow: {
    height: 54,
    flexDirection: "row",
    marginTop: 199,
    marginLeft: 24,
    marginRight: 33
  },
  button_ReportIssue: {
    height: 52,
    width: 158
  },
  button_Unassigned: {
    height: 52,
    width: 153,
    marginLeft: 7
  },
  button_ReportIssueRow: {
    height: 52,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 24,
    marginRight: 33
  },
  cupertinoButtonPurple4: {
    height: 52,
    width: 156
  },
  cupertinoButtonPurple5: {
    height: 52,
    width: 153,
    marginLeft: 9
  },
  cupertinoButtonPurple4Row: {
    height: 52,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 24,
    marginRight: 33
  },
  cupertinoButtonPurple6: {
    height: 55,
    width: 156
  },
  cupertinoButtonPurple7: {
    height: 55,
    width: 156,
    marginLeft: 8
  },
  cupertinoButtonPurple6Row: {
    height: 55,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 24,
    marginRight: 31
  },
  cupertinoSearchBarBasic: {
    width: 319,
    height: 41.5,
    marginTop: -610,
    alignSelf: "center"
  },
  selectProject: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 21,
    marginLeft:25,
    marginBottom:4,
  },
  cupertinoButtonInfo: {
    height: 38,
    width: 89,
    marginTop: -139,
    marginLeft: 267
  },
  container: {
    flex:0.0025,
   // borderWidth: 1,
   flexDirection:'column',
    borderColor: "rgba(255,255,255,1)",
 
    backgroundColor: '#c8cad0',
    height:'100%',
   
   
  },
  container1: {
   
   // borderWidth: 1,

    borderColor: "rgba(255,255,255,1)",

    backgroundColor: '#c8cad0',
    height:'100%',
   
   
  },
  viewissues: {
    height: 85,
    width: 84,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 3
  },
  assignedbtn: {
    height: 85,
    width: 84,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 9,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 24
  },
  unassignedbutton: {
    height: 85,
    width: 84,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 9,
    marginLeft: 22
  },
  viewissuesRow: {
    height: 88,
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 37,
    marginRight: 40
  },
  monitoredbutton: {
    height: 85,
    width: 84,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 9
  },
  reportissuebtn: {
    height: 85,
    width: 84,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 23
  },
  reportedissue_button: {
    height: 85,
    width: 84,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: 9,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 22
  },
  monitoredbuttonRow: {
    height: 85,
    flexDirection: "row",
    marginTop: 42,
    marginLeft: 37,
    marginRight: 40
  },
  viewIssues: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14
  },
  assigned: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 36
  },
  unassigned: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 37
  },
  viewIssuesRow: {
    height: 19,
    flexDirection: "row",
    marginTop: -117,
    marginLeft: 47,
    marginRight: 50
  },
  monitored: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  reportIssue: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 35
  },
  reported: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 38
  },
  monitoredRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 115,
    marginLeft: 47,
    marginRight: 56
  },
  filtersbtn: {
    height: 85,
    width: 84,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 9
  },
  logoutbtn: {
    height: 85,
    width: 84,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 9,
    marginLeft: 26
  },
  aboutbtn: {
    height: 85,
    width: 84,
    
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 9,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginLeft: 20
  },
  filtersbtnRow: {
    height: 85,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 38,
    marginRight: 39
  },
  filters: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  logout: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 67
  },
  about: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 67
  },
  filtersRow: {
    height: 19,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 62,
    marginRight: 63,
  
  }
});
