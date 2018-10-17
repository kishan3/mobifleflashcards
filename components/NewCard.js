import React, {Component} from 'react'
import {KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {gray, lightPurp, white} from '../utils/colors'
import {addCard} from '../actions'
import {connect} from 'react-redux'


class NewCard extends Component {
    state = {
        questionText: '',
        answerText: '',
    }

    static navigationOptions = ({navigation}) => {
        const {deck} = navigation.state.params

        return ({
            title: `Add Card to ${deck.title}`
        })
    }
    handleSubmit = () => {
        const {addCard, title, navigation} = this.props
        const {questionText, answerText} = this.state
        addCard(title, {
            question: questionText,
            answer: answerText
        }).then(() => {
            this.setState({
                questionText: '',
                answerText: ''
            })
        })
        navigation.navigate('Home')
    }

    render() {
        const {questionText, answerText} = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Add question for card creation."
                    value={questionText}
                    onChangeText={questionText => this.setState({questionText})}
                />
                <TextInput
                    style={styles.textInput} 
                    placeholder="Add answer for card creation."
                    value={answerText}
                    onChangeText={answerText => this.setState({answerText})}
                />
                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress={this.handleSubmit}
                    disabled={!questionText || !answerText}>
                    <Text style={styles.btnText}>Add Card</Text>
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

function mapStateToProps(data, {navigation}) {
    const { deck } = navigation.state.params
    const { title } = deck
    return {
        title
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCard: (title, card) => dispatch(addCard(title, card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)