import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import firebase from '../database/firebase';

const UserDetailScreen = (props) => {
    
    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    };

    const [user, setUser] = useState(initialState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const getUserById = async (id) => {
      const getUser = firebase.db.collection('users').doc(id);
      const datosDocBruto = await getUser.get();
      const datosRefinadosUser = datosDocBruto.data();
      setUser({
          ...datosRefinadosUser,
          id: datosDocBruto.id
      });

      setLoading(false);
  };
    
    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value});
    };

    const deleteUser = async () => {
        const getUser = firebase.db.collection('users').doc(props.route.params.userId);
        await getUser.delete();
        props.navigation.navigate('Lista Usuarios');
    };

    const updateUser = async () => {
        const getUser = firebase.db.collection('users').doc(user.id);
        await getUser.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        });

        setUser(initialState);
        props.navigation.navigate('Lista Usuarios');
    };

    const confirmationAlert = () => {
      Alert.alert('Eliminar Usuario','Estas seguro??', [
          {text: 'Sí', onPress: () => deleteUser()},
          {text: 'No', onPress: () => console.log(false)},
      ]);
  };

    if(loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return (
      <ScrollView style={styles.contanier}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Nombre"
            value={user.name}
            onChangeText={(value) => handleChangeText("name", value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            value={user.email}
            onChangeText={(value) => handleChangeText("email", value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Teléfono"
            value={user.phone}
            onChangeText={(value) => handleChangeText("phone", value)}
          />
        </View>
        <View>
          <Button
            title="Actualizar Usuario"
            onPress={() => updateUser()}
          />
        </View>
        <View>
          <Button
            color="#E37399"
            title="Elminar Usuario"
            onPress={() => confirmationAlert()}
          />
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
})

export default UserDetailScreen