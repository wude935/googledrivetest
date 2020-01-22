import React from 'react';
import * as SecureStore from 'expo-secure-store';
import {SafeAreaView, AsyncStorage, ActivityIndicator, Text} from 'react-native';
import globalStyles from "../Styles";

let testInterval;

export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        //runs shouldTokenRefresh as soon as it loads
        await this.shouldTokenRefresh()
        console.log('current directory name is ' + await AsyncStorage.getItem('directoryName'))
        //runs shouldTokenRefresh every 10 minutes
        testInterval = setInterval(() => {
            this.shouldTokenRefresh()
        }, 600000);
    }

    componentWillUnmount() {
        clearInterval(testInterval);
    }

//Tests the accessToken to see if it is valid or about to expire in 10 minutes
//If it is valid it sends the user to the home screen
//If it is not valid or about to expire in 10 minutes it refreshes the token
    async shouldTokenRefresh() {
        const accessToken = JSON.parse(await SecureStore.getItemAsync('accessToken'))
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, {
                method: 'POST',
            }
        )
        console.log(response)
        let body = await response.json()
        console.log(body)
        console.log('the access token expires in ' + body.expires_in)
        if (body.error === 'invalid_token' || body.expires_in <= 600){
            AsyncStorage.setItem('signedIn', 'false')
            console.log('not signed in')
            this.refreshToken()
        }
        else if (body.expires_in > 600){
            AsyncStorage.setItem('signedIn', 'true')
            console.log('signed in')
            this.props.navigation.replace('HomeScreenRouter', {
                directoryID: await AsyncStorage.getItem('directoryID'),
                directoryName: await AsyncStorage.getItem('directoryName')
            })
        }
        else{
            console.log('unknown if signed in')
        }
    }

//Refreshes the token
//If the token has already been refreshed 45 times, it sends the user to the login screen
//Google only allows an access token to be refreshed a total of 50 times
    async refreshToken() {
        const refreshTokenCount = parseInt(await AsyncStorage.getItem('refreshTokenCount'))
        if (refreshTokenCount <= 45) {
            const refreshToken = JSON.parse(await SecureStore.getItemAsync('refreshToken'))
            const response = await fetch(`https://www.googleapis.com/oauth2/v4/token?refresh_token=${
                refreshToken
            }&client_id=${
                '28190026547-uf0bj4g21abepth6tbfhf8ag7rohb9cf.apps.googleusercontent.com'
                    }&grant_type=refresh_token`, {
                    method: 'POST',
                }
            )
            let body = await response.json()
            await AsyncStorage.setItem('refreshTokenCount', (refreshTokenCount + 1).toString())
            console.log('refresh token count is ' + refreshTokenCount)
            console.log('token refreshed')
            SecureStore.setItemAsync('accessToken', JSON.stringify(body.access_token))
                .then(
                    this.shouldTokenRefresh()
                )
        }
        else {
            AsyncStorage.setItem('signedIn', 'false')
            console.log('send to login screen')
            this.props.navigation.replace('LoginScreenRouter')
        }
    }

    render(){
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
            <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
}