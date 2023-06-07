import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F1FA', 
        paddingHorizontal: 16,
        paddingTop: 30, 
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
    },
    firstItemContainer: {
        marginTop: 0, 
        marginBottom: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemBrand: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

const Exibir = () => {
    const [sneakers, setSneakers] = useState([]);

    useEffect(() => {
        fetchSneakers();
    }, []);

    const fetchSneakers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getsneakers');
            if (response.status === 200) {
                setSneakers(response.data.sneakers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderSneakerItem = ({ item, index }) => (
        <View style={index === 0 ? styles.firstItemContainer : styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemBrand}>{item.brand}</Text>
            <Text>{`Size: ${item.size}`}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sneakers}
                renderItem={renderSneakerItem}
                keyExtractor={(item) => item._id}
            />
        </SafeAreaView>
    );
};

export default Exibir;
