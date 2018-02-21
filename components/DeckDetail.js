import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native'
import {gray, blue, white} from '../utils/colors'
import {connect} from 'react-redux'

// TODO: Use TextButton
function AddCardBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

function StartQuizBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}



class DeckDetail extends Component {

    startQuiz = (deck) => {
        if(deck.questions.length > 0) {
            this.props.navigation.navigate('Quiz', {title: deck.title})
        } else {
            Alert.alert('Questions Required', 'Add at least one question to the Quiz.')
        }
    }


    render() {
        const {state, navigate} = this.props.navigation;
        const title = state.params.item.title

        let deck = this.props.decks[title]

        return (
            deck && <View style={{display: 'flex', flex: 1}}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}> {deck.title}</Text>
                    <Text style={styles.cards}>{deck.questions.length} cards</Text>
                </View>
                <View style={{flex: 1}}>
                    <AddCardBtn onPress={() => navigate('CardForm', {title})}/>
                    <StartQuizBtn onPress={() => this.startQuiz(deck, navigate)}/>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckDetail)

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        padding: 20
    },
    cards: {
        textAlign: 'center',
        color: gray,
        fontSize: 14
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },


})