import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import Issue from './Issue';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios';
import { LogBox } from 'react-native';
const { width } = Dimensions.get("window");
import g from "../global";
import styles from '../style/ComponentStyle/ReportedIssuesStyle';

const MonitorIssues = props => {

  const id = props.id;
  const [buttonIdd, setButtonId] = React.useState('');

  const KEYS_TO_FILTERS = ['id'];

  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTerm, searchUpdated] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const url = global.base_url + '/api/rest/issues' + global.uid + '/?filter_id=monitored';

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [searchText, setSearchText] = useState();


  const getUsers = async () => {
    setUsers([]);
    setFilteredDataSource([]);
    setMasterDataSource([]);
console.log(url);
    await axios.get(url, { headers: { 'Authorization': global.Authorization_Key } })
      .then((response) => {
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

      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  }


  const searchFilteredData = searchText
    ? filteredDataSource.filter((x) =>
      x.id.toString().includes(searchText.toString()),

    )
    : filteredDataSource;

  const searchFilterFunction = (text) => {

    if (text) {

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
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };



  useEffect(() => {
    const uid = global.uid;
    console.log(uid);
    console.log(id);
    setUsers([]);
    setFilteredDataSource([]);
    setMasterDataSource([]);


    setButtonId(global.buttonId);

    setLoading(true);

    getUsers();
    LogBox.ignoreAllLogs();
  }, [global.buttonId, buttonIdd]);
  const filteredDaaSource = searchTerm == '' ? filteredDataSource : filteredDataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
  return (

    <View style={{ padding: 2, color: 'black' }}>
      {isLoading ? <View style={[styles.container, styles.horizontal]}>


        <ActivityIndicator size="large" color="grey" />
      </View> :
        (
          <>

            <View  >
              <Text style={styles.title}>{'Monitored by me'}</Text>


              <View style={styles.cupertinoSearchBarBasic2}>
                <View style={styles.inputBox}>
                  {/* <Icon name="magnify" style={styles.inputLeftIcon}></Icon> */}
                  <TextInput maxLength={6} placeholder={'Ticket Filter'} placeholderTextColor={'black'}
                    style={styles.inputStyle} keyboardType={'phone-pad'}
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


MonitorIssues.navigationOptions = {
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
export default MonitorIssues;