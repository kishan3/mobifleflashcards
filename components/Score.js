import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {white, gray, lightPurp} from '../utils/colors'


class Score extends Component {
    static navigationOptions = ({navigation}) => {
        const {deck} = navigation.state.params
        return ({
            title: `Score for ${deck.title} quiz!`
        })
    }

    render() {
        const {deck, correct} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>{`${100.0 *correct / deck.questions.length}%`}</Text>
                    <Text style={styles.caption}>{`You have got ${correct} / ${deck.questions.length} correct!`}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('Quiz', {
                            deck,
                            questionIndex: 0,
                            correct: 0
                        })}
                    >
                        <Text style={styles.btnText}>Reset Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('DeckDetail', {deck})}    
                    >
                        <Text style={styles.btnText}>
                            Back to Deck
                        </Text>
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
})
  

export default Score