import React from 'react';
import {AsyncStorage, Text, SafeAreaView, View, ActivityIndicator} from 'react-native';
import globalStyles, {globalColors} from '../Styles';
import FileList from '../components/FileList'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.directoryName,
            headerBackTitle: 'Back'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: 'false',
            directoryID: '',
            directoryName: ''
        }
    }

    async componentDidMount() {
        await this.getDirectoryInfo()
            .then(() => this.setState({loaded: 'true'}))
    }

    async getDirectoryInfo() {
        const directoryID = await AsyncStorage.getItem('directoryID')
        const directoryName = await AsyncStorage.getItem('directoryName')
        this.setState({
            directoryID: directoryID,
            directoryName: directoryName
        })
    }

    render() {
        if (this.state.loaded === 'false') {
            return (
                <View style={globalStyles.loadingContainer}>
                  <Text>Hello</Text>
                </View>
            );
        }
        else if (this.state.loaded === 'true') {
            return (
                <SafeAreaView style={globalStyles.container}>
                    <View style={{height: '100%', width: '100%'}}>
                        <FileList directoryID={this.state.directoryID}/>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

//host client id: 28190026547-uf0bj4g21abepth6tbfhf8ag7rohb9cf.apps.googleusercontent.com