import React, {Component} from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
//import {getDecks} from "../data/Decks";
import {Constants} from 'expo'

import {getDecks} from '../utils/api'

import {connect} from 'react-redux'

class DeckList extends Component {

    state = {
        decks: []
    }

    static navigationOptions = {
        title: 'Decks'
    };

    renderItem = ({item}) => {
        const {navigate} = this.props.navigation

        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() =>
                    navigate('DeckDetail', {item})
                }>
                    <View key={item.title} style={styles.listContainer} >
                        <Text style={styles.listItem}>{item.title} </Text>
                        <Text style={[styles.listItem, {fontSize:12}]}>Questions {item.questions.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };


    render() {
        return (
            <FlatList
                data={this.props.decks}
                renderItem={this.renderItem}
                keyExtractor={item => item.title}
            />
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        textAlign: 'center',
        fontSize: 18,
        padding: 2
    },
    listContainer: {
        margin:4,
        borderBottomColor: 'black'
    }
})

function mapStateToProps(state) {

    let decks = Object.keys(state).map((key) => state[key])

    return {
        decks: decks
    }

}

export default connect(mapStateToProps)(DeckList);