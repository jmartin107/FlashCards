import {
    ADD_CARD,
    ADD_DECK,
    GET_DECKS,
} from '../actions'


function decks (state = {}, action) {

    switch (action.type) {

        case GET_DECKS:
            return Object.assign({}, state, action.decks)

        case ADD_CARD:
            return Object.assign({}, state, action.decks)

        case ADD_DECK:
            return Object.assign({}, state, action.decks)

        default :
            return state
    }
}

export default decks