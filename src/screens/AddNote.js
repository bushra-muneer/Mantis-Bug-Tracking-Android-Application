import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput, Keyboard ,
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

const AddNote = props => {
    const id=props.route.params.id; 
  const [loading, setLoading] = useState(true);

  const [title_text, handleTitle] = useState('');
  const [desc_text, handleDesc] = useState('');


const [filePath, setFilePath] = useState({});

const [filePathUri, setFilePathUri] = useState(null);
const [multipleFile, setMultipleFile] = useState([]);


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

  

    const clearAll = () => {
        alert(
            "Note Added"
        );
        const timeout = setTimeout(() => {
         
            handleDesc("Description");
            setFilePathUri(null);
           
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


  useEffect(() => {
    LogBox.ignoreAllLogs();
    const timeout = setTimeout(() => {
      setLoading(false);
      console.log(loading);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loading]);



  return (
<>
    {/* <SafeAreaView style={styles.container}> */}
         <ScrollView keyboardShouldPersistTaps="handled"> 
      <View style={styles.container}>
        <View style={{width: '100%', marginTop: 20,marginLeft:20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 17
        }}>
              Issue  : {id}
            </Text>  
         
          </View>
        </View>


 {/* Description */}
        <View style={{width: '100%', marginTop: 20,marginLeft:20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <Text style={{color: 'black', marginLeft: 11, fontSize: 17, marginTop: 8}}>
              Note :{''}
            </Text>
            <TextInput style = {styles.desinput}
               underlineColorAndroid = "transparent"
              
               color="black"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={desc_text}
               multiline
               onChangeText = {handleDesc}/>

          </View>
        </View>



        <View style={styles.mainContainer_row}>
        <View style={styles.container_row}>
          <Text  style={{color:'black',
                marginLeft: 32,
                marginTop: 10,
                fontSize: 16,
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
           <View style={{width: '100%', marginTop: 1,marginLeft:32}} key={key}>
         
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
{/* 
           <View style={{width: '100%', marginTop: 1,marginLeft:10}} > */}
          {/* <TouchableOpacity style={{paddingLeft:100}} onPress={() => {deleteImage();}}>
          <Text  style={{textAlign: 'center',color:'white'}}>✖</Text>

                    </TouchableOpacity> 
           */}
            {/* <Image
          source={{uri: filePathUri ?? null}}
          style={styles.imageStyle_f}
        /> */}
    {filePathUri ?
    <View>
    <Text  style={{color: 'black',paddingLeft:10 ,marginLeft:22}}>Image File Attached 
    <TouchableOpacity style={{paddingLeft:8,}} onPress={() => {deleteImage();}}>
          <Text  style={{textAlign: 'center',color:'red',paddingTop:5}}> ✖</Text>

                    </TouchableOpacity>  </Text> 
</View>
                   :<Text> </Text>
                    }
      
        
         </View>
         </ScrollView>

 

     {/* </ScrollView> */}
     {/* </SafeAreaView> */}
       <View>
       <Button style={{marginTop:20}} title="Add Note" onPress={clearAll} />
  
     </View>
   </>
   );
 };

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: 'white',
  padding:4,
    color: 'black',
  },
  input: {
    margin: 15,
    height: 48,
   width: 207,
    borderColor: '#ccc',
    borderWidth: 1
 },
 desinput: {
   
   marginHorizontal: 14,
  height: 284,
 width: 237,
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
