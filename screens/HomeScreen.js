import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text style={{ margin: 30, alignSelf: 'center' }}>Hello Welcome</Text>
            <View style={styles.buttonViewStyle}>
                <Button title='Products List' onPress={() => (props.navigation.navigate('ProductList'))} />
            </View>
            <View style={styles.buttonViewStyle}>
                <Button title='Product Search' onPress={() => (props.navigation.navigate('ProductSearch'))} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        flexDirection: 'column'
    },
    buttonViewStyle: {
        marginHorizontal: 30,
        marginVertical:10
    }
})
export default HomeScreen;