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
import * as queries from '../../../graphql/queries';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';

const initialState = {name: '', description: ''};

function FrontEndScreen({navigation}) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchTodos().finally(setLoading(false));
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql({
        query: queries.getTodo,
        variables: {id: 'platform-question'},
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
              <Image
                source={{
                  uri: 'https://cdni.iconscout.com/illustration/premium/thumb/application-development-3428342-2885701.png',
                }}
                style={styles.banner}
                resizeMode="contain"
              />
              <Text style={styles.questionText}>{todos.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.answerContainer}
              onPress={() =>
                navigation.navigate('Quizzes', {screen: 'FrontEnd'})
              }>
              <Text style={styles.answerText}>{questions[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerContainer}>
              <Text style={styles.answerText}>{questions[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerContainer}>
              <Text style={styles.answerText}>{questions[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerContainer}>
              <Text style={styles.answerText}>{questions[3]}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
      </View>
    </View>
  );
}

export default FrontEndScreen;

const styles = StyleSheet.create({
  banner: {
    width: 200,
    height: 200,
  },
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
