import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, Button, TouchableOpacity, Platform, PermissionsAndroid, Dimensions, } from 'react-native';
const { height } = Dimensions.get("window");
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { LogBox } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const ReportIssue = props => {
  const [loading, setLoading] = useState(true);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [updatedModuleData, setUpdatedModuleData] = useState([]);
  const [serverData_module, setServerData_module] = useState([]);
  const [serverData_clients, setServerData_clients] = useState([]);
  const [serverData_tv, setServerData_tv] = useState([]);
  const [serverData_owners, setServerData_owners] = useState([]);
  const [serverData_QAowners, setServerData_QAowners] = useState([]);
  const [updatedTVData, setUpdatedTVData] = useState([]);

  const [updatedOwnersData, setUpdatedOwnersData] = useState([]);
  const [updatedQA_OwnersData, setUpdatedQA_OwnersData] = useState([]);

  const [updatedClientsData, setUpdatedClientsData] = useState([]);
  const [module_text, setModuleText] = useState('');
  const [tv_text, setTVText] = useState('');
  const [clients_text, setClientsText] = useState('');

  const [owners_text, setOwnersText] = useState('');
  const [qaOwner_text, setQA_OwnerText] = useState('');

  const [title_text, handleTitle] = useState('');
  const [desc_text, handleDesc] = useState('');


  const [filePath, setFilePath] = useState({});

  const [filePathUri, setFilePathUri] = useState(null);
  const [multipleFile, setMultipleFile] = useState([]);


  function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }


  const deleteImage = async () => {
    const del = [...filePath];
    del.pop();
    setFilePath(del);
    console.log(filePath);
    setFilePathUri(null);

  };


  const deleteFile = async () => {
    const del = [...multipleFile];
    del.pop();
    setMultipleFile(del);
    console.log(multipleFile);
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.docx],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const baseurl = 'http://mantis.sibisoft.com';

  //const baseurl='http://192.168.8.102:1234/mantis';

  const module_url = baseurl + '/api/rest/users/getProdModule';
  const targetVerion_url =
    baseurl + '/api/rest/users/getAllTargetVersion';

  const clients_url =
    baseurl + '/api/rest/users/getAllClients';


  // const qaOwners_url =
  // baseurl+'/api/rest/users/getAllQAOwners';


  const Owners_url = baseurl + '/api/rest/users/getAll';



  const clearAll = () => {
    alert(
      "Issue ReportedScreen"
    );
    const timeout = setTimeout(() => {
      handleTitle("Title");
      handleDesc("Description");
      setFilePathUri(null);
      setModuleText("");
      setTVText("");
      setClientsText("");
      setQA_OwnerText("");
      setOwnersText("");
      setMultipleFile([]);
    }, 1000);

  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        var json = response.assets;
        // console.log('Response = ',json);
        setFilePath(json);

        // console.log(json);

        // console.log(json[0].uri)
        setFilePathUri(json[0].uri);
        //  console.log(Object.values(json[0]));

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }


      });
    }
  };



  const getmodules = async () => {
    await axios
      .get(module_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {
        const all_modules = response.data;
        //   console.log('---------------Module Data-------------------');

        setServerData_module(all_modules);

        serverData_module.sort(function (a, b) {
          return compareStrings(a.name, b.name);
        });
        // console.log(serverData_module);
        setUpdatedModuleData(serverData_module);

        // console.log(serverData_module);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };


  const getTargetVersion = async () => {
    await axios
      .get(targetVerion_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {

        const all_tv = response.data;
        console.log('---------------Target Version Data-------------------');
        //  json = JSON.parse({}, all_tv);

        let uniqueChars = [...new Set(all_tv)];


        var version_array = new Array();

        for (var c in uniqueChars) {
          var jsonObj = new Object();
          jsonObj.id = c
          jsonObj.name = uniqueChars[c];
          version_array.push(jsonObj);
        }
        console.log(version_array);
        setServerData_tv(version_array);

        serverData_tv.sort(function (a, b) {
          return compareStrings(a.name, b.name);
        });

        setUpdatedTVData(serverData_tv);


      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };
  const getClients = async () => {
    await axios
      .get(clients_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {

        const all_clients = response.data;
        //    console.log('---------------Clients Data-------------------');

        setServerData_clients(all_clients);

        serverData_clients.sort(function (a, b) {
          return compareStrings(a.name, b.name);
        });
        //  console.log(serverData_clients);
        setUpdatedClientsData(serverData_clients);

        // console.log(serverData_clients);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };

  const getQAOwners = async () => {
    await axios
      .get(Owners_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {
        const all_qaOwners = response.data;
        if (all_qaOwners != null) {
          var formattedUserDetails = all_qaOwners.map(({ id, realname: name, email, user_department, enabled, access_level }) => ({
            id,
            name,
            email,
            user_department,
            enabled,
            access_level
          }));
          var data_filter = formattedUserDetails.filter(element => element.user_department == "QA")
          console.log(data_filter);
          setServerData_QAowners(data_filter);
          serverData_QAowners.sort(function (a, b) {
            return compareStrings(a.name, b.name);
          });

          setUpdatedQA_OwnersData(serverData_QAowners);
          setLoading(false);

        }
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };


  const getOwners = async () => {
    await axios
      .get(Owners_url, {
        headers: { Authorization: global.Authorization_Key },
      })
      .then(response => {
        const all_Owners = response.data;
        if (all_Owners != null) {

          console.log('---------------Owners-------------------');

          var formattedUserDetails = all_Owners.map(({ id, username, realname: name, email, user_department, enabled, access_level }) => ({
            id,
            username,
            name,
            email,
            user_department,
            enabled,
            access_level
          }));
          // console.log(formattedUserDetails);

          setServerData_owners(formattedUserDetails);


          serverData_owners.sort(function (a, b) {
            return compareStrings(a.name, b.name);
          });


          setUpdatedOwnersData(serverData_owners);
          setLoading(false);
          //  console.log(serverData_owners);
        }
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    LogBox.ignoreAllLogs();
    const timeout = setTimeout(() => {
      setLoading(false);
      console.log(loading);
    }, 1000);
    getmodules();
    getTargetVersion();
    getClients();
    getOwners();
    getQAOwners();

    return () => clearTimeout(timeout);
  }, [loading]);

  const getModuleById_func = id => {
    var ydataa = serverData_module.find(item => item.id === id);
    console.log(ydataa);
    setModuleText(ydataa.name);
    console.log(ydataa.name);
  };

  const getClientsById_func = id => {
    var ydataa = serverData_clients.find(item => item.id === id);
    console.log(ydataa);
    setClientsText(ydataa.name);
    console.log(ydataa.name);
  };
  const getTargetVersionById_func = id => {
    var ydataa = serverData_tv.find(item => item.id === id);
    console.log(ydataa);
    setTVText(ydataa.name);
    console.log(ydataa.name);
  };

  const getOwnersById_func = id => {
    var ydataa = serverData_owners.find(item => item.id === id);
    console.log(ydataa);
    setOwnersText(ydataa.name);
    console.log(ydataa.name);
  };


  const getQAOwnersById_func = t => {
    setQA_OwnerText(t);
    console.log(t);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ width: '100%', marginTop: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{
              color: 'black', marginLeft: 10, fontSize: 15
            }}>
              Project : {'            '}
            </Text>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
              {'    '}Production
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={{ width: '100%', marginTop: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{ color: 'black', marginLeft: 10, fontSize: 14, marginTop: 20 }}>
              Title :{'               '}
            </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Title"
              color="black"
              placeholderTextColor="black"

              autoCapitalize="none"
              value={title_text}
              onChangeText={handleTitle} />

          </View>
        </View>

        {/* Description */}
        <View style={{ width: '100%', marginTop: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{ color: 'black', marginLeft: 11, fontSize: 14, marginTop: 15 }}>
              Description :{'   '}
            </Text>
            <TextInput style={styles.desinput}
              underlineColorAndroid="transparent"
              placeholder="Description"
              color="black"
              placeholderTextColor="black"
              autoCapitalize="none"
              value={desc_text}
              multiline
              onChangeText={handleDesc} />

          </View>
        </View>

        {/* Module */}
        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: 15,
                fontSize: 14,
              }}>
              Module :{'             '}
            </Text>

            <SearchableDropdown
              onTextChange={module_text => {
                Keyboard.dismiss()
                console.log(module_text)
              }}
              // Listner on the searchable input

              onItemSelect={item => {
                getModuleById_func(item.id);
              }}
              // setSort={(item, searchedText)=> item.name.toLowerCase().startsWith(searchedText.toLowerCase())}
              // Called after the selection
              containerStyle={{ padding: 5, color: 'black', width: 216, }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
                borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
                borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '60%',
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              items={updatedModuleData}
              listProps={{ nestedScrollEnabled: true }}

              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={module_text == "" ? 'Select' : module_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
            // To remove the underline from the android input
            />
          </View>
        </View>

        {/* Current Version */}

        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 8,
                marginTop: 15,
                fontSize: 13.5,
              }}>
              Current Version :{''}
            </Text>

            <SearchableDropdown
              onTextChange={tv_text => {
                Keyboard.dismiss()
                console.log(tv_text)
              }}
              // Listner on the searchable input

              onItemSelect={item => {
                getTargetVersionById_func(item.id);
              }}
              // setSort={(item, searchedText)=> item.name.toLowerCase().startsWith(searchedText.toLowerCase())}
              // Called after the selection
              containerStyle={{ padding: 5, color: 'black', width: 216, }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
                borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
                borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '60%',
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              items={updatedTVData}
              listProps={{ nestedScrollEnabled: true }}

              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={tv_text == "" ? "Select" : tv_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
            // To remove the underline from the android input
            />

          </View>
        </View>

        {/* Clients */}
        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: 15,
                fontSize: 14,
              }}>
              Clients :{'              '}
            </Text>
            <SearchableDropdown
              onTextChange={clients_text => {
                Keyboard.dismiss()
                console.log(clients_text)
              }}
              // Listner on the searchable input

              onItemSelect={item => {
                getClientsById_func(item.id);
              }}
              // setSort={(item, searchedText)=> item.name.toLowerCase().startsWith(searchedText.toLowerCase())}
              // Called after the selection
              containerStyle={{ padding: 5, color: 'black', width: 216, }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
                borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
                borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '60%',
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              items={updatedClientsData}
              listProps={{ nestedScrollEnabled: true }}

              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={clients_text == "" ? 'Select' : clients_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
            // To remove the underline from the android input
            />
          </View>
        </View>

        {/* Owners */}
        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: 15,
                fontSize: 14,
              }}>
              Owners :{'             '}
            </Text>

            <SearchableDropdown
              onTextChange={owners_text => console.log(owners_text)}
              // Listner on the searchable input
              onItemSelect={item => {
                getOwnersById_func(item.id);
              }}
              // Called after the selection
              containerStyle={{ padding: 5, color: 'black', width: 216 }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
                borderRadius: 10,
                fontSize: 12,
                backgroundColor: 'white',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
                borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '60%',
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              items={updatedOwnersData}
              //   listProps= {{nestedScrollEnabled: true }}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={owners_text == "" ? 'Select' : owners_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
            // To remove the underline from the android input
            />
          </View>
        </View>


        {/* QA OWNERS */}
        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: 15,
                fontSize: 14,
              }}>
              QA Owners :{'       '}
            </Text>

            <SearchableDropdown
              onTextChange={qaOwners_text => console.log(qaOwners_text)}
              // Listner on the searchable input
              onItemSelect={item => {
                getQAOwnersById_func(item);
              }}

              // Called after the selection
              containerStyle={{ padding: 5, color: 'black', width: 216 }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 7,
                borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
              }}
              listProps={{ nestedScrollEnabled: true }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
                borderColor: '#ccc',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '53%',
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              items={updatedQA_OwnersData}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={qaOwner_text == "" ? 'Select' : qaOwner_text.name}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
            // To remove the underline from the android input
            />

          </View>
        </View>




        <View style={styles.mainContainer_row}>
          <View style={styles.container_row}>
            <Text style={{
              color: 'black',
              marginLeft: 10,
              marginTop: 10,
              fontSize: 14,
            }}>Upload Files: </Text>
            <TouchableOpacity style={styles.paragraph_row}
              activeOpacity={0.5}

              onPress={selectMultipleFile}>
              <Text style={{
                color: 'black',
                marginLeft: 20,
                marginTop: 10,
                fontSize: 18,
              }}>
                📑
              </Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.paragraphRight_row}
              activeOpacity={0.5}

              onPress={() => captureImage('photo')}>
              <Text style={{
                padding: 5,
                color: 'black',
                textAlign: 'center',
                fontSize: 20,
              }}>
                📷
              </Text>
            </TouchableOpacity>
      
          </View>
          {multipleFile.map((item, key) => (
            // <View key={key}>
            <View style={{ width: '100%', marginTop: 1, marginLeft: 10, backgroundColor: '#c8cad0', }} key={key}>

              <Text style={styles.textStyle}>
                File: {item.name ? item.name : ''}
                <TouchableOpacity style={{ paddingLeft: 14 }} onPress={() => { deleteFile(); }}>
                  <Text style={{ textAlign: 'center', color: 'red' }}>✖</Text>
                </TouchableOpacity>
              </Text>

            </View>
          ))}
     
        </View>

        {filePathUri ?
          <View style={{ backgroundColor: "#c8cad0" }}>
            <Text style={{ color: 'black', paddingLeft: 10 }}>Image File Attached
              <TouchableOpacity style={{ paddingLeft: 8, }} onPress={() => { deleteImage(); }}>
                <Text style={{ textAlign: 'center', color: 'red', paddingTop: 5 }}> ✖</Text>

              </TouchableOpacity>  </Text>
          </View>
          : <Text> </Text>
        }


      </View>
      {/* </ScrollView> */}
      <View>
        <Button color={'#041c34'} title="Report" onPress={clearAll} />

      </View>

    </View>
  );
};

export default ReportIssue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow:1,
    margin: 4,
    backgroundColor: '#c8cad0',


    color: 'black',
  },
  input: {
    margin: 15,
    height: 48,
    width: 207,
    backgroundColor: 'white',
    // borderColor: '#ccc',
    //borderWidth: 1,
    borderRadius: 12,
  },
  desinput: {
    backgroundColor: 'white',
    marginHorizontal: 14,
    height: 94,
    width: 207,
    borderRadius: 10,


  },
  titleText: {
    padding: 8,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  headingText: {
    padding: 8,
    color: 'black',
  },
  containerr: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  textStyle: {

    fontSize: 14,
    marginTop: 3,
    backgroundColor: '#c8cad0',
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  container_f: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText_f: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#c8cad0',
  },
  textStyle_f: {
    padding: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginRight: 48,
  },
  buttonStyle_f: {
    alignItems: 'center',

    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle_f: {
    width: 200,
    height: 200,

  },
  mainContainer_row: {
    alignSelf: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#c8cad0',
  },
  container_row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#c8cad0',
  },
  paragraph_row: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraphRight_row: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  }
});
