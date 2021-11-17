/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * 
 * Username: Admin
 * Password: dnflwlq12
 * 
 *  REST API endpoint: https://ngzifyadsi.execute-api.ca-central-1.amazonaws.com/dev
 *  
 */

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  LogBox,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { API, graphqlOperation} from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './src/aws-exports'; // if you are using Amplify CLI
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Storage } from 'aws-amplify'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Mainscreen'
import DetailScreen from './src/screens/Detailscreen'
import QuizScreen from './src/screens/Quizscreen'
import 'react-native-gesture-handler';

import { createToDo } from './src/graphql/mutations'
import { listToDo } from './src/graphql/mutations'

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function App (){
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home'}}/>
          <Stack.Screen name="Details" component={DetailScreen}/>
          <Stack.Screen name="Quizzes" component={QuizScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const signUpConfig = {
  header: 'Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'My user name',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    },
  ]
};

const usernameAttributes = 'My user name';

export default withAuthenticator(App, { signUpConfig, usernameAttributes });