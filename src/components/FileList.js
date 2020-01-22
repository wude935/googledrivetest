import React from 'react';
import * as SecureStore from 'expo-secure-store';
import {StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator, Modal} from 'react-native';
import {withNavigation} from 'react-navigation';
import globalStyles, {globalColors} from "../Styles";
import {ListItem} from "react-native-elements";
import FileViewerScreen from "../screens/FileViewerScreen";

class FileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: 'false',
            fileList: []
        }
    }


    async componentDidMount() {
        //console.log(this.props.directoryID)
        await this.getFileList()
            .then(() => this.setState({loaded: 'true'}))
    }

    //Handles the press of any item in the list
    //If the item is folder, it navigates and displays the files within the folder
    //If the item is a .xml file, it opens the fileViewer
    async handlePress(item) {
        if (item.mimeType === 'application/vnd.google-apps.folder') {
            await AsyncStorage.multiSet([
                ['directoryID', item.id],
                ['directoryName', item.name]
            ])
                .then(await this.props.navigation.navigate('LoadingScreenRouter'))
        }
        else if (item.mimeType === 'text/xml') {
            //console.log(item.id)
            await AsyncStorage.multiSet([
                ['directoryID', item.id],
                ['directoryName', item.name]
            ])
                .then(await this.props.navigation.navigate('FileViewerScreenRouter', {directoryID: item.id, directoryName: item.name}))
        }
    }

    //Returns an array of files in a directory (folders and .xml files only)
    async getFileList() {
        const accessToken = JSON.parse(await SecureStore.getItemAsync('accessToken'))
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=folder&q=%27${encodeURI(this.props.directoryID)}%27%20in%20parents%20and%20trashed%20!%3D%20true%20and%20(mimeType%20%3D%20%27application%2Fvnd.google-apps.folder%27%20or%20mimeType%20%3D%20%27text%2Fxml%27)%20`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        let body = await response.json()
        //console.log(body)
        this.setState({fileList: body.files})
    }


    renderListItem = ({item}) => (
        <TouchableOpacity
            onPress={() => this.handlePress(item)}
        >
            <ListItem
                title={item.name}
                subtitle={item.mimeType}
            />
        </TouchableOpacity>
    )

    render() {
        if (this.state.loaded === 'false') {
            return (
                <View style={globalStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColors.grey}/>
                </View>
            );
        }
        else if (this.state.loaded === 'true') {
            //console.log(this.state.fileList)
            if (this.state.fileList.length == 0 || this.state.fileList.length === undefined) {
                return (
                    <View style={globalStyles.container}>
                        <Text></Text>
                        <Text>No files found</Text>
                    </View>
                );
            }
            return (
                <SafeAreaView style={globalStyles.container}>
                    <FlatList
                        style={styles.listItem}
                        keyExtractor={item => item.id}
                        data={this.state.fileList}
                        renderItem={this.renderListItem}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default withNavigation(FileList);

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%',
    },
})
