import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native'
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import DeckList from './components/DeckList'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import DeckDetail from './components/DeckDetail'
import NewDeck from './components/NewDeck'
import {Constants} from 'expo'
import thunk from 'redux-thunk'
import {black, purple, white} from './utils/colors'

function CardAppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = createMaterialTopTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
        },
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            title: 'Deck Details',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
})


export default class App extends React.Component {

    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <View style={styles.container}>
                    <CardAppStatusBar backgroundColor='blue' barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
    },
});
