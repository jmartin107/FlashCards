import React, {Component} from 'react'
import {View, Text, StyleSheet, Easing, Animated, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import FlipView from 'react-native-flip-view-next'
import {blue, white} from "../utils/colors";

import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            correctAnswers: 0,
            quizComplete: false,
            isFlipped: false
        }
    }

    static navigationOptions = {
        title: 'Quiz',
    };


    startQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            quizComplete: false
        })

        clearLocalNotification()
            .then(setLocalNotification)

    }

    correct = () => {
        let numberOfQuestions = this.getQuestionCount()
        let quizComplete = this.state.currentQuestion === (numberOfQuestions - 1)

        this.setState({
            currentQuestion: quizComplete ? this.state.currentQuestion : this.state.currentQuestion + 1,
            correctAnswers: this.state.correctAnswers + 1,
            quizComplete,
            isFlipped: false
        })
    }

    incorrect = () => {
        let numberOfQuestions = this.getQuestionCount()
        let quizComplete = this.state.currentQuestion === (numberOfQuestions - 1)

        this.setState({
            currentQuestion: quizComplete ? this.state.currentQuestion : this.state.currentQuestion + 1,
            quizComplete,
            isFlipped: false
        })
    }

    quizSummary = () => {
        return (
            <View style={{flex: 1, display: 'flex'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.question}>Quiz Completed</Text>
                    <Text style={[styles.question, {fontSize: 16}]}>You
                        got {this.state.correctAnswers} of {this.getQuestionCount()} questions correct.</Text>
                </View>

                <View style={{flex: 1}}>
                    <TextButton
                        onPress={this.startQuiz}
                        children="Start Quiz"
                        style={styles.quizBtn}
                        textColor = 'white'
                    />
                </View>

            </View>
        )
    }

    getQuestionCount = () => {
        const {state} = this.props.navigation;
        return this.props.decks[state.params.title].questions.length
    }

    renderFront = () => {

        const {state} = this.props.navigation;
        let questions = this.props.decks[state.params.title].questions
        let question = questions[this.state.currentQuestion]

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Text style={styles.question}>{question.question}</Text>
                </View>

                <View style={{flex: 1}}>
                    <TextButton
                        onPress={this.flip}
                        children={'Answer'}
                        style={styles.quizBtn}
                        textColor='white'
                    />
                    <Text
                        style={styles.questionCount}>Question {this.state.currentQuestion + 1} of {this.getQuestionCount()}</Text>
                </View>
            </View>
        )
    }

    renderBack = () => {

        const {state} = this.props.navigation;
        let questions = this.props.decks[state.params.title].questions
        let question = questions[this.state.currentQuestion]

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>

                    <Text style={styles.question}>{question.answer}</Text>
                    <TextButton style={{padding: 10}} onPress={() => this.flip()}>
                        Back to Question
                    </TextButton>
                </View>
                <View style={{flex: 1}}>
                    <TextButton
                        onPress={this.correct}
                        children="Correct"
                        style={[styles.quizBtn, styles.correctBtnColor]}
                        textColor="white"
                    />
                    <TextButton
                        onPress={this.incorrect}
                        children='Incorrect'
                        style={[styles.quizBtn, styles.incorrectBtnColor]}
                        textColor="white"
                    />
                    <Text
                        style={styles.questionCount}>Answer {this.state.currentQuestion + 1} of {this.getQuestionCount()}</Text>
                </View>
            </View>
        )
    }

    flip = () => {
        this.setState({isFlipped: !this.state.isFlipped});
    };

    render() {

        if (this.state.quizComplete) {
            return this.quizSummary()
        } else {
            return (
                <FlipView style={{flex: 1}}
                          front={this.renderFront()}
                          back={this.renderBack()}
                          isFlipped={this.state.isFlipped}
                          onFlipped={(val) => {
                              console.log('Flipped: ' + val);
                          }}
                          flipAxis="y"
                          flipEasing={Easing.out(Easing.ease)}
                          flipDuration={500}
                          perspective={1000}/>

            )
        }
    }
}


export default connect(decks => ({ decks }))(Quiz)

const styles = StyleSheet.create({
    question: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        padding: 20
    },
    quizBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    questionCount: {
        textAlign: 'center',
        margin: 10
    },
    incorrectBtnColor: {
        backgroundColor: 'red'
    },
    correctBtnColor: {
        backgroundColor: 'green'
    }
})

