import React, {Component} from 'react'
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import {gray, lightPurp, white} from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
    state = {
        correct: 0,
        showAnswer: false,
        isLastQuestion: false
    }
    static navigationOptions = ({navigation}) => {
        const { deck } = navigation.state.params
        return ({
            title: `Started quiz for ${deck.title}`
        })
    }

    componentDidMount () {
        const {deck, questionIndex, correct} = this.props.navigation.state.params

        this.setState({
            showAns: false,
            questionIndex,
            correct,
            isLastQuestion: false
        })

        if (questionIndex + 1 === deck.questions.length) {
            this.setState({
                isLastQuestion: true,
            })
        }
    }

    componentDidUpdate (prevProps) {
        const {deck, questionIndex, correct} = this.props.navigation.state.params

        if (prevProps !== this.props) {
            this.setState({
                showAnswer: false,
                questionIndex,
                correct,
                isLastQuestion: false
            })

            if (questionIndex + 1 === deck.questions.length) {
                this.setState({
                    isLastQuestion: true
                })
            }
        }
    }


    questionOrAnswer(){
        const {deck, questionIndex} = this.props.navigation.state.params
        const {showAnswer} = this.state
        return showAnswer
        ? deck.questions[questionIndex].answer
        : deck.questions[questionIndex].question
    }

    showAnswer = () => {
        this.setState((currentState) => ({
            showAnswer: !currentState.showAnswer
        }))
    }

    nextQuestion = () => {
        const {deck, questionIndex} = this.props.navigation.state.params
        const {isLastQuestion, correct} = this.state
        if (isLastQuestion) {
            clearLocalNotification()
            .then(setLocalNotification())

            this.props.navigation.navigate('Score', {
                deck,
                correct
            })
        } else {
            this.props.navigation.navigate('Quiz', {
                deck,
                questionIndex: questionIndex + 1,
                correct: correct,
            })
        }
    }

    isCorrect = () => {
        this.setState((currentState) => ({
            correct: currentState.correct + 1
        }), () => this.nextQuestion())
    }
    render() {
        const {deck, questionIndex} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.caption}>Questions remaining {deck.questions.length - questionIndex}</Text>
                </View>
                <View className="text" style={styles.subcontainer}>
                    <Text style={styles.heading}>{this.questionOrAnswer()}</Text>
                    <Text style={styles.caption} onPress={this.showAnswer}>Show Answer</Text>
                </View>
                <View className="buttons" style={styles.subcontainer}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.isCorrect}
                    >
                        <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.nextQuestion}
                    >
                        <Text style={styles.btnText}>Incorrect</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
  
    subcontainer: {
      alignItems: 'center',
      width: '100%'
    },
  
    heading: {
      fontSize: 48
    },
  
    caption: {
      fontSize: 24,
      color: gray
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
  });
  

export default Quiz