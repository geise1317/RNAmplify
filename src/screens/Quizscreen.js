import API, {graphqlOperation} from '@aws-amplify/api';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';
import * as queries from '../graphql/queries';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StructureScreen from './quizscreens/structure';
import FrontEndScreen from './quizscreens/structurescreens/frontend';
import FullStackScreen from './quizscreens/structurescreens/fullstack';

const initialState = {name: '', description: ''};

function QuizScreen({navigation}) {
  const QuizStack = createNativeStackNavigator();

  return (
    <QuizStack.Navigator>
        <QuizStack.Screen name="Structure" component={StructureScreen} options={{ headerShown: false}}/>
        <QuizStack.Screen name="FrontEnd" component={FrontEndScreen} options={{ title: 'Front-End'}}/>
        <QuizStack.Screen name="FullStack" component={FullStackScreen} options={{ title: 'Full-Stack'}}/>
    </QuizStack.Navigator>
  );
}

export default QuizScreen;
