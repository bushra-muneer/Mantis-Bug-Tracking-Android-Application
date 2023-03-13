import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import Issue from './Issue';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios';
import { LogBox } from 'react-native';
import g from '../global';
import styles from '../style/ComponentStyle/AssignedUsersStyle';

const AssignedIssues = props => {

  const id = props.id;
  const [buttonIdd, setButtonId] = React.useState('');

  const KEYS_TO_FILTERS = ['id'];

  const [isLoading, setLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTerm, searchUpdated] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [uri, setUri] = useState('');

  const url = global.base_url + '/api/rest/issues' + global.uid + '/?filter_id=assigned';

  const getIssues = async () => {

    await axios.get(url, { headers: { 'Authorization': global.Authorization_Key } })
      .then((response) => {
        const allissues = response.data.issues;

        setIssues(allissues);
        setFilteredDataSource(allissues);
        setMasterDataSource(allissues);
        setTimeout(() => {
          setIssues(allissues);
          setFilteredDataSource(allissues);
          setMasterDataSource(allissues);

        }, 10000)

      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    const uid = global.uid;
   
    setIssues([]);
    setFilteredDataSource([]);
    setMasterDataSource([]);
    setButtonId(global.buttonId);
    setLoading(true);
    getIssues();
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
              <Text style={styles.title}>{'Assigned'}</Text>

              <View style={styles.cupertinoSearchBarBasic2}>
                <View style={styles.inputBox}>
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

                        searchUpdated('')
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

AssignedIssues.navigationOptions = {
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
export default AssignedIssues;