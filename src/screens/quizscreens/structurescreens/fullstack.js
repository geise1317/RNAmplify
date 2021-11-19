import API, {graphqlOperation} from '@aws-amplify/api';
import React, {useCallback, useEffect, useState} from 'react';
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
  Linking,
  Alert,
} from 'react-native';
import * as queries from '../../../graphql/queries';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';

const initialState = {name: '', description: ''};

export default function FullStackScreen({navigation}) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const AmplifyURL = "https://docs.amplify.aws/";
  const FirebaseURL = "https://firebase.google.com/";

  useEffect(() => {
    fetchTodos().finally(setLoading(false));
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql({
        query: queries.getTodo,
        variables: {id: 'full-stack-framework'},
      });
      const todos = todoData.data.getTodo;
      setQuestions(todoData.data.getTodo.description);
      setTodos(todos);
    } catch (err) {
      Toast.show(err);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
      }}>
      <View style={{flex: 9, justifyContent: 'center'}}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color={'#333CFF'}
            size={'large'}
          />
        ) : (
          <View key={todos.id}>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{todos.name}</Text>
            </View>
            <OpenURLButton url={AmplifyURL}>{questions[0]}</OpenURLButton>
            <OpenURLButton url={FirebaseURL}>{questions[1]}</OpenURLButton>
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: '#C1C1C1'}}>Developed by Eric Son</Text>
      </View>
    </View>
  );
}

function OpenURLButton({url, children}){
  const handlePress = useCallback(async () =>{
    const supported = await Linking.canOpenURL(url);
    // if(supported){
    //   await Linking.openURL(url);
    // } else {
    //   Alert.alert('Error opening the URL: ${url}');
    // }
    await Linking.openURL(url);
  }, [url]);
  return (
    <TouchableOpacity style={styles.answerContainer}
    onPress={handlePress}>
      <Text style={styles.answerText}>{children}</Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  questionContainer: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  answerContainer: {
    height: 50,
    backgroundColor: '#333CFF',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  answerText: {
    color: '#FFFFFF',
  },
});
