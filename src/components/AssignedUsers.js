import React, { useEffect, useState } from 'react';
import { ActivityIndicator,View, Text, FlatList, TouchableOpacity,StyleSheet,StatusBar,TextInput, Dimensions,Button,ScrollView } from 'react-native';
import User from './User';
import { Searchbar } from 'react-native-paper';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios  from 'axios';
import { NavigationEvents } from 'react-navigation';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get("window");
// import CupertinoSearchBarBasic2 from "../components/Dashboard/CupertinoSearchBarBasic2";

import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


// function Users({props,route,navigation}){
 const AssignedUsers = props => {

  const id = props.id;
  const [buttonIdd, setButtonId] = React.useState('');

    const KEYS_TO_FILTERS = ['id'];

    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]); 
    const [search, setSearch] = useState('');
    const [searchTerm, searchUpdated] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [uri, setUri] = useState('');

    const url='http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=assigned';

    //const url='http://192.168.8.102:1234/mantis/api/rest/issues';
//const getIssues_url = baseurl + '/api/rest/issues/' + uid + '/' + id;

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    const [searchText, setSearchText] = useState();


    const getUsers= async ()=>{
    //   setUsers([]);
    //   setFilteredDataSource([]);
    //   setMasterDataSource([]);
    //   if (buttonIdd=="unassigned"){

    //     setUri('http://mantis.sibisoft.com/api/rest/issues+'+global.uid+'/?filter_id=unassigned')
    //   }
    //   else if (buttonIdd=="assigned"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues+'+global.uid+'/?filter_id=assigned')
        
    //   }
    //   else if (buttonIdd=="monitored"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues+'+global.uid+'/?filter_id=monitored')
      
    //   }
    //   else if (buttonIdd=="reported"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues+'+global.uid+'/?filter_id=reported')
    //   }
    //   else if (buttonIdd=="View Issues"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues');
    //   }
    //  else if (buttonIdd=="issues"){
    //   setUri('http://mantis.sibisoft.com/api/rest/issues');
    //  }
    // //  else {
    // //   setUri('http://mantis.sibisoft.com/api/rest/issues');
    // //  }

    //   console.log(uri);
     
    await axios.get(url,{ headers: {'Authorization': '3s5Dj1Nc1A6ur-JsQlG4DXs6oHO0rFE1'} })
    .then((response)=>{
    const allissues = response.data.issues;
   
    setUsers(allissues);
    setFilteredDataSource(allissues);
    setMasterDataSource(allissues);
    setTimeout(() => {
        setUsers(allissues);
        setFilteredDataSource(allissues);
        setMasterDataSource(allissues);
      
        console.log(allissues);
    }, 10000)

})
      
    .catch(error =>console.error(`Error: $(error)`))
    .finally(() => setLoading(false));
    }


    //filtering
    const searchFilteredData = searchText
        ? filteredDataSource.filter((x) =>
                x.id.toString().includes(searchText.toString()),
               
          )
        : filteredDataSource;

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = masterDataSource.filter(
            function (item) {
              const itemData = item.id
                ? item.id.toString()
                : ''.toString();
              const textData = text.toString();
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };


    // const searchFilterFunction = (searchText) => {
    //     // Check if searched text is not blank
    //     if (searchText) {
    //       // Inserted text is not blank
    //       // Filter the masterDataSource
    //       // Update FilteredDataSource


    //       filteredDataSource.filter((x) =>
    //             x.id.toString().includes(searchText.toString())
    //       )
    //       const newData = masterDataSource.filter(
    //         function (item) {
    //           const itemData = item.id
    //             ? item.id.toString()
    //             : ''.toString();
    //           const textData = searchText.toString();
    //           return itemData.indexOf(textData) > -1;
    //       });
    //       setFilteredDataSource(newData);
    //       setSearchText(searchText);
    //     } else {
    //       // Inserted text is blank
    //       // Update FilteredDataSource with masterDataSource
    //       setFilteredDataSource(masterDataSource);
    //       setSearchText(searchText);
    //     }
    //   };



    function renderHeader() {
        return (
          <View
            // style={{
            //   backgroundColor: '#fff',
            //   padding: 4,
            //   marginVertical: 4,
            //   borderRadius: 15
            // }}
          > 



<TextInput
        placeholder="Enter Issue #"
        style={{ backgroundColor: '#fff', paddingHorizontal: 20,color:'black', height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10, }}
        keyboardType={'phone-pad'}
        placeholderTextColor="#000" 
       onChangeText={(text) => searchFilterFunction(text)}
         value={search}
        //  onKeyPress={({ nativeEvent,text }) => {
        //     if (nativeEvent.key === 'Backspace') {
        //      setSearch('');
            
        //     }
        //     if (nativeEvent.key === 'Enter'){
        //         searchFilterFunction(text)
        //     }
        //   }}
          
        // onSubmitEditing={(value) =>  {setSearchText(value.nativeEvent.text)
        //  }}
    
    />


          </View>
        );
      }
     
    
   


    useEffect(() => {
      const uid =  global.uid;
      console.log(uid);
      console.log(id);
      setUsers([]);
      setFilteredDataSource([]);
      setMasterDataSource([]);
    //  alert(global.buttonId);
    
     setButtonId(global.buttonId);
     
        setLoading(true);
        
        getUsers();
        LogBox.ignoreAllLogs();
    }, [global.buttonId,buttonIdd]);
    const filteredDaaSource = searchTerm =='' ? filteredDataSource :filteredDataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    return(
        
        <View style={{ padding: 2,color:'black' }}>
            {isLoading ?  <View style={[styles.container, styles.horizontal]}>
  
   
    <ActivityIndicator size="large" color="grey" />
  </View> :
            (
                <>
                
                <View  >
                     <Text style={styles.title}>{ 'Assigned'}</Text>
                {/* <FlatList
                    data={filteredDataSource}
                    ListHeaderComponent={renderHeader}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={
                        ({ item }) =>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate('UserScreen', {
                                    id: item.id
                                })
                            }
                        >
                            <View>
                                <User user={item} />
                            </View>
                        </TouchableOpacity>
                    }
                />
                 */}
                  <View style={styles.cupertinoSearchBarBasic2}>
      <View style={styles.inputBox}>
        {/* <Icon name="magnify" style={styles.inputLeftIcon}></Icon> */}
        <TextInput  maxLength={6} placeholder={'Ticket Filter' } placeholderTextColor={'black'}  
      style={styles.inputStyle}  keyboardType={'phone-pad'}
      value={searchTerm ?? ''}
      onChangeText={(searchTerm) => { searchUpdated(searchTerm) }} 
            
 ></TextInput>
        {/* <IconButton
              icon="magnify"
              size={25}
          
           
              onPress={() =>{
        anotherFunc() 

                // navigation.navigate('UserScreen', {
                //   id: text
                // })
               
                callSearch(text)
              }
              
              }
            /> */}
      </View>
    </View>

     
{/*     
                   <SearchInput 
          onChangeText={(term) => { searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Enter Issue #"
      
          /> */}
                 <ScrollView>
          {filteredDaaSource.map(item => {
            return (
                <TouchableOpacity 
                onPress={() => (
                    props.navigation.navigate('UserScreen', {
                        id: item.id
                    }),
                    console.log("-------------------------"),
                    console.log(searchTerm),
                    searchUpdated(''),
                    console.log(searchTerm)

                    )
                }
            >
                 <View>
                                <User user={item} key={item.id} />
                            </View>
              </TouchableOpacity>

            )
          })}
        </ScrollView>
                </View>
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#CECED2",
  //   padding: 8,
  // },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
  
    borderColor:"grey",
    alignItems: "center",
    justifyContent: "center"
  },
  inputLeftIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  inputStyle: {
    height: 40,
    marginLeft:15,
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 16,
    color: "black",
    
    flex: 1
  },
    title: {
        fontSize: 13,
        color: 'white',
      
        paddingHorizontal:151,
        paddingVertical:3,
        alignSelf:'center',
        backgroundColor:'#848c9c'
    }, container: {
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
      },
      horizontal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
      },
      searchInput:{
        marginTop:5,
        borderRadius:6,
        padding: 10,
        color:'black',
       
      },
      cupertinoSearchBarBasic2: {
        marginTop:8,
        marginBottom:5,
        width: 343,
        height: 41.5,
      //  marginTop: -610,
        alignSelf: "center"
      },
  
    });
    AssignedUsers.navigationOptions = {
        headerRight: (
            <View>
               
               <SearchInput 
          onChangeText={(term) => { searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Enter Issue #"
          placeholderTextColor='black'
          />
      
            </View>
        ),
      };
export default AssignedUsers;