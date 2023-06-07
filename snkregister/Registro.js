import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ccc',
  },
  input: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  addButtonContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 1,
    paddingVertical: 8,
    marginTop: 9,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  viewButtonContainer: {
    backgroundColor: '#FF9800',
    borderRadius: 1,
    paddingVertical: 8,
    marginTop: 9,
  },
  mensagem: {
    marginTop: 16,
    color: 'green',
    textAlign: 'center',
  },
});

const Registro = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!name || !brand || !isValidSize(size)) {
      setMensagem('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/add', { name, brand, size });
      if (response.status === 200) {
        setMensagem('Sneaker adicionado com sucesso!');
        setName('');
        setBrand('');
        setSize('');
      }
    } catch (error) {
      setMensagem('Não foi possível salvar no banco de dados.');
    }
  };

  const isValidSize = (value) => {
    return /^\d+$/.test(value);
  };

  const handleNavigateToExibir = () => {
    navigation.navigate('Exibir');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tamanho (Número)"
        value={size}
        onChangeText={(text) => setSize(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButtonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Adicionar Sneaker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewButtonContainer} onPress={handleNavigateToExibir}>
        <Text style={styles.buttonText}>Exibir Dados</Text>
      </TouchableOpacity>
      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
    </View>
  );
};

export default Registro;
