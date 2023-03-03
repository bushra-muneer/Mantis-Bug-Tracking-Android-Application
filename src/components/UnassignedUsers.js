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

// function Users({props,route,navigation}){
 const UnassignedUsers = props => {

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

    const url='http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=unassigned';

    //const url='http://192.168.8.102:1234/mantis/api/rest/issues';
//const getIssues_url = baseurl + '/api/rest/issues/' + uid + '/' + id;

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    const [searchText, setSearchText] = useState();


    const getUsers= async ()=>{
      setUsers([]);
      setFilteredDataSource([]);
      setMasterDataSource([]);
    //   if (buttonIdd=="unassigned"){

    //     setUri('http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=unassigned')
    //   }
    //   else if (buttonIdd=="assigned"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=assigned')
        
    //   }
    //   else if (buttonIdd=="monitored"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=monitored')
      
    //   }
    //   else if (buttonIdd=="reported"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues'+global.uid+'/?filter_id=reported')
    //   }
    //   else if (buttonIdd=="View Issues"){
    //     setUri('http://mantis.sibisoft.com/api/rest/issues');
    //   }
    // //  else if (buttonIdd=="issues"){
    // //   setUri('http://mantis.sibisoft.com/api/rest/issues');
    // //  }
    // //  else {
    // //   setUri('http://mantis.sibisoft.com/api/rest/issues');
    // //  }

    //   console.log(uri);
     
    await axios.get(url,{ headers: {'Authorization': 'yV7MFirhfCf-jXncm9mGoTutD_YIIDDh'} })
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
    }, 20000)

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




    function renderHeader() {
        return (
          <View
     
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
    const filteredDaaSource = searchTerm =='' ?(filteredDataSource):filteredDataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    return(
        
        <View style={{ padding: 2,color:'black' }}>
            {isLoading ?  <View style={[styles.container, styles.horizontal]}>
  
   
    <ActivityIndicator size="large" color="grey" />
  </View> :
            (
                <>
                
                <View  >
                     <Text style={styles.title}>{ 'Unassigned'}</Text>
        
                   {/* <SearchInput 
          onChangeText={(term) => { searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Enter Issue #"
      
          /> */}
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
                 <ScrollView>
          {filteredDataSource ? filteredDaaSource.map(item => {
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
          }):<ActivityIndicator size="large" color="grey" />}
        </ScrollView>
                </View>
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
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





  cupertinoSearchBarBasic2: {
        marginTop:8,
        marginBottom:5,
        width: 343,
        height: 41.5,
      //  marginTop: -610,
        alignSelf: "center"
      },
  
    title: {
        fontSize: 13,
        color: 'white',
      
        paddingHorizontal:144,
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
      },searchInput:{
        marginTop:5,
        borderRadius:25,
        padding: 10,
        color:'black',
        borderColor: 'grey',
        borderWidth: 1
      }
  
    });
    UnassignedUsers.navigationOptions = {
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
export default UnassignedUsers;