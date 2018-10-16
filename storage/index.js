import {AsyncStorage} from 'react-native'

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


export const saveDeckTitle = (deckTitle) => {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
            deckTitle,
            questions: [],
        }
    }))
}


export const saveDeck = async (deckTitle) => {
    try {
        const deck = {
            title: deckTitle,
            questions: [],
        }
        await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck))
        return deck
    } catch (err) {
        console.error(err)
        alert('There was an error saving a deck.')
    }
}


export async function getDeck(key) {
    try {
        const retrievedItems = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        const items = JSON.parse(retrievedItems)
        console.warn("items: ", items[key])
        return items[key]
    } catch (error) {
        console.log(error.message);
    }
    return
}


export function addCardToDeck() {

}