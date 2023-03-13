import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewIssuesButton from "../components/Dashboard/ViewIssuesButton";
import AssignedIssuesButton from "../components/Dashboard/AssignedIssuesButton";
import UnassignedIssuesButton from "../components/Dashboard/UnassignedIssuesButton";
import MonitoredButton from "../components/Dashboard/MonitoredButton";
import ReportIssueButton from "../components/Dashboard/ReportIssueButton";
import ReportedByMeButton from "../components/Dashboard/ReportedByMeButton";
import FiltersButton from "../components/Dashboard/FiltersButton";
import LogoutButton from "../components/Dashboard/LogoutButton";
import AboutScreenButton from "../components/Dashboard/AboutScreenButton";
import styles from '../style/ScreenStyle/DasboardScreenStyle';
import * as Keychain from "react-native-keychain";
import { LogBox } from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';

const DashboardScreen = props => {

  const uid = global.uid;
  const qaOwners_url = global.base_url + '/api/rest/projects/rest_projects_get_uid/' + uid;
  const filters_url = global.base_url + '/api/rest/filters';
  const filt_url = global.base_url + '/api/rest/filters/user/'+uid;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatedQA_OwnersData, setUpdatedQA_OwnersData] = useState([]);
  const [updatedFiltersData, setUpdatedFiltersData] = useState([]);
  const [FiltersData, setFiltersData] = useState([]);
  const [qaOwner_text, setQA_OwnerText] = useState('');
  const [filter_text, setFilterText] = useState('');

  useEffect(() => {
    getFilters();
    getQAOwners();
    setIsLoggedIn(global.loggedin);
    setUserDetails(global.userDetails); 
    LogBox.ignoreAllLogs();
    const timeout = setTimeout(() => {
      getFilters();
      setLoading(false);
    }, 4000);
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

    global.filt = t.id;
    console.log(global.filt);
  };

  const getFilters = async () => {
    await axios
      .get(filters_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {
        const all_filters = response.data.filters;
        setUpdatedFiltersData(all_filters);
      setFiltersData(updatedFiltersData);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };
  // const getPrivateFilter = async () => {
  //   await axios
  //     .get(filt_url, {
  //       headers: { Authorization: global.Authorization_Key },
  //     })
  //     .then(response => {
      
  //       const all_filters = response.data;
  //       // console.log( (all_filters));
  //    //   setUpdatedPrivateFiltersData(all_filters);

  //    setUpdatedPrivateFiltersData(all_filters.filter(function(x) { return x.name !== "" })); 

  //        console.log( (updatedPrivateFiltersData));

      

  //     //   console.log('---------------Public Filters-------------------');
  //     //  console.log(updatedFiltersData);
  //       console.log('---------------Private Filters-------------------');
  //       console.log(updatedPrivateFiltersData);
  //       setFiltersData([]);
  //  var obj = Object.assign(updatedFiltersData, updatedPrivateFiltersData);
  //       // console.log(obj);
             
  //         setFiltersData(obj);
   
  //         console.log('---------------All Filters-------------------');
  //     console.log(FiltersData);
   
  //     })
  //     .catch(error => console.error(`Error: $(error)`))
  //     .finally(() => setLoading(false));
  // };

  const getQAOwners = async () => {
    
    await axios
      .get(qaOwners_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {
        const all_qaOwners = response.data.projects;
        setUpdatedQA_OwnersData(all_qaOwners);
        if (global.pref_id == 6) {
          setQA_OwnerText("Production")
        }
        else if (global.pref_id == 3) {
          setQA_OwnerText("Northstar")
        }
        else if (global.pref_id == 0 || global.pref_id == "" || global.pref_id == undefined) {
          setQA_OwnerText("Select Project")
        }
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };


  return (
    <>
      <View style={styles.container1}>
        <Text style={styles.select_text} >Select Project </Text>
        <KeyboardAvoidingView behavior='height' onAccessibilityTap={() => Keyboard.dismiss()} style={{ width: '100%' }} >

          <View >
            <SearchableDropdown
              onTextChange={qaOwners_text => { console.log(qaOwners_text) }}
       
              onItemSelect={item => {
                getQAOwnersById_func(item);
              }}
              containerStyle={{ marginTop: 10, paddingHorizontal: 22 }}
              textInputStyle={{
                padding: 7,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 5,
              }}
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
              placeholderTextColor={'black'}
              itemStyle={{
                padding: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              itemTextStyle={{ color: 'black' }}
              itemsContainerStyle={{
                maxHeight: '100%',
                color: 'black',
              }}
              items={updatedQA_OwnersData}  
              defaultIndex={1}
              placeholder={qaOwner_text.name == null ? (qaOwner_text ?? 'Select') : qaOwner_text.name}
              resPtValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
        </KeyboardAvoidingView>
        <Text style={styles.select_text} >Select Filter </Text>
        <KeyboardAvoidingView behavior='height' onAccessibilityTap={() => Keyboard.dismiss()} style={{ width: '100%' }} >
          <View>
            <SearchableDropdown
              onTextChange={filter_text => { console.log(filter_text), global.filter_choosen = filter_text.name }}
              onItemSelect={item => {
                getFiltersById_func(item);
              }}   
              containerStyle={{ marginTop: 10, paddingHorizontal: 22 }}   
              textInputStyle={{     
                padding: 7,
                backgroundColor: 'white',
                color: 'black',     
                borderRadius: 5,
              }}
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
              placeholderTextColor={'black'}
              itemStyle={{    
                padding: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              itemTextStyle={{
                color: 'black',
              }}
              itemsContainerStyle={{     
                maxHeight: '88%',
                color: 'black',          
              }}
              items={updatedFiltersData}
              defaultIndex={1}
              placeholder={filter_text.name == null ? 'Select Filter' : filter_text.name}
              resPtValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.blue_line}>
        </View>

        <View style={styles.viewissuesRow}>
          <ViewIssuesButton
            style={styles.viewissues}
          ></ViewIssuesButton>
          <AssignedIssuesButton
            style={styles.assignedbtn}
          ></AssignedIssuesButton>
          <UnassignedIssuesButton
            style={styles.unassignedbutton}
          ></UnassignedIssuesButton>
        </View>
        <View style={styles.monitoredbuttonRow}>
          <MonitoredButton
            style={styles.monitoredbutton}
          ></MonitoredButton>
          <ReportIssueButton
            style={styles.reportissuebtn}
          ></ReportIssueButton>
          <ReportedByMeButton
            style={styles.reportedissue_button}
          ></ReportedByMeButton>
        </View>
        <View style={styles.viewIssuesRow}>
          <Text style={styles.viewIssues}>View Issues</Text>
          <Text style={styles.AssignedScreen}>Assigned</Text>
          <Text style={styles.UnAssignedScreen}>Unassigned</Text>
        </View>
        <View style={styles.monitoredRow}>
          <Text style={styles.monitored}>Monitored</Text>
          <Text style={styles.reportIssue}>Report Issue</Text>
          <Text style={styles.ReportedScreen}>Reported</Text>
        </View>
        <View style={styles.filtersbtnRow}>
          <FiltersButton
            style={styles.filtersbtn}
          ></FiltersButton>
          <LogoutButton
            style={styles.logoutbtn}
          ></LogoutButton>
          <AboutScreenButton
            style={styles.aboutbtn}
          ></AboutScreenButton>
        </View>
        <View style={styles.filtersRow}>
          <Text style={styles.filters}>Filters</Text>
          <Text style={styles.logout}>Logout</Text>
          <Text style={styles.about}>About</Text>
        </View>
      </View>
    </>
  );
};
DashboardScreen.navigationOptions = {
  title: 'Dashboard',
};
export default DashboardScreen;

