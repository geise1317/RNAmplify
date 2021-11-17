import * as React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Image
  } from 'react-native';

  function DetailScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: ''}}>
        <View>
            <Image 
                source={{uri: 'https://cdni.iconscout.com/illustration/premium/thumb/online-quiz-4438988-3726683.png'}} 
                style={styles.banner}
                resizeMode="contain"
                />
        </View>
        <Text style={{marginHorizontal: 20}}>
            Selecting the best development tools such as IDE and computer language for development is the biggest
            and the most important phase when it comes to creating a software. As a mobile application developer,
            selecting the right framework and IDE was time consuming and tricky. The Dev-Tool Selection Support System
             will help those identifying what are some frameworks, languages, and IDE that I can use for the project.
             For example, identifying the best tools for front-end and back-end in the projects.
        </Text>
        <Text style={{marginHorizontal: 20, marginVertical: 20, fontSize:20, fontWeight: '600'}}>
            Developed by Eric Son
        </Text>
      </View>
    );
  }

export default DetailScreen;

const styles = StyleSheet.create({
    banner: {
        width: 300,
        height: 300
    },

})