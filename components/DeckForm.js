import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {saveDeckTitle} from '../actions'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import {blue, white} from "../utils/colors";

class DeckForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            touched: {
                title: false
            }
        }
    }

    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    };

    onBlur = (field) => {
        this.setState({touched: {...this.state.touched, [field]: true}});
    };

    submit = () => {
        // validate input
        if (this.state.title.trim().length < 1)  {
            this.setState({
                touched: {
                    title: true
                }
            });
            return;
        }

        this.props.saveDeckTitle(this.state.title)
            .then(() => {
                this.props.navigation.navigate('DeckDetail', {item: {title: this.state.title}})
            })

    }

    validate = (inputs) => {
        return {
            title: inputs.title.length > 0 ? null : 'Deck Title is required.'
        };
    };

    render() {

        const errors = this.validate({
            title: this.state.title
        });

        return (
            <View style={{flex:1, justifyContent:'space-around'}}>
                <View style={{marginTop:80}}>
                    <FormLabel>Deck Title</FormLabel>
                    <FormInput
                        onChangeText={(value) => this.handleChange(value, 'title')}
                        value={this.state.title}
                        onBlur={() => this.onBlur('title')}
                        blurOnSubmit={true}
                    />
                    {errors.title && this.state.touched.title && <FormValidationMessage>{errors.title}</FormValidationMessage>}
                </View>
                <View>
                    <TextButton
                        style={styles.button}
                        onPress={this.submit}
                        children="Add Deck"
                        textColor="white"
                    >
                    </TextButton>
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

function mapStateToProps(state) {

    return {
        decks: state
    }
}


export default connect(mapStateToProps, {saveDeckTitle})(DeckForm)