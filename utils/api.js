import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

const initialData = {
    React: {
        title: 'React',
        questions: [
            {
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
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

function init() {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
        .then(() => {
            return Promise.resolve(initialData)
        })
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => {
            let decksObj = JSON.parse(decks)
            if (decksObj) {
                return Promise.resolve(decksObj)
            } else {
                return init()
            }
        })
}

export function addCardToDeck({title, question}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => {
            let decksObj = JSON.parse(decks)
            decksObj[title].questions.push(question)
            let str = JSON.stringify(decksObj)
            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, str)
        })
        .then(() => {
            return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        })
        .then(decks => {
            return Promise.resolve(JSON.parse(decks))
        })
}

const createDeck = (title) => {
    // TODO: title key should be GUID
    let newDeck = {}
    newDeck[title] = {
        title,
        questions: []
    }

    return newDeck
}

export function saveDeckTitle(title) {
    let newDeck = createDeck(title)
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(decks => {
            let decksObj = JSON.parse(decks)
            if (!decksObj) {
                decksObj = newDeck
            }

            decksObj = Object.assign({}, decksObj, newDeck)
            let str = JSON.stringify(decksObj)
            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, str)
        })
        .then(() => {
            return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        })
        .then(decks => {
            return Promise.resolve(JSON.parse(decks))
        })

}