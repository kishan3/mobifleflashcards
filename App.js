import React from 'react';
import {StatusBar,Text, StyleSheet, View} from 'react-native'
import {createMaterialTopTabNavigator, TabNavigator, createStackNavigator} from 'react-navigation'
import DeckList from './components/DeckList'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {FontAwesome, Ionicons} from 'react-native-vector-icons'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import {Constants} from 'expo'
import thunk from 'redux-thunk'
import {black, orange, purple, white} from './utils/colors'

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
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
        },
    }
}, {
    navigationOptions: {
        headers: null
    },
    tabBarOptions: {
        shadowOffset: {
            height: 3,
            width: 0
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        }
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
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
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
                <View style={{flex: 1}}>
                    <CardAppStatusBar backgroundColor='blue' barStyle='light-content'/>
                    <MainNavigator />
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
