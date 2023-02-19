import React, { useEffect, useState } from 'react';
import { ActivityIndicator,View, Text, FlatList, TouchableOpacity,StyleSheet,StatusBar,TextInput, Keyboard,Button,ScrollView } from 'react-native';
import User from './User';
import { Searchbar } from 'react-native-paper';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios  from 'axios';
import { NavigationEvents } from 'react-navigation';
import { LogBox } from 'react-native';
const Users = props => {


    const KEYS_TO_FILTERS = ['id'];

    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]); 
    const [search, setSearch] = useState('');
    const [searchTerm, searchUpdated] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    
     //const url='http://192.168.6.136:8080/mantis/api/rest/issues';

    const url='http://192.168.8.102:1234/mantis/api/rest/issues';
//const getIssues_url = baseurl + '/api/rest/issues/' + uid + '/' + id;

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    const [searchText, setSearchText] = useState();
    const getUsers= async ()=>{
    
    await axios.get(url,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=>{
    const allissues = response.data.issues;
    setTimeout(() => {
        setUsers(allissues);
        setFilteredDataSource(allissues);
        setMasterDataSource(allissues);
      
        console.log(allissues);
    }, 2500)

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

        setLoading(true);
        getUsers();
        LogBox.ignoreAllLogs();
    }, []);
    const filteredDaaSource = searchTerm =='' ? filteredDataSource :filteredDataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    return(
        
        <View style={{ padding: 2,color:'black' }}>
            {isLoading ?  <View style={[styles.container, styles.horizontal]}>
  
   
    <ActivityIndicator size="large" color="grey" />
  </View> :
            (
                <>
                
                <View >
                     <Text style={styles.title}>Assigned to Me</Text>
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
                   <SearchInput 
          onChangeText={(term) => { searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Enter Issue #"
      
          />
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
  
    title: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal:108,
        paddingVertical:3,
        backgroundColor:'#33b5e6'
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
    Users.navigationOptions = {
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
export default Users;