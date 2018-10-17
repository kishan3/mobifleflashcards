import {
    ADD_DECK,
    GET_DECKS,
    ADD_CARD
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
        case ADD_CARD:
            const state_ = {...state}
            state_[action.title].questions.push(action.card)
            return state_
        default:
            return state
    }
}

export default decks