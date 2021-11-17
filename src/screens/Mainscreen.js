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
import { TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify'

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' , backgroundColor: ''}}>
        <View>
            <Image 
            source={{uri: 'https://cdni.iconscout.com/illustration/premium/thumb/q-and-a-service-3678714-3098907.png'}} 
            style={styles.banner}
            resizeMode="contain"
            />
        </View>
        <View style={{ width: '100%'}}>
        <TouchableOpacity
                style={styles.button}
                onPress={()=> navigation.navigate('Quizzes')}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> navigation.navigate('Details')}
                style={styles.button}>
                <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> signOut()}
                style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    banner: {
        width: 300,
        height: 300
    },
    button: {
        backgroundColor: '#184E77',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    }

})