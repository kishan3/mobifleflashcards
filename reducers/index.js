import {
    ADD_DECK,
    GET_DECKS
} from '../actions/index'


function decks(state = [], action) {
    switch (action.type) {
        case GET_DECKS:
            return action.decks
        case ADD_DECK:
            const { title } = action
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }
        default:
            return state
    }
}

export default decks