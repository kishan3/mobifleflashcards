import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, gray, black, pink, lightPurp, orange } from '../utils/colors'


export default function DeckDetail ({ navigation }) {
    const { deck } = navigation.state.params
    return (
        <View>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewDeck')} style={styles.addCardBtn}>
                <Text style={styles.addCardBtnText}>Add New Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={styles.startQuizBtn}>
                <Text style={styles.startQuizBtnText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: white,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      borderColor: white,
      fontSize: 40,
    },
    cardCount: {
      textAlign: 'center',
      color: gray,
      fontSize: 24,
      marginBottom: 80,
    },
    addCardBtn: {
      backgroundColor: lightPurp,
      margin: 5,
      padding: 10,
      paddingLeft: 50,
      paddingRight: 50,
      marginLeft: 30,
      marginRight: 30,
      borderWidth: 1,
      borderRadius: 5,
    },
    startQuizBtn: {
      backgroundColor: orange,
      margin: 5,
      padding: 10,
      paddingLeft: 50,
      paddingRight: 50,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 5,
    },
    addCardBtnText: {
      color: black,
      fontSize: 18,
      textAlign: 'center',
    },
    startQuizBtnText: {
      color: white,
      fontSize: 18,
      textAlign: 'center',
    },
  })