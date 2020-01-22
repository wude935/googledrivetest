import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, View, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import globalStyles, {globalColors} from "../Styles";

export default class LoginScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Login',
        };
    };

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        AsyncStorage.setItem('signedIn', 'false')
        Alert.alert('About this App', 'This app can retrieve folders from your Google Drive and read any .xml files on your Drive with Name and City tags.')
    }

    // //Asks the user to sign in and into Google
    // //If the user signs in correctly then the app saves the access token and refresh token
    async signIn() {
        const result = await Google.logInAsync({
          iosClientId: '28190026547-uf0bj4g21abepth6tbfhf8ag7rohb9cf.apps.googleusercontent.com',
          androidClientId: '28190026547-6kh2eii9ufc6jdlq2gd62indusq5128b.apps.googleusercontent.com',
          // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
          // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
          scopes: [
            'https://www.googleapis.com/auth/drive',
          ]
        });
        if (result.type === "success") {
            console.log('the access token is ' + result.accessToken)
            console.log(result.user)
            SecureStore.setItemAsync('accessToken', JSON.stringify(result.accessToken))
            SecureStore.setItemAsync('refreshToken', JSON.stringify(result.refreshToken))
            await AsyncStorage.multiSet([
                ['signedIn', 'true'],
                ['refreshTokenCount', '0'],
                ['directoryID', 'root'],
                ['directoryName', 'Google Drive']
            ])
            await this.props.navigation.replace('LoadingScreenRouter')
        }
        else {
            alert('Login Failed.')
        }
        this.props.navigation.replace('LoadingScreenRouter')
    }

    render() {
        return (
            <SafeAreaView style={globalStyles.container}>
                <View style={{height: '50%'}}>
                </View>
                <View style={{height: '50%'}}>
                    <TouchableOpacity
                        style={globalStyles.buttonContainer}
                        onPress={() => this.signIn()}
                    >
                        <Text style={globalStyles.lightText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


