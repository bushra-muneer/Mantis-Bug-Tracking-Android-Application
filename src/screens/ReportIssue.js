import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,Fragment,Image,TouchableOpacity, Platform,
 PermissionsAndroid,
  ScrollView,
} from 'react-native';


import {
  launchCamera
} from 'react-native-image-picker';


import DocumentPicker from 'react-native-document-picker';

import axios from 'axios';
import { LogBox  } from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';

const ReportIssue = props => {
  const [loading, setLoading] = useState(true);
  const [updatedModuleData, setUpdatedModuleData] = useState([]);
  const [serverData_module, setServerData_module] = useState([]);

  const [serverData_owners, setServerData_owners] = useState([]);

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
      type: [DocumentPicker.types.images,DocumentPicker.types.pdf,DocumentPicker.types.docx],
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

  const module_url = 'http://192.168.6.136/mantis/api/rest/users/getProdModule';
  const targetVerion_url =
    'http://192.168.6.136/mantis/api/rest/users/getAllTargetVersion';

  const clients_url =
    'http://192.168.6.136/mantis/api/rest/users/getAllClients';

 
  const qaOwners_url =
    'http://192.168.6.136/mantis/api/rest/users/getAllQAOwners';


    const Owners_url= 'http://192.168.6.136/mantis/api/rest/users/getAll';


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
      var json=response.assets;
      // console.log('Response = ',json);
      setFilePath(json);

      console.log(json);
        
      console.log(json[0].uri)
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
        headers: {Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'},
      })
      .then(response => {
        const all_modules = response.data;
        console.log('---------------Module Data-------------------');

        setServerData_module(all_modules);

        serverData_module.sort(function (a, b) {
          return compareStrings(a.name, b.name);
        });
        console.log(serverData_module);
        setUpdatedModuleData(serverData_module);

        console.log(serverData_module);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };

  const getTargetVersion = async () => {
    await axios
      .get(targetVerion_url, {
        headers: {Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'},
      })
      .then(response => {
        const all_targetVersion = response.data;

        //   setServerData_targetVersion(all_targetVersion);

        var finalJSON = all_targetVersion[0]['possible_values'];
        // console.log(finalJSON);
        const pieces = finalJSON.split('|');
        //console.log(pieces);
        const items = pieces.filter(el => {
          return el != null && el != '';
        });
        var tvarray = new Array();  

        for(var c in items) {
          var jsonObj = new Object();
          jsonObj.name = items[c];
          tvarray.push(jsonObj);
        }

     
        setUpdatedTVData(tvarray);

        console.log('---------------Target Version-------------------');
        console.log(updatedTVData);
     
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };

  const getClients = async () => {
    await axios
      .get(clients_url, {
        headers: {Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'},
      })
      .then(response => {
        const all_clients = response.data;

        //  setServerData_clients(all_clients);

        var finalJSON = all_clients[0]['possible_values'];
        // console.log(finalJSON);
        const pieces = finalJSON.split('|');
        //console.log(pieces);
        const items = pieces.filter(el => {
          return el != null && el != '';
        });
        var clientsarray = new Array();  

        for(var c in items) {
          var jsonObj = new Object();
          jsonObj.name = items[c];
          clientsarray.push(jsonObj);
        }

        setUpdatedClientsData(clientsarray);

        console.log('---------------Clients-------------------');
        console.log(updatedClientsData);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };



  const getQAOwners = async () => {
    await axios
      .get(qaOwners_url, {
        headers: {Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'},
      })
      .then(response => {
        const all_qaOwners = response.data;

        //  setServerData_clients(all_clients);

        var finalJSON = all_qaOwners[0]['possible_values'];
        // console.log(finalJSON);
        const pieces = finalJSON.split('|');
        //console.log(pieces);
        const items = pieces.filter(el => {
          return el != null && el != '';
        });
        var qaOwnersArray = new Array();  

        for(var c in items) {
          var jsonObj = new Object();
          jsonObj.name = items[c];
          qaOwnersArray.push(jsonObj);
        }

        setUpdatedQA_OwnersData(qaOwnersArray);

        console.log('---------------QA Owners-------------------');
        console.log(updatedQA_OwnersData);
      })
      .catch(error => console.error(`Error: $(error)`))
      .finally(() => setLoading(false));
  };
  


  const getOwners = async () => {
    await axios
      .get(Owners_url, {
        headers: {Authorization: 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'},
      })
      .then(response => {
        const all_Owners = response.data;
        if (all_Owners!=null){
   
        console.log('---------------Owners-------------------');
    
        var formattedUserDetails = all_Owners.map(({ id, username,realname:name,email,user_department,enabled,access_level }) => ({
          id,
          username,
          name,
          email,
          user_department,
          enabled,
          access_level
        }));
        console.log(formattedUserDetails);

        setServerData_owners(formattedUserDetails);
        
    
        serverData_owners.sort(function (a, b) {
          return compareStrings(a.name, b.name);
        });
   

        setUpdatedOwnersData(serverData_owners);

        console.log(serverData_owners);
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

  const getOwnersById_func = id => {
    var ydataa = serverData_owners.find(item => item.id === id);
    console.log(ydataa);
    setOwnersText(ydataa.name);
    console.log(ydataa.name);
  };


 
  const getTVById_func = t => {
    setTVText(t);
    console.log(t);
  };

  const getClientsById_func = t => {
    setClientsText(t);
    console.log(t);
  };


  const getQAOwnersById_func = t => {
    setQA_OwnerText(t);
    console.log(t);
  };

  return (

    <SafeAreaView style={styles.container}>
         <ScrollView keyboardShouldPersistTaps="always"> 
      <View style={styles.container}>
        <View style={{width: '100%', marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 14
        }}>
              Project :{'               '}
            </Text>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            {' '}Production
            </Text>
          </View>
        </View>

 {/* Title */}
        <View style={{width: '100%', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 14, marginTop: 30}}>
              Title :{'                 '}
            </Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Title"
               color="black"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {handleTitle}/>

          </View>
        </View>

 {/* Description */}
        <View style={{width: '100%', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 14, marginTop: 20}}>
              Description :{'    '}
            </Text>
            <TextInput style = {styles.desinput}
               underlineColorAndroid = "transparent"
               placeholder = "Description"
               color="black"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               multiline
               onChangeText = {handleDesc}/>

          </View>
        </View>

        {/* Module */}
        <View style={{width: '100%', marginTop: 10}}>
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
                marginTop: 20,
                fontSize: 14,
              }}>
              Module :{'             '}
            </Text>
            
            <SearchableDropdown 
              onTextChange={module_text => console.log(module_text)}
              // Listner on the searchable input
              onItemSelect={item => {
                getModuleById_func(item.id);
              }}
              // setSort={(item, searchedText)=> item.name.toLowerCase().startsWith(searchedText.toLowerCase())}
              // Called after the selection
              containerStyle={{padding: 5, color: 'black', width: 216,}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
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
              }}
              items={updatedModuleData}
              listProps= {{nestedScrollEnabled: true }}
              
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={module_text == '' ? 'Select' : module_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
            />
          </View>
        </View>

        {/* Current Version */}

        <View style={{width: '100%', marginTop: 10}}>
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
                marginTop: 20,
                fontSize: 13.5,
              }}>
              Current Version :{''}
            </Text>

            <SearchableDropdown
              onTextChange={tv_text => console.log(tv_text)}
              // Listner on the searchable input
              onItemSelect={item => {
                getTVById_func(item);
              }}
              // Called after the selection
              containerStyle={{padding: 5, color: 'black', width: 215
            }}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
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
              }}
              items={updatedTVData}
              listProps= {{nestedScrollEnabled: true }}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={tv_text.name == null ? 'Select' : tv_text.name}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
            />
          </View>
        </View>

        {/* Clients */}
        <View style={{width: '100%', marginTop: 10}}>
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
                marginTop: 20,
                fontSize: 14,
              }}>
              Clients :{'              '}
            </Text>
            <SearchableDropdown
              onTextChange={clients_text => console.log(clients_text)}
              // Listner on the searchable input
              onItemSelect={item => {
                getClientsById_func(item);
              }}
              // Called after the selection
              containerStyle={{padding: 5, color: 'black', width: 216}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
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
              }}
              items={updatedClientsData}
              listProps= {{nestedScrollEnabled: true }}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={clients_text.name == null ? 'Select' : clients_text.name}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
            />
          </View>
        </View>

        {/* Owners */}
        <View style={{width: '100%', marginTop: 10}}>
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
                marginTop: 20,
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
              containerStyle={{padding: 5, color: 'black', width: 216}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 11,
                borderWidth: 1,
                borderColor: '#ccc',
                fontSize:12,
                backgroundColor: '#FAF7F6',
                color: 'black',
              }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
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
              }}
              items={updatedOwnersData}
              listProps= {{nestedScrollEnabled: true }}
              // Mapping of item array
              defaultIndex={1}
              // Default selected item index
              placeholder={owners_text == null ? 'Select' : owners_text}
              // place holder for the search input
              resPtValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
            />
          </View>
        </View>


        {/* QA OWNERS */}
        <View style={{width: '100%', marginTop: 10}}>
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
                marginTop: 20,
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
              containerStyle={{padding: 5, color: 'black', width: 216}}
              // Suggestion container style
              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                color: 'black',
              }}
              listProps= {{nestedScrollEnabled: true }}
              placeholderTextColor={'black'}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                color: 'black',
              }}
              itemTextStyle={{
                // Text style of a single dropdown item

                color: 'black',
              
              }}
          //    setSort={(item, searchedText)=> item.name.toLowerCase().startsWith(searchedText.toLowerCase())}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '60%',
                color: 'black',
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
        </View>




        <View style={styles.mainContainer_row}>
        <View style={styles.container_row}>
          <Text  style={{color:'black',
                marginLeft: 10,
                marginTop: 10,
                fontSize: 14,
                }}>Upload Files: </Text>
          <TouchableOpacity style={styles.paragraph_row}
      activeOpacity={0.5}
     
      onPress={selectMultipleFile}>
      <Text style={{color:'black',
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
          <Text style={{padding: 5,
  color: 'black',
  textAlign: 'center',
  fontSize: 20,
  }}>
            📷
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.paragraphRight_row}
          activeOpacity={0.5}
          onPress={() => captureImage('video')}>
          <Text style={{ padding: 5,
  color: 'black',
  textAlign: 'center',
  fontSize: 20,
  paddingRight:74,}}>
            🎦
          </Text>
        </TouchableOpacity> */}
       
        </View>
        {multipleFile.map((item, key) => (
        // <View key={key}>
           <View style={{width: '100%', marginTop: 1,marginLeft:10}} key={key}>
         
         <Text style={styles.textStyle}>
            File: {item.name ? item.name : ''} 
            <TouchableOpacity style={{paddingLeft:14}} onPress={() => {deleteFile();}}>
                    <Text style={{textAlign: 'center',color:'red'}}>✖</Text>
                    </TouchableOpacity>
           </Text>
        
         </View>
      ))}
        {/* <Text>Very long text omg! This will surely be long.</Text> */}
      </View>

           <View style={{width: '100%', marginTop: 1,marginLeft:10}} >
          <TouchableOpacity style={{paddingLeft:100}} onPress={() => {deleteImage();}}>
          <Text  style={{textAlign: 'center',color:'white'}}>✖</Text>

                    </TouchableOpacity> 
          
            <Image
          source={{uri: filePathUri ?? null}}
          style={styles.imageStyle_f}
        />
       
      
        
         </View>

 

     </View>
     </ScrollView>
     </SafeAreaView>
     
   
   );
 };

export default ReportIssue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: 'white',
    padding: 10,
    color: 'black',
  },
  input: {
    margin: 15,
    height: 48,
   width: 204,
    borderColor: '#ccc',
    borderWidth: 1
 },
 desinput: {
   
   marginHorizontal: 15,
  height: 74,
 width: 204,
  borderColor: '#ccc',
  borderWidth: 1,

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
    marginBottom:12    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
   textStyle: {
    backgroundColor: '#fff',
    fontSize: 14,
    marginTop: 3,
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
},
textStyle_f: {
  padding: 5,
  color: 'black',
  textAlign: 'center',
  fontSize: 20,
  marginRight:48,
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

},
container_row: {
  justifyContent: 'space-between',
  flexDirection: 'row',
 
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
