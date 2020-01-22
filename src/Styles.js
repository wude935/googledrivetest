import {Dimensions, StyleSheet, Platform} from 'react-native';

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const globalColors = {
    blue: '#008bfe',
    darkblue: '#0061b1',
    white: '#FFF',
    black: '#000000',
    grey: '#bdc6cf'
}

const globalStyles = StyleSheet.create({
    globalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: globalColors.white,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: globalColors.white,
        alignItems: 'center',
    },
    loadingContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: globalColors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightText: {
        color: globalColors.white,
        textAlign: 'center'
    },
    darkText: {
        color: globalColors.black,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: globalColors.darkblue,
        height: 30,
        width: 200,
        justifyContent: 'center',
        ...Platform.select({
            android: {
                borderRadius: 40
            },
            ios: {
                borderRadius: 5
            }
        })
    },
    iconContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
})

export default globalStyles