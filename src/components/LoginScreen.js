
import { TextInput, Pressable } from 'react-native';

import axios from 'axios';
import { Text, View, Button, TouchableOpacity, Image, Switch, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as Keychain from "react-native-keychain";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagesAssets } from '../../assets/ImageAssets';
import g from '../global';
import styles from '../style/ComponentStyle/LoginStyle';

const LoginScreen = props => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});

  const [isLoading, setLoading] = useState(false);
  const [username, onChangeUsername] = React.useState(global.userna ?? 'bushramuneer');
  const [password, onChangePassword] = React.useState('besttech_001');

  const [uuid, setUuid] = React.useState('');
  const [access_level, setAccess_level] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };



  useEffect(() => {

    (async () => {
      setRememberMe('');

      try {

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setIsLoggedIn(true);
          setUserDetails(credentials);
          global.loggedin = isLoggedIn;
          global.userDetails = userDetails;
          global.username = credentials.username;


        } else {
          console.log("No credentials stored");
        }
        global.userna = await getRememberedUser();

      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  function loginacll() {
    setLoading(true);
    Authenticate_login();
  }

  const Authenticate_login = async () => {
    setLoading(true);
    const login_uri = global.base_url + '/api/rest/internal/authenticate_login?username=' + username + '&password=' + password;

    if (username != "" && password != "") {
      await axios.get(login_uri, { headers: { 'Authorization': global.Authorization_Key } })
        .then((response) => {

          global.pref_id = response.data.default_project;

          global.uid = response.data.id;
          global.ac_level = response.data.access_level.id;


          setUuid(response.data.id);
          setAccess_level(response.data.access_level.id);

          if (response.data != '') {
            setLoading(false);

            onChangeUsername(userDetails.username)
            onChangePassword('')


            props.navigation.navigate('DashboardScreen',
              {
                isLoggedIn: isLoggedIn,
                userDetails: userDetails,
              }
            )


          }


        })

        .catch(error => alert("Invalid Login"), setLoading(false))

    } else {

      alert("Please enter username and password");
    }

    await Keychain.setGenericPassword(username, password);
    setIsLoggedIn(true);
    setUserDetails({ password, username });

  }



  const toggleRememberMe = value => {
    setRememberMe(value);
    if (value === true) {

      console.log("remember me");
      rememberUser();
    } else {
      console.log("not me");
      forgetUser();
    }
  }

  const rememberUser = async () => {
    try {
      global.userna = global.username;

      const s = await AsyncStorage.setItem('KEY0', global.userna);

    } catch (error) {

    }
  };
  const getRememberedUser = async () => {
    try {
      global.userna = await AsyncStorage.getItem('KEY0');

      if (global.userna !== null) {
        console.log(global.userna + " remembered");
        onChangeUsername(global.userna);
        return global.userna;
      }
    } catch (error) {

    }
  };
  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('KEY0');
    } catch (error) {

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
            <View style={{ alignSelf: 'center', marginTop: 30, }}>


              <Image source={ImagesAssets.logo_f} style={{ width: 200, height: 60, alignItems: 'center' }} />
            </View>
            <Text style={{ color: 'black', marginTop: 28, fontSize: 17, fontWeight: 'bold' }}>Reset Your Password</Text>
            <Text></Text>

            <TextInput placeholder="Enter Email Address"
              placeholderTextColor='black'
              textContentType="emailAddress"
              keyboardType="email-address"

              value={inputValue} style={styles.textInput_m}
              onChangeText={(value) => setInputValue(value)} />
            <View style={styles.container_m}>
              <View style={styles.button_m}>
                <Button title="Send Email" color='#142c44' onPress={() => alert("Reset password link sent successfully")}
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


          <View style={{ alignSelf: 'center', marginTop: 125, marginBottom: 25 }}>


            <Image source={ImagesAssets.logo_f} style={{ width: 200, height: 60, alignItems: 'center' }} />
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
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'black' }}>Remember Me</Text>
              <Switch
                thumbColor={'#041c34'}

                style={{ marginLeft: 28 }}
                value={rememberMe}
                onValueChange={(value) => toggleRememberMe(value)}
              />
            </View>
            <Pressable style={styles.button} onPress={loginacll}>
              <Text style={styles.textstyle}>Login</Text>


            </Pressable>
          </View>
          <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
            <ActivityIndicator animating={isLoading} size={50} color="#142c44" />
          </View>

        </View>
      </View>
    </>
  );
};

export default LoginScreen;

