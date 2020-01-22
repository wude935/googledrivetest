import React from 'react';
import * as SecureStore from 'expo-secure-store';
import {StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import globalStyles, {globalColors} from "../Styles";
import {withNavigation} from "react-navigation";
import ParsedFile from '../components/ParsedFile'

class FileViewerScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.directoryName,
            headerLeft:(
                <TouchableOpacity
                    style={globalStyles.iconContainer}
                    onPress={() => navigation.pop()}
                >
                    <Text
                        style={[globalStyles.lightText, {fontSize: 17}]}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: 'false',
            file: '',
            fileUri: '',
            parsedxml: ''
        }
    }


    async componentDidMount() {
        //console.log(this.props.navigation.getParam('directoryID', 'error'))
        await this.getFile()
    }


    //Checks and see if the file has already been cached
    //If it has already been cached, it retrieves the file
    //If it has not been cached, it downloads the file
    async getFile(){
        const directoryID = this.props.navigation.getParam('directoryID', 'error')
        const filePath = `${FileSystem.cacheDirectory}${directoryID}`
        const fileInfo = await FileSystem.getInfoAsync(filePath)
        //console.log(fileInfo)
        if (fileInfo.exists === 1){
            this.setState({fileUri: fileInfo.uri, loaded: 'true'})
            console.log('existing cached uri is at ' + this.state.fileUri)
        }
        else if (fileInfo.exists === 0){
            await this.downloadFile(directoryID, filePath)
        }
        else{
            console.log('error retrieving file')
            await this.downloadFile(directoryID, filePath)
        }
    }

    //Downloads the file
    async downloadFile(directoryID, filePath) {
        //Retrieves the URL of the file to download
        const accessToken = JSON.parse(await SecureStore.getItemAsync('accessToken'))
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${directoryID}?alt=media&access_token=${accessToken}`, {
            }
        )
        //console.log(response)
        if (response.ok === true){
            const newFile = await FileSystem.downloadAsync(response.url, filePath)
            this.setState({fileUri: newFile.uri, loaded: 'true'})
            console.log('downloaded cached uri is at ' + this.state.fileUri)
            }
        else{
            alert('An error occurred.')
        }
    }

    render() {
        if (this.state.loaded === 'false') {
                return (
                    <SafeAreaView style={globalStyles.loadingContainer}>
                    </SafeAreaView>
                );
        }
        else if (this.state.loaded === 'true') {
            return (
                <SafeAreaView style={globalStyles.container}>
                    <ScrollView>
                        <ParsedFile fileUri={this.state.fileUri}/>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

export default withNavigation(FileViewerScreen);