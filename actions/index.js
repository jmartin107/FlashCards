import * as Api from '../utils/api'

export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'

export function addCard (title, question) {
    return {
        type: ADD_CARD,
        title,
        question
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}

export const getDecks = () => (dispatch) => {
    return Api.getDecks()
        .then(decks => {
            dispatch({
                type:GET_DECKS,
                decks
            });
        })
};

export const addCardToDeck = (title, question) => (dispatch) => {
    return Api.addCardToDeck({title, question})
        .then(decks => {
            dispatch({
                type:ADD_CARD,
                decks
            })
        })
}

export const saveDeckTitle = (title) => (dispatch) => {
    return Api.saveDeckTitle(title)
        .then(decks => {
            dispatch({
                type: ADD_DECK,
                decks
            })
        })
}