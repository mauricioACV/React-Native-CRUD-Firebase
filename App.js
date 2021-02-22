import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

import UserList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Lista Usuarios"
        component={UserList}
        options={{ title: "Listado de Usuarios" }}
      />
      <stack.Screen
        name="Registrar Usuario"
        component={CreateUserScreen}
        options={{ title: "Registra un Usuario" }}
      />
      <stack.Screen
        name="Modificar Usuario"
        component={UserDetailScreen}
        options={{ title: "Modificar Datos Usuario" }}
      />
    </stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
