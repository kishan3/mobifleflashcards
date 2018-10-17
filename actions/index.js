import {getDecks, saveDeckTitle, addCardToDeck} from '../storage/index'

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_DECKS = 'GET_DECKS'

export const getAllDecks = () => dispatch => (
    getDecks()
        .then((decks) => dispatch({
            type: GET_DECKS,
            decks
        }))
)


export const addDeck = (title) => dispatch => (
    saveDeckTitle(title)
        .then(() => dispatch({
            type: ADD_DECK,
            title,
        }))
)

export const addCard = (title, card) => dispatch => (
    addCardToDeck(title, card)
        .then(() => dispatch({
            type: ADD_CARD,
            title,
            card
        }))
)