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
import * as queries from '../../../../graphql/queries';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';

const initialState = {name: '', description: ''};

export default function AndroidScreen({navigation}) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const JavaURL = "https://developer.android.com/guide";
  const KotlinURL = "https://developer.android.com/kotlin?gclid=Cj0KCQiAys2MBhDOARIsAFf1D1cYQswQimOLBXPUIBjR2mSj8ZebUh5uC4FAzMFHsU9PUfOoeDcohFoaAhbyEALw_wcB&gclsrc=aw.ds";

  useEffect(() => {
    fetchTodos().finally(setLoading(false));
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql({
        query: queries.getTodo,
        variables: {id: 'Android-Languages'},
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
                  uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/android-4437043-3684810.png',
                }}
                style={styles.banner}
                resizeMode="contain"
              />
              <Text style={styles.questionText}>{todos.name}</Text>
            </View>
            <OpenURLButton url={JavaURL}>{questions[0]}</OpenURLButton>
            <OpenURLButton url={KotlinURL}>{questions[1]}</OpenURLButton>
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
  banner: {
    width: 200,
    height: 200
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
