import React, { useState } from 'react';
import {
    StyleSheet, Text, View, FlatList, TouchableOpacity, Button,
    TouchableNativeFeedback, Platform, Image, ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import CardLayout from '../component/CardLayout';
import Colors from '../constants/Colors';

const ProductSearchScreen = (props) => {
    const [productData, setProductData] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);


    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    };

    const SearchFilterFunction = (text) => {
        setSearchText(text);
        //passing the inserted text in textinput
        const newData = productData.filter((item) => {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (text === '') {
            setFilteredData([]);
        } else
            setFilteredData(newData);
    }

    if (productData === null) {
        fetch('http://www.mocky.io/v2/5e419e082f0000cb5458368e', {
            method: 'GET'
            //Request Type 
        }).then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success 
                setProductData(responseJson.products);
                // setFilteredData(responseJson.products);

            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                console.error(error);
                Alert.alert("Error", error, ["Okay"])
            });
    }

    const RowItem = (itemData) => {
        // console.log(itemData.name);
        return (
            <CardLayout style={styles.screen} >
                <TouchableCmp activeOpacity={0.50}>
                    <View style={{ paddingVertical: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={require('../assets/icon.png')} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={styles.textProductName}>{itemData.name}</Text>
                            {/* <Text numberOfLines={1} style={styles.textProductDescription}>
                                {itemData.name}
                            </Text> */}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}>
                                <Text style={styles.textMrp}>₹{itemData.mrp}</Text>
                                <Text style={styles.textProductName}>₹{itemData.price}</Text>

                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginRight: 10,
                                    marginTop: 10,
                                }}>
                                <View style={styles.quantityContainer}>
                                    <Text style={{
                                        fontSize: 13,
                                        color: '#535353',
                                        alignSelf: 'center'
                                    }}>
                                        {itemData.weight}Kg
                                    </Text>
                                </View>
                                <Button title='Add to Cart' onPress={() => console.log(itemData.name)} />
                            </View>

                        </View>
                    </View>
                </TouchableCmp>
            </CardLayout >
        )
    }

    if (productData === null) {
        return (
            <ActivityIndicator
                style={styles.progress}
                size='large'
                color={Colors.primaryColor} />
        )
    } else {
        return (
            <View style={styles.screen}>
                <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    onChangeText={text => SearchFilterFunction(text)}
                    onClear={text => SearchFilterFunction('')}
                    placeholder="Type Here..."
                    value={searchText} />

                <FlatList data={filteredData}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={itemData => (
                        RowItem(itemData.item)
                    )} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 7,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    imageContainer: {
        marginHorizontal: 10,
        width: 100,
        height: 100,
        borderRadius: 7,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    titleStyle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        marginLeft: 10,
    },
    container: {
        paddingHorizontal: 5,
        marginTop: 10
    },
    textProductName: {
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
        maxWidth: 200
    },
    textMrp: {
        marginBottom: 5,
        fontSize: 12,
        color: 'gray',
        textAlign: 'left',
        maxWidth: 200,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginRight: 10
    },
    quantityContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#E6E6E6',
        borderRadius: 5
    },
    progress: {
        flex: 1,
        justifyContent: 'center'
    }
})
export default ProductSearchScreen;