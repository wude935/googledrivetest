import React from 'react';
import {AsyncStorage, Text, SafeAreaView, View, ActivityIndicator} from 'react-native';
import globalStyles, {globalColors} from '../Styles';
import XMLParser from "react-xml-parser"


export default class ParsedFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: 'false',
            parsedFile: ''
        }
    }

    async componentDidMount() {
        await this.parseFile()
            .then(() => this.setState({loaded: 'true'}))
    }

    //Parses the file into a string
    async parseFile() {
        const response = await fetch (this.props.fileUri)
        const body = await response.text()
        let parsedFile = new XMLParser().parseFromString(body)
        console.log(response)
        //console.log(parsedFile)
        this.setState({parsedFile: parsedFile})
    }

    //Extracts the specified element from the parsedFile
    getElement(element){
        const unparsedElement = (this.state.parsedFile.getElementsByTagName(element))
        console.log(unparsedElement)
        const parsedElement = unparsedElement[0].value
        //console.log(parsedElement)
        console.log('element parsed')
        return(parsedElement)
    }

    render() {
        if (this.state.loaded === 'false') {
            return (
                <View style={globalStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColors.grey}/>
                </View>
            );
        }
        else if (this.state.loaded === 'true') {
            return (
                <View style={globalStyles.container}>
                    <Text></Text>
                    <Text>Name: {this.getElement('name')}</Text>
                    <Text>City: {this.getElement('city')}</Text>
                </View>
            );
        }
    }
}