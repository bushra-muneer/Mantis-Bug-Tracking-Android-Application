
import { TextInput, Pressable, Alert} from 'react-native';
import {Appbar} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import XMLParser from 'react-xml-parser';
import {StyleSheet, Text, View, Button,TouchableOpacity,Image,Switch,Dimensions,Modal,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
const { width } = Dimensions.get("window");
import * as Keychain from "react-native-keychain";
import Background from './Background'
import AsyncStorage from '@react-native-async-storage/async-storage';
import{ ImagesAssets } from '../../assets/ImageAssets';

const LoginScreen = props => {
  //global.userna="";
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [url, onChangeUrl] = React.useState('');
  var id,name ;
  
  const [isLoading, setLoading] = useState(false);
  const [username, onChangeUsername] = React.useState(global.userna ?? '');
  const [password, onChangePassword] = React.useState('');
  const [user, setUser] = React.useState([]);
   const [uuid, setUuid] = React.useState('');
  const [access_level, setAccess_level] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState('');

  const [isModalVisible, setModalVisible] = useState(false);   
 const [inputValue, setInputValue] = useState("");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const search_issue = () => {
    setModalVisible(!isModalVisible);
    setInputValue("");
    
   
    props.navigation.navigate('UserScreen', {
      id: inputValue,
    })
  };

//   const logincall = async () => {
//     console.log(url);
//     console.log(username);
//     console.log(password);

//     let UAT_mantis_url =
//       //  'http://192.168.6.136:1234/mantis/api/soap/mantisconnect.php';
//       'http://192.168.8.102:1234/mantis/api/soap/mantisconnect.php';
//     let prod_mantis_url = '';

//     if (url != null && username != '' && password != '') {
//       let xmls =
//       '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'+
//                          ' xmlns:man="http://futureware.biz/mantisconnect">'+
//       '<soapenv:Header/>'+
//           '<soapenv:Body>'+
//          '<man:mc_login soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
//      '<username xsi:type="xsd:string">'+ username+'</username>'+
//     '<password xsi:type="xsd:string">'+password+'</password>'+
// '    </man:mc_login>'+
//         '  </soapenv:Body>'+
//       '  </soapenv:Envelope>';

          
//       axios
//         .post(UAT_mantis_url, xmls, {headers: {'Content-Type': 'text/xml'}})
//         .then(res => {
//           let p = [];
//           let p1 = [];
//           var xml = new XMLParser().parseFromString(res.data);
//           let news = xml.children[0].children[0].children;
//           let pnews = xml.children[0].children[0].children[0].children;

//           for (let i in news) {
//             if (
//               news[i].children !== null &&
//               news[i].children !== [] &&
//               news[i].children.length > 0
//             ) {
//               p.push(news[i].children);
//               p1.push(pnews[i].children);
//             }
//           }
      

//           for (var key in p1) {
//             for (var keyi in p1) {
//               res = p1[keyi];
//             }
//           }
//           for (var key in res) {
//             console.log(res[key]['name'] + ' ' + res[key]['value']);
//           //   if (res[key]['name']=="id"){
//           //     id=res[key]['value'];
//           //     console.log("id is here "+id);
//           //   }
//           //   if (res[key]['name']=="name"){
//           //     name=res[key]['value'];
//           //     console.log("name is here " + name);
//           //   }
//           // }
//           }

//           console.log('success');
//           alert('success');
//           props.navigation.navigate('HomeScreen')
//           onChangeUsername('')
//           onChangePassword('')
          
//           // goToMessageScreen();
//         })
//         .catch(err => {
//           alert(err);
//           console.log(err);
//         });
//     } else {
//       alert('Please enter url,username and password');
//     }
//   };

//http://192.168.8.105
useEffect(() => {
  
  (async () => {
    setRememberMe('');
    
    try {

      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setIsLoggedIn(true);
        setUserDetails(credentials);
        global.loggedin=isLoggedIn;
        global.userDetails=userDetails;
        global.username=credentials.username;


      } else {
        console.log("No credentials stored");
      }
      global.userna = await getRememberedUser();

    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  })();
}, []);
  const Authenticate_User= async ()=>{
    setLoading(true);
    if (username!="" && password!=""){
      
    await axios.get(login_uri,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=>{
       
    const users = response.data;
    global.uid=response.data.id;
    global.ac_level=response.data.access_level.id;
    setUser(users);
    setUuid(response.data.id);
    setAccess_level(response.data.access_level.id);

    setTimeout(() => {
      console.log(user);

      console.log(uuid);
      console.log(access_level);
     if ( user!=''){
        console.log('success');
        setLoading(false);
       // alert('success');
       props.navigation.navigate('InitialScreen',
       {
        isLoggedIn: isLoggedIn,
        userDetails:userDetails,
    }
       )
      
        onChangeUsername('')
        onChangePassword('')
     }
    }, 4000)
   

})
      
    .catch(error =>alert("Inavlid Login"))
  
    }else {

      alert("please enter username and password");
    }

    await Keychain.setGenericPassword(username, password);
    setIsLoggedIn(true);
    setUserDetails({password, username});
  }



  const Authenticate_login= async ()=>{
    
  const login_uri= 'http://192.168.6.136:1234/mantis/api/rest/internal/authenticate_login?username='+username+'&password='+password;
   
    if (username!="" && password!=""){
      setLoading(true);
    await axios.get(login_uri,{ headers: {'Authorization': 'Gvp5TxjBTT8pZOPtmRBydKDu9gEhtsad'} })
    .then((response)=> {
     console.log(response.data);
    global.pref_id=response.data.default_project;
    global.uid=response.data.id;
    global.ac_level=response.data.access_level.id;

  
    setUuid(response.data.id);
    setAccess_level(response.data.access_level.id);
  

    console.log(uuid);
    console.log(access_level);
    if ( response.data!=''){
      setLoading(false);
        console.log('success');
      onChangeUsername(userDetails.username)
    onChangePassword('')
  
       // alert('success');
       props.navigation.navigate('InitialScreen',
       {
        isLoggedIn: isLoggedIn,
        userDetails:userDetails,
    }
       )
      
     
     }
    // setTimeout(() => {
    //   console.log(user);

    //   console.log(uuid);
    //   console.log(access_level);
    //  if ( user!=''){
    //   setLoading(false);
    //     console.log('success');
    
    //    // alert('success');
    //    props.navigation.navigate('InitialScreen',
    //    {
    //     isLoggedIn: isLoggedIn,
    //     userDetails:userDetails,
    // }
    //    )
      
    //     onChangeUsername('')
    //     onChangePassword('')
    //  }
    
    // }, 10000)
   

})
      
    .catch(error =>alert("Inavlid Login"))
  
    }else {

      alert("please enter username and password");
    }
  
    await Keychain.setGenericPassword(username, password);
    setIsLoggedIn(true);
    setUserDetails({password, username});
  
  }

  const handleLogout = async()=>{
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if(logout){
      setIsLoggedIn(false);
      setUserDetails({});
    }
  }


  const toggleRememberMe = value => {
   setRememberMe(value);
      if (value === true) {
    //user wants to be remembered.
    console.log("remember me");
      rememberUser();
    } else {
      console.log("not me");
      forgetUser();
    }
  }

  const rememberUser = async () => {
    try {
      global.userna=global.username;
      console.log(global.userna);
    const s =  await AsyncStorage.setItem('KEY0', global.userna);
    console.log(s);
    } catch (error) {
  //   alert("Failed to remember user");
    }
    };
    const getRememberedUser = async () => {
    try {
      global.userna = await AsyncStorage.getItem('KEY0');
     
      if (global.userna !== null) {
        console.log(global.userna+" remembered");
        onChangeUsername(global.userna);
        return global.userna;
      }
    } catch (error) {
   //   alert("Failed to retrieve user");
    }
    };
    const forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('KEY0');
      } catch (error) {
       // Error removing
     //  alert("Failed to remove user");
      }
    };
  
  return (

<>
<Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
          
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
              <View style={{alignSelf:'center',marginTop: 30,}}>
  

      <Image  source={ImagesAssets.logo_f} style={{width: 200, height: 60, alignItems:'center'}}  />
      </View> 
            <Text style={{ color: 'black', marginTop: 28, fontSize:17, fontWeight:'bold' }}>Reset Your Password</Text>
            <Text></Text>
          
            <TextInput placeholder="Enter Email Address"
              placeholderTextColor='black'
              textContentType="emailAddress"
   keyboardType="email-address"
            
              value={inputValue} style={styles.textInput_m}
              onChangeText={(value) => setInputValue(value)} />
            <View style={styles.container_m}>
            <View style={styles.button_m}>
              <Button title="Send Email" color='#142c44'  onPress={()=>alert("Reset password link sent successfully")}
               />
               
               </View>
                 <Text style={{ flex: 0.5 }}></Text>
                 <View style={styles.button_m}>
                <Button title="Cancel" color='#344c5c' onPress={toggleModalVisibility} />
            </View>
            </View>

            <Text></Text>
          </View>
        </View>
      </Modal>



    <View style={styles.body}>
    <View style={styles.container}>
    {/* {!isLoggedIn ? (
      <> */}
        
       <View style={{alignSelf:'center',marginTop:125,marginBottom:25}}>
  

      <Image   source={ImagesAssets.logo_f} style={{width: 200, height: 60, alignItems:'center'}}  />
      </View> 
      <View>
      <Text></Text>
      <Text style={styles.textstyle}>Username</Text>
      <TextInput
           style={styles.textInputStyle}
           autoCapitalize="none"
           returnKeyType="next"
        onChangeText={text => onChangeUsername(text)}
        value={username ?? global.userna}
      />
      <Text></Text>
      <Text style={styles.textstyle}>Password</Text>
      <TextInput
        returnKeyType="done"
        style={styles.textInputStyle}
        secureTextEntry={true}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
    </View>
  
    <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={toggleModalVisibility}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    <View>
    <View style={{flexDirection:'row'}}>
      <Text style={{color:'black'}}>Remember Me</Text>
<Switch
thumbColor={'#041c34'}

style={{ marginLeft:28}}
  value={rememberMe}
  onValueChange={(value) => toggleRememberMe(value)}
  />
</View>
      <Pressable style={styles.button} onPress={Authenticate_login}>
        <Text style={styles.textstyle}>LOGIN</Text>
      
     
      </Pressable>
    </View>
    <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
      <ActivityIndicator animating={isLoading}  size={50} color="#142c44" />
    </View>
    {/* </>
  ) : (
    <View style={{backgroundColor:'blue'}}>
      <Text style={styles.welcomeText}>
        Welcome back! {userDetails.username}
      </Text>
      <Text style={styles.logoutBtn} onPress={handleLogout} >Logout</Text>
    </View>
  )} */}
</View>
</View>
</>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textstyle: {
    color: '#707B7C',
    fontSize: 15,
  },

  textInputStyle: {
    height: 36,
    borderBottomColor: 'black',
    color: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
 
  forgot: {
    fontSize: 13,
    color: 'black'
  },
  body: {
    flex: 1,
    backgroundColor: '#c8cad0',
  },
  container_m: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  button_m: {
    backgroundColor: '#142c44',
    width: '60%',
    height: 40
  },
  button_m1: {
    backgroundColor: '#142c44',
    width: '60%',
    height: 40
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "40%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.45) },
    { translateY: -90 }],
    height: 340,
    width: width * 0.88,
    backgroundColor: "#c8cad0",
    borderRadius: 7,
  },
  textInput_m: {
    width: "90%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
    color: 'black',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#142c44',

    // backgroundColor: '#D5D8DC ',
  },
  container:{backgroundColor: '#c8cad0', marginHorizontal:20}
});

