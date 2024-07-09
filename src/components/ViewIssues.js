import React, { useEffect, useState } from 'react';
import { ActivityIndicator,View, Text, TouchableOpacity,StyleSheet,TextInput, Dimensions,ScrollView } from 'react-native';
import Issue from './Issue';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios  from 'axios';

import { LogBox } from 'react-native';

const { width } = Dimensions.get("window");

const ViewIssues = props => {

  const id = props.id;
  const [buttonIdd, setButtonId] = React.useState('');

    const KEYS_TO_FILTERS = ['id'];
    const [filt, setFilt] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]); 
    const [search, setSearch] = useState('');
    const [searchTerm, searchUpdated] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
   
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [uri, setUri] = useState('');

  
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    const [searchText, setSearchText] = useState();


    const getFiltersBasedIssue= async ()=>{
      const url= global.base_url+"/api/rest/issues?filter_id="+filt;
      console.log(url);
         
        await axios.get(url,{ headers: {'Authorization': global.Authorization_Key} })
        .then((response)=>{
        const allissues = response.data.issues;
        setUsers([]);
        setFilteredDataSource([]);
        setMasterDataSource([]);

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
    
    const getUsers= async (url)=>{

  console.log(url);
     
    await axios.get(url,{ headers: {'Authorization': global.Authorization_Key} })
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


     
    useEffect(() => {
      const uid =  global.uid;
      const fil=global.filt;
      setFilt(fil);
      console.log("*******choosen filter*****");
      console.log(filt);
      console.log("************************");
      console.log(uid);
      console.log(id);
      setUsers([]); 
      setFilteredDataSource([]);
      setMasterDataSource([]);
    //  alert(global.buttonId);
    
     setButtonId(global.buttonId);
    
        LogBox.ignoreAllLogs();
    }, [global.buttonId,buttonIdd]);
    
    useEffect(() => {
      setUsers([]); 
        setFilteredDataSource([]);
        setMasterDataSource([]);  
   
      if (filt!=undefined){ 
       
        const url=( "api/rest/issues?filter_id="+filt);
        setLoading(true);
      getFiltersBasedIssue();
        
      }else{
       
        const url=( "api/rest/issues");
        setLoading(true);
        getUsers(url);
      }
    }, [filt]);
    const filteredDaaSource = (searchTerm =='' ? filteredDataSource :filteredDataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))) ?? []
    return(
        
        <View style={{ padding: 2,color:'black' }}>
            {isLoading ?  <View style={[styles.container, styles.horizontal]}>
  
   
    <ActivityIndicator size="large" color="grey" />
  </View> :
            (
                <>
                
                <View  >
                     <Text style={styles.title}>{'Issues'}</Text>
              
           <View style={styles.cupertinoSearchBarBasic2}>
      <View style={styles.inputBox}>
        {/* <Icon name="magnify" style={styles.inputLeftIcon}></Icon> */}
        <TextInput  maxLength={6} placeholder={'Ticket Filter' } placeholderTextColor={'black'}  
      style={styles.inputStyle}  keyboardType={'phone-pad'}
      value={searchTerm ?? ''}
      onChangeText={(searchTerm) => { searchUpdated(searchTerm) }} 
            
 ></TextInput>
        
      </View>
    </View>
                 <ScrollView>
          {filteredDaaSource.map(item => {
            return (
                <TouchableOpacity 
                onPress={() => (
                    props.navigation.navigate('IssueDetailScreen', {
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
                                <Issue user={item} key={item.id} />
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
      
        paddingHorizontal:157,
        paddingVertical:3,
        alignSelf:'center',
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
    ViewIssues.navigationOptions = {
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
export default ViewIssues;
