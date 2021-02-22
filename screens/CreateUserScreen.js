import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = (props) => {

    const [state, setstate] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = (name, value) => {
        setstate({...state, [name]: value})
    };

    const SaveNewUser = async () => {
        if (state.name === '' || state.email === '' || state.phone === '') {
            alert('Debe llenar todos los campos...')
        } else {
            try {
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                });
                
                props.navigation.navigate('Lista Usuarios');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <ScrollView style={styles.contanier}>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Nombre"
                onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Email"
                onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Teléfono"
                onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>
            <View>
                <Button title="Añadir Persona" onPress={() => SaveNewUser()}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
});

export default CreateUserScreen