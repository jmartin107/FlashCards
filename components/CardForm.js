import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {addCardToDeck} from '../actions'

import {connect} from 'react-redux'
import TextButton from './TextButton'
import {blue} from "../utils/colors";

class CardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            touched: {
                question: false,
                answer: false
            }
        }
    }

    static navigationOptions = {
        title: 'Add Card',
    };

    submit = () => {

        // validate input
        if (this.state.question.trim().length < 1 &&
            this.state.answer.trim().length < 1) {
            this.setState({
                touched: {
                    question: true,
                    answer: true
                }
            });
            return;
        }

        const {state} = this.props.navigation;
        this.props.addCardToDeck(state.params.title, this.state)
        this.props.navigation.goBack();
    }

    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    };

    onBlur = (field) => {
        this.setState({touched: {...this.state.touched, [field]: true}});
    };

    validate = (inputs) => {
        return {
            answer: inputs.answer.length > 0 ? null : 'Answer is required.',
            question: inputs.question.length > 0 ? null : 'Question is required.'
        };
    };

    render() {

        const errors = this.validate({
            question: this.state.question,
            answer: this.state.answer
        });

        return (
            <View style={{flex: 1, justifyContent: 'space-around'}}>

                <View>
                    <FormLabel>Question</FormLabel>
                    <FormInput
                        onChangeText={(value) => this.handleChange(value, 'question')}
                        value={this.state.question}
                        onBlur={() => this.onBlur('question')}
                        blurOnSubmit={true}
                    />
                    {errors.question && this.state.touched.question &&
                    <FormValidationMessage>{errors.question}</FormValidationMessage>}

                    <FormLabel>Answer</FormLabel>
                    <FormInput
                        onChangeText={(value) => this.handleChange(value, 'answer')}
                        value={this.state.answer}
                        onBlur={() => this.onBlur('answer')}
                        blurOnSubmit={true}
                    />
                    {errors.answer && this.state.touched.answer &&
                    <FormValidationMessage>{errors.answer}</FormValidationMessage>}
                </View>

                <View>
                    <TextButton
                        style={styles.button}
                        onPress={this.submit}
                        children="Add Card"
                        textColor="white"
                    />

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20
    },
})

function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (title, question) => dispatch(addCardToDeck(title, question))
    }
}

export default connect(null, mapDispatchToProps)(CardForm)
