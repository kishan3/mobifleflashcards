import {
    AsyncStorage
} from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:app'

export const initData = {
    React: {
        title: 'React',
        questions: [{
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [{
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }]
    }
}


export const getDecks = () => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(results => {
            if (results == null) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initData))
                return initData
            } else {
                return JSON.parse(results)
            }
        })
}


export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [],
        }
    }))
}


export async function getDeck(key) {
    try {
        const retrievedItems = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        const items = JSON.parse(retrievedItems)
        return items[key]
    } catch (error) {
        console.log(error.message);
    }
    return
}


export const addCardToDeck = (title, card) => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)[title]
        })
        .then(data => {
            const {question, answer} = card
            const questions = data.questions.concat({
                question,
                answer
            })
            AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions
                }
            }))
        })
}