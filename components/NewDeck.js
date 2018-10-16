import React, {Component} from 'react'
import {KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {white, gray, black, purple, orange, lightPurp} from '../utils/colors'
import {saveDeckTitle} from '../utils/api'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {saveDeck} from '../utils/api'


class NewDeck extends Component {
    state = {
        title: '',
    }

    handleTextChange = text => {
        this.setState({
            title: text,
        })
    }

    toHome = () => {
        this.props.navigation.navigate('DeckList')
    }

    handleSubmit() {
        const {title} = this.state
        const {navigation} = this.props
        this.props.addDeck(title)
            .then(() => {
                this.setState({
                    title: '',
                })
            })
        navigation.navigate('DeckList')
        // const savedDeck = await saveDeck(title)
        // const newDeck = savedDeck
        // this.setState({title: ''})
        // this.toHome()
    }

    render() {
        const {deckTitle} = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleQuestionText}>What is the title of your deck?</Text>
                <TextInput
                    style={styles.textInput}
                    value={deckTitle}
                    placeholder="Deck Title"
                    onChangeText={this.handleTextChange}
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.btnText}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleQuestionText: {
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
    },
    textInput: {
        width: 300,
        height: 45,
        padding: 8,
        borderWidth: 1,
        borderColor: gray,
        marginTop: 30,
        backgroundColor: white,
    },
    submitBtn: {
        backgroundColor: lightPurp,
        margin: 5,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        borderRadius: 5,
    },
    btnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
    },
})

function mapStateToProps(data) {
    return {
        deckList: Object.keys(data)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (title) => dispatch(addDeck(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)