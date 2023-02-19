
import { TextInput, Pressable} from 'react-native';
import {Appbar} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import XMLParser from 'react-xml-parser';
import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';



const LoginScreen = props => {

  const [url, onChangeUrl] = React.useState('');
  var id,name ;
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('111');
  const [user, setUser] = React.useState([]);
   const [uuid, setUuid] = React.useState('');
  const [access_level, setAccess_level] = React.useState('');

//   const logincall = async () => {
//     console.log(url);
//     console.log(username);
//     console.log(password);

//     let UAT_mantis_url =
//       //  'http://192.168.6.136:8080/mantis/api/soap/mantisconnect.php';
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

  const login_uri= 'http://192.168.8.102:1234/mantis/api/rest/internal/authenticate_login?username='+username+'&password='+password;
  const Authenticate_User= async ()=>{
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
        alert('success');
       props.navigation.navigate('HomeScreen')
      
        onChangeUsername('')
        onChangePassword('')
     }
    }, 4000)

})
      
    .catch(error =>console.error(`Error: $(error)`))
  
    }else {

      alert("please enter username and password");
    }
  }

  return (
    <View style={styles.body}>
    <View style={styles.container}>
 
      <Text></Text>
      <Text style={styles.textstyle}>Username</Text>
      <TextInput
           style={styles.textInputStyle}
        onChangeText={text => onChangeUsername(text)}
        value={username}
      />
      <Text></Text>
      <Text style={styles.textstyle}>Password</Text>
      <TextInput
        style={styles.textInputStyle}
        secureTextEntry={true}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
    </View>
    <View>
      <Pressable style={styles.button} onPress={Authenticate_User}>
        <Text style={styles.textstyle}>LOGIN</Text>
      </Pressable>
    </View>
  </View>
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
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 20,
    marginHorizontal: 138,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#B2BABB',

    // backgroundColor: '#D5D8DC ',
  },
  container:{backgroundColor: 'white'}
});

