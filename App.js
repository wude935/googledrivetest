//This app can retrieve folders from your Google Drive and read any .txt files on your Drive. 

import React from 'react';
import {View, StatusBar} from 'react-native';
import {createStackNavigator} from "react-navigation";
import globalStyles, {globalColors} from "./src/Styles";
import LoadingScreen from "./src/screens/LoadingScreen"
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FileViewerScreen from "./src/screens/FileViewerScreen";

const MainStack = createStackNavigator(
    {
        LoadingScreenRouter: {
            screen: LoadingScreen,
        },
        HomeScreenRouter: {
            screen: HomeScreen,
        },
        LoginScreenRouter: {
            screen: LoginScreen
        }
    },
    {
        initialRouteName: 'LoginScreenRouter',
        navigationOptions: {
            headerStyle: {
                backgroundColor: globalColors.darkblue,
            },
            headerTintColor: globalColors.white,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const ModalStack = createStackNavigator(
    {
        FileViewerScreenRouter: {
            screen: FileViewerScreen
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: globalColors.darkblue,
            },
            headerTintColor: globalColors.white,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
)

const RootStack = createStackNavigator(
    {
        MainStackRouter: {
            screen: MainStack
        },
        ModalStackRouter: {
            screen: ModalStack,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default class App extends React.Component {

    render() {
        return (
            <View style={globalStyles.globalContainer}>
                <StatusBar barStyle="light-content"/>
                <RootStack/>
            </View>
        );
    }
}
