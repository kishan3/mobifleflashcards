import React, {PureComponent} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {getAllDecks} from '../actions'
import {connect} from 'react-redux'
import DeckItem from './DeckItem'

class DeckList extends PureComponent {

    componentDidMount() {
        this.props.getDecks()
    }

    renderItem = ({item}) => (
        <View style={styles.item}>
            <DeckItem deck={item} navigation={this.props.navigation}/>
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.decks}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        justifyContent: 'center',
    },
})

function mapStateToProps(data) {
    return {
        decks: Object.keys(data).reduce((decks, id) => {
            return decks.concat(data[id]);
        }, [])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => dispatch(getAllDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)