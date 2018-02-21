import React, {Component} from 'react';
import thunk from 'redux-thunk';
import {getDecks} from './actions'
import {createStore, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import reducer from './reducers'
import RootContainer from './components/RootContainer';
import { setLocalNotification } from './utils/helpers'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const ConnectedRoot = connect(
    null,
    (dispatch) => ({
        getDecks: () => dispatch(getDecks())
    })
)(RootContainer);


export default class App extends Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRoot />
            </Provider>
        );
    }
}



